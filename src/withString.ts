import {
  AndroidConfig,
  ConfigPlugin,
  withStringsXml,
} from "expo/config-plugins";

type WithStringParams = {
  key: string;
  value: string;
  translatable?: boolean;
};

/**
 * 🤖 Android Only
 *
 * A config plugin to add strings to strings.xml
 *
 */
export const withString: ConfigPlugin<WithStringParams> = (
  config,
  { key, value, translatable }
) => {
  return withStringsXml(config, (config) => {
    config.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          $: {
            name: key,
            translatable: translatable ? "true" : "false",
          },
          _: value,
        },
      ],
      config.modResults
    );
    return config;
  });
};
