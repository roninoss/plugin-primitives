import {
  ConfigPlugin,
  withAndroidManifest,
  withInfoPlist,
} from "expo/config-plugins";

const permissionMapping = {
  camera: {
    android: "android.permission.CAMERA",
    ios: "NSCameraUsageDescription",
  },
  location: {
    android: "android.permission.ACCESS_FINE_LOCATION",
    ios: "NSLocationWhenInUseUsageDescription",
  },
  locationAlways: {
    android: "android.permission.ACCESS_BACKGROUND_LOCATION",
    ios: "NSLocationAlwaysUsageDescription",
  },
  microphone: {
    android: "android.permission.RECORD_AUDIO",
    ios: "NSMicrophoneUsageDescription",
  },
  contacts: {
    android: "android.permission.READ_CONTACTS",
    ios: "NSContactsUsageDescription",
  },
  calendar: {
    android: "android.permission.READ_CALENDAR",
    ios: "NSCalendarsUsageDescription",
  },
  reminders: {
    android: undefined,
    ios: "NSRemindersUsageDescription",
  },
  photoLibrary: {
    android: undefined,
    ios: "NSPhotoLibraryUsageDescription",
  },
  mediaLibrary: {
    android: "android.permission.READ_EXTERNAL_STORAGE",
    ios: "NSAppleMusicUsageDescription",
  },
  motion: {
    android: undefined,
    ios: "NSMotionUsageDescription",
  },
  bluetooth: {
    android: "android.permission.BLUETOOTH",
    ios: "NSBluetoothPeripheralUsageDescription",
  },
  health: {
    android: undefined,
    ios: "NSHealthShareUsageDescription",
  },
  healthUpdate: {
    android: undefined,
    ios: "NSHealthUpdateUsageDescription",
  },
};

type WithPermissionsParams = {
  type: keyof typeof permissionMapping;
  reason: string;
  platforms: ("ios" | "android")[];
};

export const withPermissions: ConfigPlugin<WithPermissionsParams> = (
  config,
  { type, reason, platforms }
) => {
  const permission = permissionMapping[type];
  if (!permission) {
    throw new Error(`Unsupported permission type: ${type}`);
  }

  if (platforms.includes("ios") && permission.ios) {
    config = withInfoPlist(config, (config) => {
      config.modResults[permission.ios] = reason;
      return config;
    });
  }

  if (platforms.includes("android") && permission.android) {
    config = withAndroidManifest(config, (config) => {
      const androidManifest = config.modResults.manifest;
      const androidPermission = {
        $: {
          "android:name": permission.android,
        },
      };

      if (
        !androidManifest["uses-permission"] ||
        !androidManifest["uses-permission"].some(
          (perm) => perm.$["android:name"] === permission.android
        )
      ) {
        androidManifest["uses-permission"] = [
          ...(androidManifest["uses-permission"] || []),
          androidPermission,
        ];
      }

      return config;
    });
  }

  return config;
};
