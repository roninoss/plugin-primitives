import {
  ConfigPlugin,
  withInfoPlist as withInfoPlistExpo,
} from "expo/config-plugins";

type InterfaceStyle = "Light" | "Dark" | "Automatic";
type URLScheme = {
  CFBundleURLName?: string;
  CFBundleURLSchemes: string[];
};
type InterfaceOrientation =
  | "UIInterfaceOrientationPortrait"
  | "UIInterfaceOrientationPortraitUpsideDown"
  | "UIInterfaceOrientationLandscapeLeft"
  | "UIInterfaceOrientationLandscapeRight";
type WithEnvironmentVariablesParams =
  | { key: "UIStatusBarHidden" | (string & {}); value: boolean }
  | { key: "UIStatusBarStyle" | (string & {}); value: string }
  | {
      key: "UILaunchStoryboardName" | (string & {});
      value: string | "SplashScreen";
    }
  | { key: "CFBundleShortVersionString" | (string & {}); value: string }
  | { key: "CFBundleVersion" | (string & {}); value: string }
  | { key: "CFBundleDisplayName" | (string & {}); value: string }
  | { key: "CFBundleIdentifier" | (string & {}); value: string }
  | { key: "CFBundleName" | (string & {}); value: string }
  | { key: "CFBundleURLTypes" | (string & {}); value: URLScheme[] }
  | { key: "CFBundleDevelopmentRegion" | (string & {}); value: string }
  | { key: "ITSAppUsesNonExemptEncryption" | (string & {}); value: boolean }
  | { key: "LSApplicationQueriesSchemes" | (string & {}); value: string[] }
  | { key: "UIBackgroundModes" | (string & {}); value: string[] }
  | {
      key: "UISupportedInterfaceOrientations" | (string & {});
      value: InterfaceOrientation[];
    }
  | { key: "GMSApiKey" | (string & {}); value: string }
  | { key: "GADApplicationIdentifier" | (string & {}); value: string }
  | { key: "UIUserInterfaceStyle" | (string & {}); value: InterfaceStyle }
  | { key: "UIRequiresFullScreen" | (string & {}); value: boolean }
  | {
      key: "SKAdNetworkItems" | (string & {});
      value: { SKAdNetworkIdentifier: string }[];
    }
  | { key: "branch_key" | (string & {}); value: { live?: string } };

export const withInfoPlist: ConfigPlugin<WithEnvironmentVariablesParams> = (
  config,
  { key, value }
) => {
  config = withInfoPlistExpo(config, (config) => {
    config.modResults[key] = value as any;
    return config;
  });

  return config;
};
