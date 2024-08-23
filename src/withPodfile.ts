import { ConfigPlugin, withDangerousMod } from "@expo/config-plugins";
import { mergeContents } from "@expo/config-plugins/build/utils/generateCode";
import fs from "fs";
import path from "path";

type WithPodfileParams =
  | {
      action: "append";
      to: string;
      content: string;
    }
  | {
      action: "prepend";
      to: string;
      content: string;
    }
  | {
      action: "remove";
      content?: string;
    }
  | {
      action: "replace";
      content?: string;
      with: string;
    };

export const withPodfile: ConfigPlugin<WithPodfileParams> = (
  config,
  params
) => {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      let podfileContent = fs.readFileSync(podfilePath, "utf-8");

      switch (params.action) {
        case "append":
          podfileContent = mergeContents({
            tag: "append-content",
            src: podfileContent,
            newSrc: params.content,
            anchor: params.to,
            offset: 0,
            comment: "#",
          }).contents;
          break;
        case "prepend":
          podfileContent = mergeContents({
            tag: "prepend-content",
            src: podfileContent,
            newSrc: params.content,
            anchor: params.to,
            offset: 0,
            comment: "#",
          }).contents;
          break;
        case "remove":
          if (params.content) {
            podfileContent = mergeContents({
              tag: "remove-content",
              src: podfileContent,
              newSrc: "",
              anchor: params.content,
              offset: 0,
              comment: "#",
            }).contents;
          }
          break;
        case "replace":
          podfileContent = mergeContents({
            tag: "replace-content",
            src: podfileContent,
            newSrc: params.with,
            anchor: params.content || "",
            offset: 0,
            comment: "#",
          }).contents;
          break;
        default:
          throw new Error("Unknown action");
      }

      fs.writeFileSync(podfilePath, podfileContent);
      return config;
    },
  ]);
};
