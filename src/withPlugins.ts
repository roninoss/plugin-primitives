import {
  ConfigPlugin,
  withPlugins as withPluginsExpo,
} from "expo/config-plugins";

import { ExpoConfig } from "expo/config";

/**
 * A config plugin to conveniently aggregate multiple plugins
 */
export const withPlugins: <const T extends unknown[]>(
  config: ExpoConfig,
  plugins: { [k in keyof T]: [ConfigPlugin<T[k]>, T[k]] }
) => ExpoConfig = (config, plugins) => {
  return withPluginsExpo(config, plugins);
};
