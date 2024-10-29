// https://gist.github.com/djaffer/92260b643bd6e090b1d13291a7192a43

import {
  AndroidManifest,
  ConfigPlugin,
  withAndroidManifest as withAndroidManifestExpo,
} from "expo/config-plugins";

export type ManifestCategory = keyof AndroidManifest["manifest"];

type WithAndroidManifestParams = AndroidManifest["manifest"];

export const withAndroidManifest: ConfigPlugin<WithAndroidManifestParams> = (
  config,
  data
) => {
  return withAndroidManifestExpo(config, async (config) => {
    const androidManifest = config.modResults.manifest;
    const categories = Object.keys(data) as ManifestCategory[];

    categories.forEach((category) => {
      const categorySection = androidManifest[category];
      if (
        categorySection &&
        Array.isArray(categorySection) &&
        categorySection.length > 0
      ) {
        const attributes = Object.keys(data[category]!);
        attributes.forEach((attribute) => {
          // @ts-ignore
          categorySection.$[attribute] = data[category]![attribute];
        });
      }
    });

    return config;
  });
};
