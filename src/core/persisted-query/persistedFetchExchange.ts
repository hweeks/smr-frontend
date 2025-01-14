// TAKEN FROM https://github.com/FormidableLabs/urql/blob/main/exchanges/persisted-fetch/src/persistedFetchExchange.ts

/* eslint-disable */
import {
  fromValue,
  fromPromise,
  filter,
  merge,
  mergeMap,
  pipe,
  share,
  onPush,
  takeUntil,
} from 'wonka';

import type {Source} from 'wonka';

import {
  makeOperation,
} from '@urql/core';

import type {
  CombinedError,
  ExchangeInput,
  Exchange,
  Operation,
  OperationResult,
} from '@urql/core';

import {
  makeFetchBody,
  makeFetchURL,
  makeFetchOptions,
  makeFetchSource,
} from '@urql/core/internal';

import type {FetchBody} from '@urql/core/internal';

import type { DocumentNode } from 'graphql';

import { hash } from './sha256';

interface PersistedFetchExchangeOptions {
  preferGetForPersistedQueries?: boolean;
  enforcePersistedQueries?: boolean;
  generateHash?: (query: string, document: DocumentNode) => Promise<string>;
}

export const persistedFetchExchange = (
  options?: PersistedFetchExchangeOptions
): Exchange => ({ forward, dispatchDebug }) => {
  if (!options) options = {};

  const preferGetForPersistedQueries = !!options.preferGetForPersistedQueries;
  const enforcePersistedQueries = !!options.enforcePersistedQueries;
  const hashFn = options.generateHash || hash;
  let supportsPersistedQueries = true;

  return ops$ => {
    const sharedOps$ = share(ops$);
    const fetchResults$ = pipe(
      sharedOps$,
      filter(operation => operation.kind === 'query'),
      mergeMap(operation => {
        const { key } = operation;
        const teardown$ = pipe(
          sharedOps$,
          filter(op => op.kind === 'teardown' && op.key === key)
        );

        const body = makeFetchBody(operation);
        if (!supportsPersistedQueries) {
          // Runs the usual non-persisted fetchExchange query logic
          return pipe(
            makePersistedFetchSource(operation, body, dispatchDebug, false),
            takeUntil(teardown$)
          );
        }

        const query: string = body.query!;

        return pipe(
          // Hash the given GraphQL query
          fromPromise(hashFn(query, operation.query)),
          mergeMap(sha256Hash => {
            // if the hashing operation was successful, add the persisted query extension
            if (sha256Hash) {
              // Attach SHA256 hash and remove query from body
              body.query = undefined;
              body.extensions = {
                persistedQuery: {
                  version: 1,
                  sha256Hash,
                },
              };
            }
            return makePersistedFetchSource(
              operation,
              body,
              dispatchDebug,
              !!(preferGetForPersistedQueries && sha256Hash)
            );
          }),
          mergeMap(result => {
            if (!enforcePersistedQueries) {
              if (result.error && isPersistedUnsupported(result.error)) {
                // Reset the body back to its non-persisted state
                body.query = query;
                body.extensions = undefined;
                // Disable future persisted queries if they're not enforced
                supportsPersistedQueries = false;
                return makePersistedFetchSource(
                  operation,
                  body,
                  dispatchDebug,
                  false
                );
              } else if (result.error && isPersistedMiss(result.error)) {
                // Add query to the body but leave SHA256 hash intact
                body.query = query;
                return makePersistedFetchSource(
                  operation,
                  body,
                  dispatchDebug,
                  false
                );
              }
            }

            return fromValue(result);
          }),
          takeUntil(teardown$)
        );
      })
    );

    const forward$ = pipe(
      sharedOps$,
      filter(operation => operation.kind !== 'query'),
      forward
    );

    return merge([fetchResults$, forward$]);
  };
};

const makePersistedFetchSource = (
  operation: Operation,
  body: FetchBody,
  dispatchDebug: ExchangeInput['dispatchDebug'],
  useGet: boolean
): Source<OperationResult> => {
  const newOperation = makeOperation(operation.kind, operation, {
    ...operation.context,
    preferGetMethod: useGet || operation.context.preferGetMethod,
  });

  const url = makeFetchURL(
    newOperation,
    body.query ? body : { ...body, query: '' }
  );

  const fetchOptions = makeFetchOptions(newOperation, body);

  dispatchDebug({
    type: 'fetchRequest',
    message: !body.query
      ? 'A fetch request for a persisted query is being executed.'
      : 'A fetch request is being executed.',
    operation: newOperation,
    data: {
      url,
      fetchOptions,
    },
  });

  return pipe(
    makeFetchSource(newOperation, url, fetchOptions),
    onPush(result => {
      const persistFail =
        result.error &&
        (isPersistedMiss(result.error) || isPersistedUnsupported(result.error));
      const error = !result.data ? result.error : undefined;

      dispatchDebug({
        // TODO: Assign a new name to this once @urql/devtools supports it
        type: persistFail || error ? 'fetchError' : 'fetchSuccess',
        message: persistFail
          ? 'A Persisted Query request has failed. A non-persisted GraphQL request will follow.'
          : `A ${
            error ? 'failed' : 'successful'
          } fetch response has been returned.`,
        operation,
        data: {
          url,
          fetchOptions,
          value: persistFail ? result.error! : error || result,
        },
      });
    })
  );
};

const isPersistedMiss = (error: CombinedError): boolean =>
  error.graphQLErrors.some(x => x.message === 'PersistedQueryNotFound');

const isPersistedUnsupported = (error: CombinedError): boolean =>
  error.graphQLErrors.some(x => x.message === 'PersistedQueryNotSupported');
