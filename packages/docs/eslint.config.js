// @ts-check
import rootConfig from '../../eslint.config.js'
import astroPlugin from 'eslint-plugin-astro'

export default [
  ...rootConfig,
  ...astroPlugin.configs.recommended,
  {
    rules: {
      // Add Astro-specific rule overrides here if needed
    },
  },
]
