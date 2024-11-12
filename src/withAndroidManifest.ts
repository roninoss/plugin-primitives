import { ExpoConfig } from "@expo/config-types";
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

/**
 * 🤖 Android Only
 *
 * A config plugin to apply a modification to AndroidManifest.xml
 *
 */
export const withAndroidManifest: ConfigPlugin<AndroidManifestParams> = (
  config,
  { category, ...rest }
) => {
  return withAndroidManifestExpo(config, async (config) => {
    if (category === "uses-permission") {
      const { name } = rest as UsesPermissionModification;
      const usesPermission =
        config.modResults.manifest["uses-permission"] ?? [];
      if (!usesPermission.find((p) => p?.$["android:name"] === name)) {
        usesPermission.push({ $: { "android:name": name } });
      }
    } else if (category === "application") {
      // const { attribute, value } = rest as ApplicationModification;
      // const application = config.modResults.manifest.application ?? [];
      // if (!application.find((p) => p?.$[attribute] === value)) {
      //   // application.push({  });
      // }
    } else if (category === "permission") {
      const { name, protectionLevel } = rest as PermissionModification;
      const permission = config.modResults.manifest.permission ?? [];
      if (!permission.find((p) => p?.$["android:name"] === name)) {
        permission.push({
          $: {
            "android:name": name,
            "android:protectionLevel": protectionLevel ?? "normal",
          },
        });
      }
    } else if (category === "uses-feature") {
      const { name, required } = rest as UsesFeatureModification;
      const usesFeature = config.modResults.manifest["uses-feature"] ?? [];
      if (!usesFeature.find((p) => p?.$["android:name"] === name)) {
        usesFeature.push({
          $: {
            "android:name": name,
            "android:required": required ? "true" : "false",
          },
        });
      }
    } else if (category === "queries") {
      const { intent, package: pkg, provider } = rest as QueriesModification;
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
        queries.push({
          intent: intent,
        });
      }
    }
    return config;
  });
};
