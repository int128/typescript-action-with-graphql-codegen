import { describe, expect, it, vi } from 'vitest'
import { Octokit } from '@octokit/action'
import { getAssociatedPullRequest } from '../src/queries/getAssociatedPullRequest.js'
import { run } from '../src/run.js'

vi.mock('../src/queries/getAssociatedPullRequest')

describe('run', () => {
  it('should show the associated pull request', async () => {
    vi.mocked(getAssociatedPullRequest).mockResolvedValueOnce({
      repository: {
        object: {
          __typename: 'Commit',
          associatedPullRequests: {
            nodes: [
              {
                number: 1,
              },
            ],
          },
        },
      },
    })

    await expect(
      run(
        {
          owner: 'octocat',
          repo: 'typescript-action-with-graphql-codegen',
          sha: '0123456789',
        },
        new Octokit({ authStrategy: undefined }),
      ),
    ).resolves.toBeUndefined()
  })
})
