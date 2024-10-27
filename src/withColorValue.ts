import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidColors,
  withAndroidColorsNight,
} from "@expo/config-plugins";

export const withColorValue: ConfigPlugin<{
  name: string;
  value: string;
  colorScheme: "light" | "dark";
}> = (config, { name, value, colorScheme }) => {
  if (colorScheme === "light") {
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
  if (colorScheme === "dark") {
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
