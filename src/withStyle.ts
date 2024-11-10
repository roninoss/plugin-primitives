import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidStyles,
} from "expo/config-plugins";

type WithStyleParams = {
  name: string;
  value?: string;
  parent: {
    name: string;
    parent: string;
  };
};

/**
 * 🤖 Android Only
 *
 * A config plugin to add/remove/modify styles in styles.xml
 *
 */
export const withStyle: ConfigPlugin<WithStyleParams> = (
  config,
  { name, value, parent }
) => {
  return withAndroidStyles(config, (config) => {
    config.modResults = AndroidConfig.Styles.assignStylesValue(
      config.modResults,
      {
        add: value !== undefined,
        parent,
        name,
        value: value ?? "",
      }
    );
    return config;
  });
};
