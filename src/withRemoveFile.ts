import { ConfigPlugin, withXcodeProject } from "@expo/config-plugins";
import { existsSync, unlinkSync } from "fs-extra";
import path from "path";

type WithRemoveFileProps = {
  filePath: string;
};

const withRemoveFileAndroid: ConfigPlugin<WithRemoveFileProps> = (
  config,
  props
) => {
  if (existsSync(props.filePath)) {
    // Remove the file from the filesystem
    unlinkSync(props.filePath);
  }
  return config;
};

const withRemoveFileIos: ConfigPlugin<WithRemoveFileProps> = (
  config,
  props
) => {
  return withXcodeProject(config, (config) => {
    if (existsSync(props.filePath)) {
      // Remove the file from the filesystem
      unlinkSync(props.filePath);

      // Remove the file from the Xcode project
      const projectRoot = config.modRequest.projectRoot;
      const relativeFilePath = path.relative(projectRoot, props.filePath);

      const xcodeProject = config.modResults;
      xcodeProject.removeResourceFile(relativeFilePath, {
        target: xcodeProject.getFirstTarget().uuid,
      });
    }
    return config;
  });
};

export const withRemoveFile: ConfigPlugin<WithRemoveFileProps> = (
  config,
  props
) => {
  if (props.filePath.includes("ios/")) {
    config = withRemoveFileIos(config, props);
  }
  if (props.filePath.includes("android/")) {
    config = withRemoveFileAndroid(config, props);
  }
  return config;
};
