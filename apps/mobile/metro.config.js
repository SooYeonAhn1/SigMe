const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const workspaceRoot = path.resolve(__dirname, "..", "..");
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

/**
 * Metro configuration for monorepo
 */
config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.join(workspaceRoot, "node_modules"),
];

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

module.exports = config;
