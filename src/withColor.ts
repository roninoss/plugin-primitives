import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidColors,
  withAndroidColorsNight,
} from "expo/config-plugins";

/**
 * 🤖 Android Only
 *
 * A config plugin to set colors in Android's colors.xml and colors.xml (night) files.
 *
 */

export const withColor: ConfigPlugin<{
  name: string;
  value: string;
  night: boolean;
}> = (config, { name, value, night }) => {
  if (night) {
    config = withAndroidColors(config, (config) => {
      config.modResults = AndroidConfig.Colors.assignColorValue(
        config.modResults,
        {
          name,
          value,
        }
      );
      return config;
    });
  }
  if (night) {
    config = withAndroidColorsNight(config, (config) => {
      config.modResults = AndroidConfig.Colors.assignColorValue(
        config.modResults,
        {
          name,
          value,
        }
      );
      return config;
    });
  }

  return config;
};
