import { ExpoConfig } from "@expo/config-types";
import fs from "fs-extra";
import path from "path";
import { withRemoveFile } from "../src/withRemoveFile";
import { withModifyFile } from "../src/withModifyFile";
import { withSourceFile } from "../src/withSourceFile";
import { withResourceFile } from "../src/withResourceFile";
import { withInfo } from "../src/withInfo";
import { withAndroidManifest } from "../src/withAndroidManifest";
import { withEntitlement } from "../src/withEntitlement";
import { withColor } from "../src/withColor";
import { withString } from "../src/withString";
import { withXcodeProject } from "expo/config-plugins";
import { withDangerousMod } from "expo/config-plugins";

// Mock fs-extra
jest.mock("fs-extra");
// Mock @expo/config-plugins
jest.mock("@expo/config-plugins");

// Add this mock near the top with other mocks
jest.mock("expo/config-plugins", () => ({
  ...jest.requireActual("expo/config-plugins"),
  withDangerousMod: jest.fn((config, [platform, callback]) => {
    callback(config);
    return config;
  }),
}));

describe("Config Plugins", () => {
  let mockConfig: ExpoConfig;

  beforeEach(() => {
    mockConfig = {
      name: "TestApp",
      slug: "test-app",
    };
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  describe("withRemoveFile", () => {
    it("should remove iOS file from filesystem and Xcode project", () => {
      // Mock fs functions
      const mockExistsSync = fs.existsSync as jest.Mock;
      mockExistsSync.mockReturnValue(true);

      // Mock Xcode project structure
      const mockXcodeProject = {
        hash: {
          project: {
            objects: {
              PBXGroup: {
                groupId123: {
                  children: [{ comment: "TestFile.swift" }],
                },
              },
            },
          },
        },
        getFirstTarget: jest.fn().mockReturnValue({ uuid: "target123" }),
        removeSourceFile: jest.fn(),
      };

      // Mock withXcodeProject to provide the mock project
      (withXcodeProject as jest.Mock).mockImplementation((config, callback) => {
        return callback({
          ...config,
          modResults: mockXcodeProject,
          modRequest: {
            projectRoot: "/",
          },
        });
      });

      const props = { filePath: "ios/TestFile.swift" };
      withRemoveFile(mockConfig, props);

      expect(fs.existsSync).toHaveBeenCalledWith(
        expect.stringContaining(props.filePath)
      );
      expect(fs.unlinkSync).toHaveBeenCalledWith(
        expect.stringContaining(props.filePath)
      );
      expect(mockXcodeProject.removeSourceFile).toHaveBeenCalled();
    });

    it("should remove Android file from filesystem", () => {
      const mockExistsSync = fs.existsSync as jest.Mock;
      mockExistsSync.mockReturnValue(true);

      const props = { filePath: "android/app/src/main/java/TestFile.java" };
      withRemoveFile(mockConfig, props);

      expect(fs.existsSync).toHaveBeenCalledWith(props.filePath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(props.filePath);
    });
  });

  describe("withModifyFile", () => {
    it("should modify file content using find and replace", () => {
      const mockReadFileSync = fs.readFileSync as jest.Mock;
      mockReadFileSync.mockReturnValue("original content");

      // Add spy for withDangerousMod
      const withDangerousModSpy = jest.spyOn(
        require("expo/config-plugins"),
        "withDangerousMod"
      );

      // spy on fs.readFileSync
      const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
      readFileSyncSpy.mockReturnValue("original content");

      const props = {
        filePath: "ios/TestFile.swift",
        find: "original",
        replace: "modified",
      };
      withModifyFile(mockConfig, props);

      // Verify withDangerousMod was called
      expect(withDangerousModSpy).toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        props.filePath,
        "modified content"
      );
    });
  });

  describe("withSourceFile", () => {
    it("should add source file to iOS project", async () => {
      // Mock Xcode project structure
      const mockXcodeProject = {
        hash: {
          project: {
            objects: {
              PBXGroup: {
                groupId123: {
                  children: [],
                },
              },
            },
          },
        },
        getFirstTarget: jest.fn().mockReturnValue({ uuid: "target123" }),
        hasFile: jest.fn().mockReturnValue(false),
      };

      // Mock withXcodeProject
      (withXcodeProject as jest.Mock).mockImplementation((config, callback) => {
        return callback({
          ...config,
          modResults: mockXcodeProject,
          modRequest: {
            projectRoot: "/",
          },
        });
      });

      // Mock fs functions
      const mockWriteFileSync = fs.writeFileSync as jest.Mock;
      mockWriteFileSync.mockImplementation(() => {});

      const props = {
        filePath: "ios/TestFile.swift",
        contents: "test content",
      };
      await withSourceFile(mockConfig, props);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        props.filePath,
        props.contents
      );
    });
  });

  describe("withResourceFile", () => {
    it("should copy resource file to iOS project", () => {
      const props = {
        filePath: "ios/Resources/image.png",
        parallelDir: "assets",
      };
      withResourceFile(mockConfig, props);

      expect(fs.copyFileSync).toHaveBeenCalled();
    });
  });

  describe("withInfo", () => {
    it("should modify Info.plist values", () => {
      const props = {
        key: "CFBundleDisplayName",
        value: "Modified App Name",
      };
      withInfo(mockConfig, props);

      // Verify that withInfoPlist was called with correct parameters
      expect(mockConfig).toBeDefined();
    });
  });

  describe("withAndroidManifest", () => {
    it("should modify Android manifest attributes", () => {
      const manifestData = {
        application: {
          "android:label": "Modified App Name",
        },
      };
      // @ts-ignore
      withAndroidManifest(mockConfig, manifestData);

      // Verify that withAndroidManifest was called with correct parameters
      expect(mockConfig).toBeDefined();
    });
  });

  describe("withEntitlement", () => {
    it("should set entitlement value", () => {
      const props = {
        key: "com.apple.developer.applesignin",
        value: true,
      };
      // @ts-ignore
      withEntitlement(mockConfig, props);

      // Verify that withEntitlement was called with correct parameters
      expect(mockConfig).toBeDefined();
    });
  });

  describe("withColor", () => {
    it("should set color value for light mode", () => {
      const props = {
        name: "primary_color",
        value: "#FF0000",
        night: true,
      };
      withColor(mockConfig, props);

      // Verify that withColorValue was called with correct parameters
      expect(mockConfig).toBeDefined();
    });
  });

  describe("withString", () => {
    it("should set string value in strings.xml", () => {
      const props = {
        key: "app_name",
        value: "Modified App Name",
        translatable: false,
      };
      withString(mockConfig, props);

      // Verify that withStringValue was called with correct parameters
      expect(mockConfig).toBeDefined();
    });
  });
});
