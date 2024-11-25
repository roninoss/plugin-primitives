import { ConfigPlugin, withXcodeProject, IOSConfig } from "expo/config-plugins";
import path from "path";
import fs from "fs";
import XcodeProject from "xcode";

export const withPbxProject: ConfigPlugin = (config) => {
  return withXcodeProject(config, async (config) => {
    const pbxProjectPath = IOSConfig.Paths.getPBXProjectPath(
      config.modRequest.projectRoot
    );
    const relativeFilePath = path.relative(
      config.modRequest.projectRoot,
      pbxProjectPath
    );
    const pluginFilePath = path.join("plugins", relativeFilePath);
    if (!fs.existsSync(pluginFilePath)) {
      console.log(
        `${pluginFilePath} does not exist. Skipping withPbxProject...`
      );
      return config;
    }
    const project = XcodeProject.project(pluginFilePath);
    project.parseSync();
    config.modResults.hash = project.hash;
    return config;
  });
};

// import { ConfigPlugin, IOSConfig, withXcodeProject } from "expo/config-plugins";
// import {
//   PBXBuildFile,
//   PBXContainerItemProxy,
//   PBXCopyFilesBuildPhase,
//   PBXFileReference,
//   PBXFrameworksBuildPhase,
//   PBXGroup,
//   PBXNativeTarget,
//   PBXProject,
//   PBXResourcesBuildPhase,
//   PBXShellScriptBuildPhase,
//   PBXSourcesBuildPhase,
//   PBXTargetDependency,
//   XCBuildConfiguration,
//   XCConfigurationList,
// } from "@bacons/xcode";
// import path from "path";
// import fs from "fs";

// function quotedString(str: string) {
//   return `"${str.replace(/"/g, '\\"')}"`;
// }

// function needsQuoting(key: string): boolean {
//   return /[^a-zA-Z0-9_]/.test(key);
// }

// function wrapKey(key: string): string {
//   const cleanKey = key.replace(/^['"]|['"]$/g, "");
//   return needsQuoting(cleanKey)
//     ? `"${cleanKey.replace(/"/g, '\\"')}"`
//     : cleanKey;
// }

// function wrapValue(value: any): any {
//   if (typeof value === "string") {
//     return quotedString(value);
//   } else if (Array.isArray(value)) {
//     return value.map(wrapValue);
//   } else if (typeof value === "object" && value !== null) {
//     return Object.fromEntries(
//       Object.entries(value).map(([k, v]) => [wrapKey(k), wrapValue(v)])
//     );
//   }
//   return value;
// }

// export const withBuildFile: ConfigPlugin<
//   Omit<PBXBuildFile["props"], "fileRef" | "isa" | "productRef"> & {
//     isa: "PBXBuildFile";
//     uuid: string;
//     fileRef?: string;
//     productRef?: string;
//   }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let buildFiles = project.hash.project.objects["PBXBuildFile"];
//     if (!buildFiles) {
//       buildFiles = {};
//     }
//     buildFiles[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withContainerItemProxy: ConfigPlugin<
//   Omit<
//     PBXContainerItemProxy["props"],
//     "isa" | "proxyType" | "containerPortal"
//   > & {
//     uuid: string;
//     isa: "PBXContainerItemProxy";
//     containerPortal: string;
//     proxyType: string;
//   }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let proxies = project.hash.project.objects["PBXContainerItemProxy"];
//     if (!proxies) {
//       proxies = {};
//     }
//     proxies[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withCopyFilesBuildPhase: ConfigPlugin<
//   Omit<PBXCopyFilesBuildPhase["props"], "isa"> & {
//     uuid: string;
//     isa: "PBXCopyFilesBuildPhase";
//   }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     params;
//     const project = config.modResults;
//     let copyFiles = project.hash.project.objects["PBXCopyFilesBuildPhase"];
//     if (!copyFiles) {
//       copyFiles = {};
//     }
//     copyFiles[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withFileReference: ConfigPlugin<
//   Omit<PBXFileReference["props"], "isa"> & {
//     uuid: string;
//     isa: "PBXFileReference";
//   }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let fileRefs = project.hash.project.objects["PBXFileReference"];
//     if (!fileRefs) {
//       fileRefs = {};
//     }
//     fileRefs[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withFrameworksBuildPhase: ConfigPlugin<
//   Omit<PBXFrameworksBuildPhase["props"], "isa"> & {
//     uuid: string;
//     isa: "PBXFrameworksBuildPhase";
//   }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let frameworks = project.hash.project.objects["PBXFrameworksBuildPhase"];
//     if (!frameworks) {
//       frameworks = {};
//     }
//     frameworks[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// withFrameworksBuildPhase({} as any, {
//   uuid: "13B07F8E1A680F5B00A75B9A",
//   isa: "PBXFrameworksBuildPhase",
//   buildActionMask: 1,
//   files: [],
//   runOnlyForDeploymentPostprocessing: 0,
//   alwaysOutOfDate: 1,
// });

