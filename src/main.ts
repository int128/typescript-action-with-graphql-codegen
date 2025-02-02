import * as core from '@actions/core'
import { run } from './run.js'
import { Octokit } from '@octokit/action'
import assert from 'assert'

const main = async (): Promise<void> => {
  assert(process.env.GITHUB_REPOSITORY, 'GITHUB_REPOSITORY is required')
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')
  await run(
    {
      owner,
      repo,
      sha: core.getInput('sha', { required: true }),
    },
    new Octokit(),
  )
}

main().catch((e: Error) => {
  core.setFailed(e)
  console.error(e)
})
