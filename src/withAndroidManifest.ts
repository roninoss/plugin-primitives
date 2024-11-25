import {
  AndroidManifest,
  ConfigPlugin,
  withAndroidManifest as withAndroidManifestExpo,
} from "expo/config-plugins";

export type ManifestCategory = keyof AndroidManifest["manifest"];
type ManifestQueryIntent =
  AndroidManifest["manifest"]["queries"][number]["intent"];

type UsesPermissionModification = {
  category: "uses-permission";
  name: string;
};

type ApplicationModification = {
  category: "application";
  attribute: "meta-data" | "activity";
};

type QueriesModification = {
  category: "queries";
  package?: { name: string };
  provider?: { authorities: string };
  intent?: ManifestQueryIntent;
};

type UsesFeatureModification = {
  category: "uses-feature";
  name: string;
  required?: boolean;
};

type PermissionModification = {
  category: "permission";
  name: string;
  protectionLevel?: string;
};

type AndroidManifestParams =
  | UsesPermissionModification
  | ApplicationModification
  | PermissionModification
  | UsesFeatureModification
  | QueriesModification;

type MetaDataParams = {
  category: "application";
  attribute: "meta-data";
  name: string;
  value: string;
};

type ActivityParams = {
  category: "application";
  attribute: "activity";
  name: string;
  exported?: boolean;
  launchMode?: "standard" | "singleTop" | "singleTask" | "singleInstance";
  screenOrientation?: "portrait" | "landscape" | "unspecified";
};

/**
 * 🤖 Android Only
 *
 * A config plugin to apply a modification to AndroidManifest.xml
 *
 */
export const withManifestPermission: ConfigPlugin<
  UsesPermissionModification
> = (config, { name }) => {
  return withAndroidManifestExpo(config, async (config) => {
    const usesPermission = config.modResults.manifest["uses-permission"] ?? [];
    if (!usesPermission.find((p) => p?.$["android:name"] === name)) {
      usesPermission.push({ $: { "android:name": name } });
    }
    return config;
  });
};

export const withManifestFeature: ConfigPlugin<UsesFeatureModification> = (
  config,
  { name, required }
) => {
  return withAndroidManifestExpo(config, async (config) => {
    const usesFeature = config.modResults.manifest["uses-feature"] ?? [];
    if (!usesFeature.find((p) => p?.$["android:name"] === name)) {
      usesFeature.push({
        $: {
          "android:name": name,
          "android:required": required ? "true" : "false",
        },
      });
    }
    return config;
  });
};

export const withManifestQuery: ConfigPlugin<QueriesModification> = (
  config,
  { intent, package: pkg, provider }
) => {
  return withAndroidManifestExpo(config, async (config) => {
    const queries = config.modResults.manifest.queries ?? [];

    if (pkg) {
      queries.push({ package: [{ $: { "android:name": pkg.name } }] });
    }
    if (provider) {
      queries.push({
        provider: [{ $: { "android:authorities": provider.authorities } }],
      });
    }
    if (intent) {
      queries.push({ intent });
    }
    return config;
  });
};

export const withManifestCustomPermission: ConfigPlugin<
  PermissionModification
> = (config, { name, protectionLevel }) => {
  return withAndroidManifestExpo(config, async (config) => {
    const permission = config.modResults.manifest.permission ?? [];
    if (!permission.find((p) => p?.$["android:name"] === name)) {
      permission.push({
        $: {
          "android:name": name,
          "android:protectionLevel": protectionLevel ?? "normal",
        },
      });
    }
    return config;
  });
};

// export const withManifestApplication: ConfigPlugin<
//   MetaDataParams | ActivityParams
// > = (config, { attribute, ...params }) => {
//   return withAndroidManifestExpo(config, async (config) => {
//     const application = config.modResults.manifest.application?.[0] ?? {};

//     if (attribute === "meta-data") {
//       const { name, value } = params as MetaDataParams;
//       const metaData = application["meta-data"] ?? [];

//       if (!metaData.find((m) => m?.$["android:name"] === name)) {
//         metaData.push({
//           $: {
//             "android:name": name,
//             "android:value": value,
//           },
//         });
//       }
//       application["meta-data"] = metaData;
//     } else if (attribute === "activity") {
//       const { name, exported, launchMode, screenOrientation } =
//         params as ActivityParams;
//       const activities = application.activity ?? [];

//       if (!activities.find((a) => a?.$["android:name"] === name)) {
//         const activityAttributes: Record<string, string> = {
//           "android:name": name,
//         };

//         if (exported !== undefined) {
//           activityAttributes["android:exported"] = String(exported);
//         }
//         if (launchMode) {
//           activityAttributes["android:launchMode"] = launchMode;
//         }
//         if (screenOrientation) {
//           activityAttributes["android:screenOrientation"] = screenOrientation;
//         }

//         activities.push({
//           $: activityAttributes,
//         });
//       }
//       application.activity = activities;
//     }

//     config.modResults.manifest.application = [application];
//     return config;
//   });
// };
