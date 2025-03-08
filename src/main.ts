import * as core from '@actions/core'
import * as github from './github.js'
import { run } from './run.js'

const main = async (): Promise<void> => {
  await run(
    {
      sha: core.getInput('sha', { required: true }),
    },
    github.getOctokit(),
    github.getContext(),
  )
}

main().catch((e: Error) => {
  core.setFailed(e)
  console.error(e)
})
