import {
  ConfigPlugin,
  withPlugins as withPluginsExpo,
} from "expo/config-plugins";
import { ExpoConfig } from "expo/config";

export const withPlugins: <T>(
  config: ExpoConfig,
  plugins: [ConfigPlugin<T>, T][]
) => ExpoConfig = (config, plugins) => {
  return withPluginsExpo(config, plugins);
};
