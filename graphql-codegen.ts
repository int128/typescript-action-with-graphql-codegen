import type { CodegenConfig } from '@graphql-codegen/cli'
import { schema } from '@octokit/graphql-schema'

const config: CodegenConfig = {
  schema: `${__dirname}/node_modules/@octokit/graphql-schema/schema.graphql`,
  documents: ['src/queries/**/*.ts'],
  generates: {
    'src/generated/graphql-types.ts': {
      plugins: ['typescript'],
    },
    'src/generated/graphql.ts': {
      preset: 'import-types',
      plugins: ['typescript-operations'],
      presetConfig: {
        typesPath: './graphql-types.js',
      },
    },
  },
  config: {
    // https://docs.github.com/en/graphql/reference/scalars
    scalars: {
      DateTime: 'string',
      GitObjectID: 'string',
    },
  },
}

export default config
