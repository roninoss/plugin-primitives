import { ConfigPlugin, withXcodeProject } from "expo/config-plugins";
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

function getFileType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  // Source file extensions in iOS projects
  const sourceExtensions = [".m", ".mm", ".cpp", ".swift", ".h", ".hpp"];

  // Check if the file is a source file
  if (sourceExtensions.includes(extension)) {
    return "source";
  }

  // All other files are considered resources
  return "resource";
}

const withRemoveFileIos: ConfigPlugin<WithRemoveFileProps> = (
  config,
  props
) => {
  return withXcodeProject(config, (config) => {
    const relativeFilePath = path.join(
      config.modRequest.projectRoot,
      props.filePath
    );

    if (existsSync(relativeFilePath)) {
      // Remove the file from the filesystem
      unlinkSync(relativeFilePath);

      // Remove the file from the Xcode project
      const fileName = path.basename(relativeFilePath);

      const [groupId, _] =
        Object.entries(config.modResults.hash.project.objects["PBXGroup"]).find(
          ([_, group]: [string, any]) =>
            group.children?.some((file: any) => fileName === file.comment)
        ) || [];

      const xcodeProject = config.modResults;

      if (getFileType(relativeFilePath) === "source") {
        xcodeProject.removeSourceFile(
          relativeFilePath,
          {
            target: xcodeProject.getFirstTarget().uuid,
          },
          groupId
        );
      } else {
        // xcodeProject.removeResourceFile(
        //   relativeFilePath,
        //   {
        //     target: xcodeProject.getFirstTarget().uuid,
        //   },
        //   groupId
        // );
      }
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
