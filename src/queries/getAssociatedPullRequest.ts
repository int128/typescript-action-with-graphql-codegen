import { Octokit } from '@octokit/action'
import { GetAssociatedPullRequestQuery, GetAssociatedPullRequestQueryVariables } from '../generated/graphql.js'

const query = /* GraphQL */ `
  query getAssociatedPullRequest($owner: String!, $name: String!, $expression: String!) {
    rateLimit {
      cost
      remaining
    }
    repository(owner: $owner, name: $name) {
      object(expression: $expression) {
        __typename
        ... on Commit {
          associatedPullRequests(first: 1, orderBy: { field: CREATED_AT, direction: ASC }) {
            nodes {
              number
            }
          }
        }
      }
    }
  }
`

export const getAssociatedPullRequest = async (
  octokit: Octokit,
  v: GetAssociatedPullRequestQueryVariables,
): Promise<GetAssociatedPullRequestQuery> => await octokit.graphql(query, v)
