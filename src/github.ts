import assert from 'assert'
import { Octokit } from '@octokit/action'

assert(process.env.GITHUB_REPOSITORY, 'GITHUB_REPOSITORY is required')
export const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/')

export const getOctokit = () => new Octokit()
