import { ConfigPlugin, withDangerousMod } from "expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import fs from "fs";
import path from "path";

type WithModifyFileParams =
  | {
      filePath: string;
      newSrc: string;
      anchor: string;
      offset: number;
      find?: never;
      replace?: never;
    }
  | {
      filePath: string;
      find: string;
      replace: string;
      newSrc?: never;
      anchor?: never;
      offset?: never;
    };

/**
 * 🤖 Android and 🍎 iOS
 *
 * A config plugin to modify files in the project
 *
 */
export const withModifyFile: ConfigPlugin<WithModifyFileParams> = (
  config,
  params
) => {
  const platform = params.filePath.includes("android") ? "android" : "ios";
  return withDangerousMod(config, [
    platform,
    (config) => {
      let fileContent = fs.readFileSync(params.filePath, "utf8");

      if ("find" in params) {
        fileContent = fileContent.replace(
          params?.find ?? "",
          params?.replace ?? ""
        );
      } else {
        fileContent = mergeContents({
          tag: "@plugin-pro - modify file",
          src: fileContent,
          newSrc: params.newSrc,
          anchor: params.anchor,
          offset: params.offset,
          comment: getComment(path.extname(params.filePath).slice(1)),
        }).contents;
      }

      fs.writeFileSync(params.filePath, fileContent);
      return config;
    },
  ]);
};

const getComment = (fileType: string): string => {
  switch (fileType) {
    case "java": // Java files (Android)
    case "kt": // Kotlin files (Android)
    case "gradle": // Gradle build files (Android)
      return "//"; // Single line comment

    case "swift": // Swift files (iOS)
    case "m": // Objective-C files (iOS)
      return "//"; // Single line comment

    case "c": // C files (iOS)
    case "h": // Header files (iOS)
    case "mm": // Objective-C++ files (iOS)
      return "//"; // Single line comment

    default:
      return "#";
  }
};
