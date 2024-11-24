# Plugin Primitives

## What is it?

A collection of type-safe config plugin primitives that handle common native configuration tasks.

## API

### `withColor` 🤖

Adds, modifies, or removes a color value from the `colors.xml` file. Supports both normal and night modes.

```javascript
withColor(config, {
  name: "primaryColor",
  value: "#000000",
  night: true,
});
```

### `withString` 🤖

Adds, modifies, or removes a string value from the `strings.xml` file.

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

Modifies the `project.pbxproj` file by overwritting it with an updated version. The plugin will use the `project.pbxproj` file found in the `parallelDir` directory, which defaults to `plugins` and overwitten. This ensures that the iOS project is always in a consistent state.

```javascript
withPbxProject(config);
```

### `withModifyFile` 🤖 🍎

Modifies an arbitrary file by

1. Finding and replacing a string

```javascript
withModifyFile(config, {
  filePath: "ios/AppDelegate.m",
  find: "something",
  replace: "something else",
});
```

2. Inserting a string at a specific anchor and offset

```javascript
withModifyFile(config, {
  filePath: "ios/myapp/AppDelegate.mmm",
  newSrc: "hello",
  anchor: "something",
  offset: 0,
});
```

This is primaririly used to modify unstructured files that don't have a specific format. For structured files, use more specific plugins like `withInfo`, `withColor`, etc.

### `withSourceFile` 🤖 🍎

Adds a source file to the project. Accepts an optional `contents` parameter to specify the contents of the file. If not provided, the contents will be read from the file at `plugins/<filePath>`. Also accepts an optional `parallelDir` parameter (which defaults to `plugins`) to specify a directory (relative to the project root) to place the file in. The parallel directory mirrors the `ios` directory structure.

```javascript
withSourceFile(config, {
  filePath: "ios/myapp/NewFile.swift",
});
```

Example file structure:

```
ios/
├── myapp/
│   ├── NewFile.swift
|   └── ...
plugins/
├── ios/
│   └── myapp/
│       └── NewFile.swift
└── ...
```

### `withResourceFile` 🤖 🍎

Add a resource file to the project. Accepts an optional `parallelDir` parameter (which defaults to `plugins`) to specify a directory (relative to the project root) to place the file in. The parallel directory mirrors the `ios` directory structure.

```javascript
withResourceFile(config, {
  filePath: "android/src/main/res/values/strings2.xml",
});
```

Example file structure:

```
android/
├── src/
|   ├── ...
│   └── main/
│       └── res/
│           └── values/
│               └── strings2.xml
|
plugins/
├── android/
│   └── src/
│       └── main/
│           └── res/
│               └── values/
│                   └── strings2.xml
└── ...
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
  withPbxProject,
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
