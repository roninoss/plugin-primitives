import { ConfigPlugin, withInfoPlist } from "expo/config-plugins";

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
type WithInfoParams =
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

/**
 * 🤖 iOS Only
 *
 * A config plugin to add/remove/modify values in Info.plist
 *
 */
export const withInfo: ConfigPlugin<WithInfoParams> = (
  config,
  { key, value }
) => {
  config = withInfoPlist(config, (config) => {
    config.modResults[key] = value as any;
    return config;
  });

  return config;
};
