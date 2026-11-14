/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from './graphql-types.js';

export type GetAssociatedPullRequestQueryVariables = Exact<{
  owner: string;
  name: string;
  expression: string;
}>;


export type GetAssociatedPullRequestQuery = { rateLimit: { cost: number, remaining: number } | null, repository: { object:
      | { __typename: 'Blob' }
      | { __typename: 'Commit', associatedPullRequests: { nodes: Array<{ number: number } | null> | null } | null }
      | { __typename: 'Tag' }
      | { __typename: 'Tree' }
     | null } | null };
