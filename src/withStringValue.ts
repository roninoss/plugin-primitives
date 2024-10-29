import {
  AndroidConfig,
  ConfigPlugin,
  withStringsXml,
} from "expo/config-plugins";

type WithStringValueParams = {
  key: string;
  value: string;
  translatable?: boolean;
};

export const withStringValue: ConfigPlugin<WithStringValueParams> = (
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
