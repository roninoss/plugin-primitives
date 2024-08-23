import {
  ConfigPlugin,
  withInfoPlist as withInfoPlistExpo,
} from "@expo/config-plugins";

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
  | { key: "UIStatusBarHidden"; value: boolean }
  | { key: "UIStatusBarStyle"; value: string }
  | { key: "UILaunchStoryboardName"; value: string | "SplashScreen" }
  | { key: "CFBundleShortVersionString"; value: string }
  | { key: "CFBundleVersion"; value: string }
  | { key: "CFBundleDisplayName"; value: string }
  | { key: "CFBundleIdentifier"; value: string }
  | { key: "CFBundleName"; value: string }
  | { key: "CFBundleURLTypes"; value: URLScheme[] }
  | { key: "CFBundleDevelopmentRegion"; value: string }
  | { key: "ITSAppUsesNonExemptEncryption"; value: boolean }
  | { key: "LSApplicationQueriesSchemes"; value: string[] }
  | { key: "UIBackgroundModes"; value: string[] }
  | { key: "UISupportedInterfaceOrientations"; value: InterfaceOrientation[] }
  | { key: "GMSApiKey"; value: string }
  | { key: "GADApplicationIdentifier"; value: string }
  | { key: "UIUserInterfaceStyle"; value: InterfaceStyle }
  | { key: "UIRequiresFullScreen"; value: boolean }
  | { key: "SKAdNetworkItems"; value: { SKAdNetworkIdentifier: string }[] }
  | { key: "branch_key"; value: { live?: string } };

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
