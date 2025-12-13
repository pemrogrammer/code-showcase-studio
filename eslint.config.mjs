import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unicorn from 'eslint-plugin-unicorn'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            // This rule applies to filenames, not directory names.
            // The original regexes `/^\[.*\]$/` and `/^\(.*\)$/` didn't work because
            // they don't account for file extensions (e.g., `.tsx`).

            // This updated regex correctly matches dynamic segment files
            // like `[id].tsx` or `[...slug].tsx`.
            /^\[.*\]\..+$/,

            // This is for the uncommon case where a file is named like a route group,
            // e.g., `(marketing).tsx`.
            /^\(.*\)\..+$/,

            // This correctly ignores files that start with an underscore,
            // such as `_app.tsx` or private utility files.
            /^_/,
          ],
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]

export default eslintConfig
