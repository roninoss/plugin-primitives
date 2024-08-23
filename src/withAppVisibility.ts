import {
  ConfigPlugin,
  withAndroidManifest,
  withInfoPlist,
} from "@expo/config-plugins";

type WithAppVisibilityParams = {
  scheme: string;
  platforms: ("ios" | "android")[];
};

export const withAppVisibility: ConfigPlugin<WithAppVisibilityParams> = (
  config,
  { scheme, platforms }
) => {
  if (platforms.includes("android")) {
    config = withAndroidManifest(config, async (config) => {
      config.modResults = addSchemeToAndroidManifest(config.modResults, scheme);
      return config;
    });
  }

  if (platforms.includes("ios")) {
    config = withInfoPlist(config, (config) => {
      config.modResults = addSchemeToInfoPlist(config.modResults, scheme);
      return config;
    });
  }

  return config;
};

function addSchemeToAndroidManifest(androidManifest: any, scheme: string) {
  const schemeToAdd = {
    data: {
      $: {
        "android:scheme": scheme,
      },
    },
  };
  const intentFilters =
    androidManifest.manifest?.application?.[0]?.activity?.[0]?.[
      "intent-filter"
    ];
  if (!intentFilters) {
    androidManifest.manifest.application[0]["intent-filter"] = [schemeToAdd];
  } else {
    const existingIntentFilter = intentFilters.find((filter: any) =>
      filter.data?.some((data: any) => data.$["android:scheme"] === scheme)
    );
    if (!existingIntentFilter) {
      intentFilters.push(schemeToAdd);
    }
  }
  return androidManifest;
}

function addSchemeToInfoPlist(infoPlist: any, scheme: string) {
  if (!infoPlist.CFBundleURLTypes) {
    infoPlist.CFBundleURLTypes = [];
  }
  const existingURLType = infoPlist.CFBundleURLTypes.find((urlType: any) =>
    urlType.CFBundleURLSchemes.includes(scheme)
  );
  if (!existingURLType) {
    infoPlist.CFBundleURLTypes.push({
      CFBundleURLSchemes: [scheme],
    });
  }
  return infoPlist;
}
