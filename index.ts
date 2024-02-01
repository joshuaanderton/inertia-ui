import { UserConfig, searchForWorkspaceRoot } from 'vite'
import path from 'path'
import { ThemeDefaults } from '@inertia-ui/Utils/theme-defaults'

/**
 * Export vite plugin as default
 */
export default (options?: { theme?: ThemeDefaults }) => ({

  name: '@ja/inertia-ui',

  config: (config: UserConfig): UserConfig => {

    config.define = {
      THEME_DEFAULTS: options?.theme || null
    }

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
