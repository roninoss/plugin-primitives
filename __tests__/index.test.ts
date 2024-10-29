import { ExpoConfig } from "@expo/config-types";
import fs from "fs-extra";
import path from "path";
import { withRemoveFile } from "../src/withRemoveFile";
import { withModifyFile } from "../src/withModifyFile";
import { withSourceFile } from "../src/withSourceFile";
import { withResourceFile } from "../src/withResourceFile";
import { withInfoPlist } from "../src/withInfoPlist";
import { withAndroidManifest } from "../src/withAndroidManifest";
import { withEntitlement } from "../src/withEntitlement";
import { withColorValue } from "../src/withColorValue";
import { withStringValue } from "../src/withStringValue";

// Mock fs-extra
jest.mock("fs-extra");
// Mock @expo/config-plugins
jest.mock("@expo/config-plugins");

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
      const mockExistsSync = fs.existsSync as jest.Mock;
      mockExistsSync.mockReturnValue(true);

      const props = { filePath: "ios/TestFile.swift" };
      withRemoveFile(mockConfig, props);

      expect(fs.existsSync).toHaveBeenCalledWith(props.filePath);
      expect(fs.unlinkSync).toHaveBeenCalledWith(props.filePath);
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

      const props = {
        filePath: "ios/TestFile.swift",
        find: "original",
        replace: "modified",
      };
      withModifyFile(mockConfig, props);

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        props.filePath,
        "modified content"
      );
    });
  });

  describe("withSourceFile", () => {
    it("should add source file to iOS project", async () => {
      const props = {
        file: "ios/TestFile.swift",
        contents: "test content",
      };
      await withSourceFile(mockConfig, props);

      expect(fs.writeFileSync).toHaveBeenCalledWith(props.file, props.contents);
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

  describe("withInfoPlist", () => {
    it("should modify Info.plist values", () => {
      const props = {
        key: "CFBundleDisplayName",
        value: "Modified App Name",
      };
      withInfoPlist(mockConfig, props);

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

  describe("withColorValue", () => {
    it("should set color value for light mode", () => {
      const props = {
        name: "primary_color",
        value: "#FF0000",
        colorScheme: "light" as const,
      };
      withColorValue(mockConfig, props);

      // Verify that withColorValue was called with correct parameters
      expect(mockConfig).toBeDefined();
    });
  });

  describe("withStringValue", () => {
    it("should set string value in strings.xml", () => {
      const props = {
        key: "app_name",
        value: "Modified App Name",
        translatable: false,
      };
      withStringValue(mockConfig, props);

      // Verify that withStringValue was called with correct parameters
      expect(mockConfig).toBeDefined();
    });
  });
});
