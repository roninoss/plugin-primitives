// https://github.com/Malaa-tech/expo-custom-assets/blob/main/src/index.ts

import {
  ConfigPlugin,
  IOSConfig,
  withDangerousMod,
  withXcodeProject,
} from "expo/config-plugins";
import { ExpoConfig } from "@expo/config-types";
import { copyFileSync, ensureDirSync } from "fs-extra";
import * as path from "path";

export type WithResourceFileProps = {
  filePath: string;
  parallelDir?: string;
};

function withCustomAssetAndroid(
  config: ExpoConfig,
  props: WithResourceFileProps
) {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const { projectRoot } = config.modRequest;
      const destPath = path.join(projectRoot, props.filePath);
      const srcPath = path.join(
        projectRoot,
        props.parallelDir ?? "plugins",
        props.filePath
      );

      copyFileSync(srcPath, destPath);

      return config;
    },
  ]);
}

function withCustomAssetIos(config: ExpoConfig, props: WithResourceFileProps) {
  return withXcodeProject(config, async (config) => {
    const { projectRoot } = config.modRequest;

    const destPath = path.join(projectRoot, props.filePath);
    const srcPath = path.join(
      projectRoot,
      props.parallelDir ?? "plugins",
      props.filePath
    );
    ensureDirSync(path.dirname(destPath));
    copyFileSync(srcPath, destPath);

    const project = config.modResults;
    const groupName = config.modRequest.projectName ?? "Assets";

    IOSConfig.XcodeUtils.addResourceFileToGroup({
      filepath: destPath,
      groupName,
      project,
      isBuildFile: true,
    });

    return config;
  });
}

/**
 * 🤖 Android and 🍎 iOS
 *
 * A config plugin to add resource files to the project
 *
 */
export const withResourceFile: ConfigPlugin<WithResourceFileProps> = (
  config,
  props
) => {
  if (props.filePath.includes("ios/")) {
    config = withCustomAssetIos(config, props);
  }
  if (props.filePath.includes("android/")) {
    config = withCustomAssetAndroid(config, props);
  }
  return config;
};
