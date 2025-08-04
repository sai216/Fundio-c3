/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    // Handle crypto polyfills for browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        url: require.resolve('url'),
        assert: require.resolve('assert'),
      };

      // Add buffer polyfill
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      );
    }

    // Handle problematic modules
    config.resolve.alias = {
      ...config.resolve.alias,
      '@injectivelabs/token-metadata': false,
      '@injectivelabs/sdk-ts': false,
    };

    config.externals = [...(config.externals || [])];

    if (!isServer) {
      config.externals.push({
        '@injectivelabs/sdk-ts': 'commonjs @injectivelabs/sdk-ts',
        '@injectivelabs/token-metadata': 'commonjs @injectivelabs/token-metadata',
      });
    }

    // Enable top-level await
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },

  transpilePackages: [
    '@certusone/wormhole-sdk',
    '@coinbase/onchainkit',
  ],
};

module.exports = nextConfig;
