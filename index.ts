import { UserConfig, searchForWorkspaceRoot } from 'vite'
import path from 'path'

/**
 * Export vite plugin as default
 */
export default () => ({

  name: '@ja/inertia-ui',

  config: (config: UserConfig): UserConfig => {

    config.resolve = config.resolve || {}

    // Define aliases for components and utilities
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve('resources/js'),
      '@inertia-ui': path.resolve(`${__dirname}/resources/js`)
    }

    // Server-side rendering config
    config.ssr = {
      ...(config.ssr || {}),
      noExternal: ['@inertiajs/server'],
    }

    // Dev server config (for local HMR support)
    config.server = {
      ...(config.server || {}),
      https: false,
      hmr: { protocol: 'ws' }
    }

    return config
  }
})
