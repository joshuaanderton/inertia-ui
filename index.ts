import { UserConfig, searchForWorkspaceRoot } from 'vite'
import path from 'path'

/**
 * Export vite plugin as default
 */
export default () => ({

  name: 'inertia-ui',

  config: (config: UserConfig): UserConfig => {

    // Allow importing from this package
    // config = _merge(config, 'server.fs.allow', [
      // searchForWorkspaceRoot(process.cwd()),
      // path.resolve(`${packagePath}/resources/js`),
    // ])

    config.resolve = config.resolve || {}

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve('resources/js'),
      '@inertia-ui': path.resolve(`${__dirname}/resources/js`),
    }

    config.ssr = {
      ...(config.ssr || {}),
      noExternal: ['@inertiajs/server'],
    }

    config.server = {
      ...(config.server || {}),
      https: false,
      hmr: { protocol: 'ws' }
    }

    return config
  }
})
