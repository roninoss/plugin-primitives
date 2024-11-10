import {
  AndroidConfig,
  ConfigPlugin,
  withStringsXml,
} from "expo/config-plugins";

type WithStringParams = {
  name: string;
  value?: string;
  translatable?: boolean;
};

/**
 * 🤖 Android Only
 *
 * A config plugin to add/remove/modify strings to strings.xml
 *
 */
export const withString: ConfigPlugin<WithStringParams> = (
  config,
  { name, value, translatable }
) => {
  return withStringsXml(config, (config) => {
    if (value === undefined) {
      config.modResults = AndroidConfig.Strings.removeStringItem(
        name,
        config.modResults
      );
    } else {
      config.modResults = AndroidConfig.Strings.setStringItem(
        [
          {
            $: {
              name,
              translatable: translatable ? "true" : "false",
            },
            _: value,
          },
        ],
        config.modResults
      );
    }
    return config;
  });
};
