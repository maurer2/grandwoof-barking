const path = require('path');
const stylexPlugin = require('@stylexjs/nextjs-plugin');
const babelrc = require('./.babelrc.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  formats: ['image/avif', 'image/webp'],
};

// export default nextConfig;

// https://github.com/facebook/stylex/blob/main/apps/nextjs-example/next.config.js
const plugins = babelrc.plugins;
const [_name, options] = plugins.find(
  (plugin) => Array.isArray(plugin) && plugin[0] === '@stylexjs/babel-plugin',
);

const rootDir = options.unstable_moduleResolution.rootDir ?? __dirname;
const aliases = options.aliases ?? undefined;
const useCSSLayers = options.useCSSLayers ?? undefined;

module.exports = stylexPlugin({ rootDir, aliases, useCSSLayers })({
  transpilePackages: ['@stylexjs/open-props'],
});
