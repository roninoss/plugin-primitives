# Plugin Primitives

## What is it?

A collection of type-safe config plugin primitives that handle common native configuration tasks.

## API

### `withColor` 🤖

Adds, modifies, or removes a color value to the `colors.xml` file. Supports both normal and night modes.

```javascript
withColor(config, {
  name: "primaryColor",
  value: "#000000",
  night: true,
});
```

### `withString` 🤖

Adds, modifies, or removes a string value to the `strings.xml` file.

```javascript
withString(config, {
  name: "stringName",
  value: "Hello, world!",
  translatable: true,
});
```

### `withEntitlement` 🍎

Adds, modifies, or removes an entitlement to your app, allowing it to access a feature on the device.

```javascript
withEntitlement(config, {
  key: "com.apple.developer.healthkit.access",
  value: "yes",
});
```

### `withInfo` 🍎

Adds, modifies, or removes a key/value pair to the `Info.plist` file.

```javascript
withInfo(config, {
  key: "NSHealthShareUsageDescription",
  value: "We need access to your health data.",
});
```

### `withPbxProject` 🍎

Modify the `project.pbxproj` file. The plugin will use the `project.pbxproj` file found in the plugin's `parallelDir` directory, which defaults to `plugins` and overwrite the original file.

```javascript
withPbxProject(config);
```

### `withModifyFile` 🤖 🍎

Modify a file by finding and replacing a string.

```javascript
withModifyFile(config, {
  filePath: "AppDelegate.m",
  find: "something",
  replace: "something else",
});
```

Or insert a string at a specific anchor and offset.

```javascript
withModifyFile(config, {
  filePath: "AppDelegate.m",
  newSrc: "hello",
  anchor: "something",
  offset: 10,
});
```

### `withSourceFile` 🤖 🍎

Add a source file to the project. Accepts an optional `contents` parameter to specify the contents of the file. If not provided, the contents will be read from the file at `plugins/<filePath>`. Also accepts an optional `parallelDir` parameter to specify a directory (relative to the project root) to place the file in, which defaults to `plugins`.

```javascript
withSourceFile(config, {
  filePath: "ios/AppDelegate.m",
  contents: `
    #import "AppDelegate.h"
    #import <React/RCTBridge.h>
    #import <React/RCTBundleURLProvider.h>
    #import <React/RCTRootView.h>
    ...
  `,
});
```

### `withResourceFile` 🤖 🍎

Add a resource file to the project. Accepts an optional `parallelDir` parameter to specify a directory (relative to the project root) to place the file in, which defaults to `plugins`.

```javascript
withResourceFile(config, {
  filePath: "android/src/main/res/values/strings2.xml",
});
```

### `withRemoveFile` 🤖 🍎

Removes a file and any references to it from the project.

```javascript
withRemoveFile(config, {
  filePath: "path/to/file",
});
```

### `withPlugins` 🤖 🍎

Applies multiple plugins.

```javascript
withPlugins(config, [
  [withEntitlement, { key: "aps-environment", value: "development" }],
  [withColor, { name: "primaryColor", value: "#000000", dark: true }],
]);
```

<!-- ### `withAndroidManifest` 🤖

Modify the AndroidManifest.xml file.

```javascript
withAndroidManifest(config, {
  category: "uses-permission",
  name: "android.permission.INTERNET",
});
``` -->
