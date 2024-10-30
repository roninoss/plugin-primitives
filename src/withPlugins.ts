import {
  ConfigPlugin,
  withPlugins as withPluginsExpo,
} from "expo/config-plugins";

import { ExpoConfig } from "expo/config";

export const withPlugins: <const T extends unknown[]>(
  config: ExpoConfig,
  plugins: { [k in keyof T]: [ConfigPlugin<T[k]>, T[k]] }
) => ExpoConfig = (config, plugins) => {
  return withPluginsExpo(config, plugins);
};

// import {
//   withInfoPlist,
//   withEntitlement,
//   withColorValue,
//   withAndroidManifest,
//   withModifyFile,
//   withRemoveFile,
//   withResourceFile,
//   withSourceFile,
//   withStringValue,
// } from "./";
// withPlugins({} as ExpoConfig, [
//   [withEntitlement, { key: "aps-environment", value: "development" }],
//   [
//     withColorValue,
//     { name: "primaryColor", value: "#000000", colorScheme: "dark" },
//   ],
//   [withInfoPlist, { key: "CFBundleDevelopmentRegion", value: "Automatic" }],
//   [
//     withAndroidManifest,
//     {
//       $: { "xmlns:android": "http://schemas.android.com/apk/res/android" },
//       queries: [{ intent: "" }],
//       permission: [{ $: { "android:name": "" } }],
//     },
//   ],
//   [
//     withModifyFile,
//     {
//       filePath: "path/to/file",
//       find: "something",
//       replace: "something else",
//     },
//   ],
//   [
//     withModifyFile,
//     {
//       filePath: "path/to/file",
//       anchor: "something",
//       offset: 10,
//       newSrc: "hello",
//     },
//   ],
//   [withRemoveFile, { filePath: "path/to/file" }],
//   [withResourceFile, { filePath: "path/to/file" }],
//   [withSourceFile, { filePath: "path/to/file" }],
//   [withStringValue, { key: "android:permission", value: "value" }],
// ]);
