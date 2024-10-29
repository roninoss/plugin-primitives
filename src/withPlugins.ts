import { ConfigPlugin, withStaticPlugin } from "expo/config-plugins";
import { ExpoConfig } from "expo/config";

export const withPlugins: <T>(
  config: ExpoConfig,
  plugins: [ConfigPlugin<T>, T][]
) => ExpoConfig = (config, plugins) => {
  return plugins.reduce(
    (prev, plugin) => withStaticPlugin(prev, { plugin }),
    config
  );
};