// export const withGroup: ConfigPlugin<
//   Omit<PBXGroup["props"], "children"> & { uuid: string; children: string[] }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let groups = project.hash.project.objects["PBXGroup"];
//     if (!groups) {
//       groups = {};
//     }
//     groups[uuid] = wrapValue(rest);
//     const mainGroup = Object.values(groups).find(
//       // @ts-expect-error
//       (group) => group.name === config.modRequest.projectName
//     );
//     if (mainGroup) {
//       // @ts-expect-error
//       mainGroup.children.push(
//         wrapValue({
//           value: uuid,
//           comment: params.name,
//         })
//       );
//     }
//     return config;
//   });
// };

// export const withNativeTarget: ConfigPlugin<
//   PBXNativeTarget["props"] & { uuid: string }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let nativeTargets = project.hash.project.objects["PBXNativeTarget"];
//     if (!nativeTargets) {
//       nativeTargets = {};
//     }
//     nativeTargets[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withProject: ConfigPlugin<
//   PBXProject["props"] & { uuid: string }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let pbxProjects = project.hash.project.objects["PBXProject"];
//     if (!pbxProjects) {
//       pbxProjects = {};
//     }
//     pbxProjects[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// type ResourcesBuildPhaseProps = Omit<
//   PBXResourcesBuildPhase["props"],
//   "files"
// > & { uuid: string; files: string[] };

// export const withResourcesBuildPhase: ConfigPlugin<ResourcesBuildPhaseProps> = (
//   config,
//   params
// ) => {
//   params.files;
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let resources = project.hash.project.objects["PBXResourcesBuildPhase"];
//     if (!resources) {
//       resources = {};
//     }
//     resources[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withShellScriptBuildPhase: ConfigPlugin<
//   PBXShellScriptBuildPhase["props"] & { uuid: string }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let shellScripts = project.hash.project.objects["PBXShellScriptBuildPhase"];
//     if (!shellScripts) {
//       shellScripts = {};
//     }
//     shellScripts[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withSourcesBuildPhase: ConfigPlugin<
//   PBXSourcesBuildPhase["props"] & { uuid: string }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let sources = project.hash.project.objects["PBXSourcesBuildPhase"];
//     if (!sources) {
//       sources = {};
//     }
//     sources[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withTargetDependency: ConfigPlugin<
//   PBXTargetDependency["props"] & { uuid: string }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let targetDependencies =
//       project.hash.project.objects["PBXTargetDependency"];
//     if (!targetDependencies) {
//       targetDependencies = {};
//     }
//     targetDependencies[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withBuildConfiguration: ConfigPlugin<
//   XCBuildConfiguration["props"] & { uuid: string }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let buildConfigurations =
//       project.hash.project.objects["XCBuildConfiguration"];
//     if (!buildConfigurations) {
//       buildConfigurations = {};
//     }
//     buildConfigurations[uuid] = wrapValue(rest);
//     return config;
//   });
// };

// export const withBuildSettings: ConfigPlugin<{
//   name: string;
//   buildType: "Debug" | "Release";
//   key: XCBuildConfiguration["props"];
//   value: string;
// }> = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     return config;
//   });
// };

// export const withConfigurationList: ConfigPlugin<
//   XCConfigurationList["props"] & { uuid: string }
// > = (config, params) => {
//   return withXcodeProject(config, async (config) => {
//     const { uuid, ...rest } = params;
//     const project = config.modResults;
//     let configurationLists =
//       project.hash.project.objects["XCConfigurationList"];
//     if (!configurationLists) {
//       configurationLists = {};
//     }
//     configurationLists[uuid] = wrapValue(rest);
//     return config;
//   });
// };
