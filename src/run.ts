import assert from 'node:assert'
import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type * as github from './github.js'
import { getAssociatedPullRequest } from './queries/getAssociatedPullRequest.js'

type Inputs = {
  sha: string
}

export const run = async (inputs: Inputs, octokit: Octokit, context: github.Context): Promise<void> => {
  core.info(`Getting the associated pull request for the commit ${inputs.sha}`)
  const associatedPullRequest = await getAssociatedPullRequest(octokit, {
    owner: context.repo.owner,
    name: context.repo.repo,
    expression: inputs.sha,
  })

  assert(associatedPullRequest.repository)
  assert(associatedPullRequest.repository.object)
  assert.strictEqual(associatedPullRequest.repository.object.__typename, 'Commit')
  assert(associatedPullRequest.repository.object.associatedPullRequests)
  assert(associatedPullRequest.repository.object.associatedPullRequests.nodes != null)

  if (associatedPullRequest.repository.object.associatedPullRequests.nodes.length === 0) {
    core.info('No associated pull request found')
    return
  }
  for (const node of associatedPullRequest.repository.object.associatedPullRequests.nodes) {
    assert(node != null)
    core.info(`Found associated pull request #${node.number}`)
  }
}
