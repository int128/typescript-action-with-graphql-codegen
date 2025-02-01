import * as core from '@actions/core'
import * as github from './github.js'
import { run } from './run.js'

const main = async (): Promise<void> => {
  await run({
    owner: github.owner,
    repo: github.repo,
    sha: core.getInput('sha', { required: true }),
  })
}

main().catch((e: Error) => {
  core.setFailed(e)
  console.error(e)
})
