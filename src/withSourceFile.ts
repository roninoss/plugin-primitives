import {
  ConfigPlugin,
  IOSConfig,
  withXcodeProject,
  XcodeProject,
  withDangerousMod,
} from "@expo/config-plugins";
import path from "path";
import fs from "fs";

export type WithResourcesProps = {
  file: string;
  contents?: string;
  parallelDir?: string;
};

async function getFileContents(
  file: string,
  contents?: string,
  parallelDir?: string
): Promise<string> {
  if (contents) {
    return contents;
  }

  const pluginFilePath = path.join(parallelDir ?? "plugins", file);
  if (fs.existsSync(pluginFilePath)) {
    return fs.readFileSync(pluginFilePath, "utf-8");
  }

  throw new Error(`File not found: ${pluginFilePath}`);
}

/**
 * Add a build source file (ex: `AppDelegate.m`, `ViewController.swift`) to an Xcode project.
 * This is akin to creating a new code file in Xcode with `⌘+n`.
 */
const withSourceIos: ConfigPlugin<WithResourcesProps> = (
  config,
  { file, contents, parallelDir }
) => {
  return withXcodeProject(config, async (config) => {
    const fileContents = await getFileContents(file, contents, parallelDir);
    config.modResults = await setFileInXcodeProjectAsync({
      file,
      contents: fileContents,
      projectName: config.modRequest.projectName || "",
      project: config.modResults,
    });
    return config;
  });
};

async function setFileInXcodeProjectAsync({
  file,
  contents,
  projectName,
  project,
}: {
  file: string;
  contents: string;
  projectName: string;
  project: XcodeProject;
}) {
  if (!project.hasFile(file)) {
    IOSConfig.XcodeUtils.addBuildSourceFileToGroup({
      filepath: file.replace("ios/", ""),
      groupName: projectName,
      project,
    });
  }

  // Write contents to the file
  fs.writeFileSync(file, contents);

  return project;
}

const withSourceAndroid: ConfigPlugin<WithResourcesProps> = (
  config,
  { file, contents, parallelDir }
) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      const filepath = path.join(config.modRequest.platformProjectRoot, file);
      const fileContents = await getFileContents(file, contents, parallelDir);
      fs.writeFileSync(filepath, fileContents);
      return config;
    },
  ]);
};

export const withSourceFile: ConfigPlugin<WithResourcesProps> = (
  config,
  props
) => {
  if (props.file.includes("ios/")) {
    config = withSourceIos(config, props);
  }
  if (props.file.includes("android/")) {
    config = withSourceAndroid(config, props);
  }
  return config;
};
