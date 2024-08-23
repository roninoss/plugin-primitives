# Plugin Pro

## What is it?

An open source collection of common plugin actions. Fully typed.

## How it works

<img src="./assets/docs.png" width="100%">

## API

### `withAppVisibility` 🍎 🤖

Allows your app to interact with other apps on the device, including to check the existence of an app without explicit permissions.

```javascript
withAppVisibility(config, {
  scheme: "instagram",
  platforms: ["ios", "android"],
});
```

### `withPermissions` 🍎 🤖

Adds a permission to your app, allowing it to access a specific feature on the device.

```javascript
withPermissions(config, {
  type: "health",
  reason: "We need access to your health data.",
  platforms: ["ios", "android"],
});
```

### `withEntitlements` 🍎

Adds an entitlment to your app, allowing it to access a feature on the device.

```javascript
withEntitlements(config, { key: "com.apple.developer.healthkit.access" });
```

### `withInfoPlist` 🍎

Adds a key/value pair to the Info.plist file.

```javascript
withInfoPlist(config, {
  key: "NSHealthShareUsageDescription",
  value: "We need access to your health data.",
});
```

### `withPodfile` 🍎

Apply modifications to the Podfile.

```javascript
withPodfile(config, {
  action: "append",
  content: "pod 'HealthKit', '~> 1.0'",
  to: "target 'MyApp' do",
});
```
