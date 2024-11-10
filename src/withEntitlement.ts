import { ConfigPlugin, withEntitlementsPlist } from "expo/config-plugins";

type WithEntitlementParams =
  | { key: "com.apple.developer.marketplace.app-installation"; value: boolean }
  | {
      key: "com.apple.developer.parent-application-identifiers";
      value: string[];
    }
  | {
      key: "com.apple.developer.associated-appclip-app-identifiers";
      value: string[];
    }
  | { key: "com.apple.developer.on-demand-install-capable"; value: boolean }
  | {
      key: "com.apple.developer.authentication-services.autofill-credential-provider";
      value: boolean;
    }
  | { key: "com.apple.developer.applesignin"; value: boolean }
  | { key: "com.apple.developer.carplay-audio"; value: boolean }
  | { key: "com.apple.developer.carplay-charging"; value: boolean }
  | { key: "com.apple.developer.carplay-communication"; value: boolean }
  | { key: "com.apple.developer.carplay-maps"; value: boolean }
  | { key: "com.apple.developer.carplay-parking"; value: boolean }
  | { key: "com.apple.developer.carplay-quick-ordering"; value: boolean }
  | { key: "com.apple.developer.carplay-messaging"; value: boolean }
  | { key: "com.apple.developer.contacts.notes"; value: boolean }
  | {
      key: "com.apple.developer.automated-device-enrollment.add-devices";
      value: boolean;
    }
  | { key: "com.apple.developer.ClassKit-environment"; value: string }
  | {
      key: "com.apple.developer.automatic-assessment-configuration";
      value: boolean;
    }
  | { key: "com.apple.developer.mail-client"; value: boolean }
  | { key: "com.apple.developer.coreml.neural-engine-access"; value: boolean }
  | { key: "com.apple.developer.app-compute-category"; value: boolean }
  | {
      key: "com.apple.developer.screen-capture.include-passthrough";
      value: boolean;
    }
  | {
      key: "com.apple.developer.arkit.main-camera-access.allow";
      value: boolean;
    }
  | {
      key: "com.apple.developer.arkit.object-tracking-parameter-adjustment.allow";
      value: boolean;
    }
  | { key: "com.apple.developer.arkit.barcode-detection.allow"; value: boolean }
  | { key: "com.apple.developer.exposure-notification"; value: boolean }
  | { key: "com.apple.developer.family-controls"; value: boolean }
  | { key: "com.apple.developer.fileprovider.testing-mode"; value: boolean }
  | { key: "com.apple.developer.game-center"; value: boolean }
  | { key: "com.apple.developer.group-session"; value: boolean }
  | { key: "com.apple.developer.healthkit"; value: boolean }
  | { key: "com.apple.developer.healthkit.access"; value: string[] }
  | { key: "com.apple.developer.healthkit.background-delivery"; value: boolean }
  | {
      key: "com.apple.developer.healthkit.recalibrate-estimates";
      value: boolean;
    }
  | { key: "com.apple.developer.homekit"; value: boolean }
  | { key: "com.apple.developer.matter.allow-setup-payload"; value: boolean }
  | { key: "com.apple.security.hypervisor"; value: boolean }
  | { key: "com.apple.vm.hypervisor"; value: boolean }
  | { key: "com.apple.vm.device-access"; value: boolean }
  | { key: "com.apple.vm.networking"; value: boolean }
  | { key: "com.apple.security.virtualization"; value: boolean }
  | {
      key: "com.apple.developer.icloud-container-development-container-identifiers";
      value: string[];
    }
  | { key: "com.apple.developer.icloud-container-environment"; value: string }
  | { key: "com.apple.developer.icloud-container-identifiers"; value: string[] }
  | { key: "com.apple.developer.icloud-services"; value: string[] }
  | { key: "com.apple.developer.ubiquity-kvstore-identifier"; value: string }
  | { key: "com.apple.developer.journal.allow"; value: boolean }
  | { key: "com.apple.developer.location.push"; value: boolean }
  | {
      key: "com.apple.developer.managed-app-distribution.install-ui";
      value: boolean;
    }
  | {
      key: "com.apple.developer.media-device-discovery-extension";
      value: boolean;
    }
  | {
      key: "com.apple.developer.avfoundation.multitasking-camera-access";
      value: boolean;
    }
  | { key: "com.apple.developer.coremotion.head-pose"; value: boolean }
  | { key: "com.apple.developer.spatial-audio.profile-access"; value: boolean }
  | { key: "com.apple.developer.kernel.increased-memory-limit"; value: boolean }
  | {
      key: "com.apple.developer.kernel.extended-virtual-addressing";
      value: boolean;
    }
  | { key: "com.apple.developer.sustained-execution"; value: boolean }
  | { key: "com.apple.developer.upi-device-validation"; value: boolean }
  | { key: "com.apple.developer.networking.networkextension"; value: boolean }
  | { key: "com.apple.developer.networking.vpn.api"; value: boolean }
  | { key: "com.apple.developer.associated-domains"; value: string[] }
  | { key: "com.apple.developer.networking.multicast"; value: boolean }
  | {
      key: "com.apple.developer.networking.manage-thread-network-credentials";
      value: boolean;
    }
  | { key: "com.apple.developer.networking.slicing.appcategory"; value: string }
  | {
      key: "com.apple.developer.networking.slicing.trafficcategory";
      value: string;
    }
  | { key: "com.apple.developer.networking.vmnet"; value: boolean }
  | { key: "aps-environment"; value: string }
  | { key: "com.apple.developer.aps-environment"; value: string }
  | { key: "com.apple.developer.usernotifications.filtering"; value: boolean }
  | {
      key: "com.apple.developer.device-information.user-assigned-device-name";
      value: boolean;
    }
  | { key: "com.apple.developer.severe-vehicular-crash-event"; value: boolean }
  | { key: "com.apple.security.application-groups"; value: string[] }
  | { key: "keychain-access-groups"; value: string[] }
  | { key: "com.apple.developer.default-data-protection"; value: string }
  | {
      key: "com.apple.developer.devicecheck.appattest-environment";
      value: string;
    }
  | { key: "com.apple.security.smartcard"; value: boolean }
  | {
      key: "com.apple.developer.sensitivecontentanalysis.client";
      value: boolean;
    }
  | { key: "com.apple.developer.sensorkit.reader.allow"; value: boolean }
  | { key: "com.apple.developer.siri"; value: boolean }
  | {
      key: "com.apple.developer.storekit.external-link.account";
      value: boolean;
    }
  | { key: "com.apple.developer.storekit.external-purchase"; value: boolean }
  | {
      key: "com.apple.developer.storekit.external-purchase-link";
      value: boolean;
    }
  | { key: "com.apple.developer.user-management"; value: boolean }
  | {
      key: "com.apple.developer.video-subscriber-single-sign-on";
      value: boolean;
    }
  | { key: "com.apple.smoot.subscriptionservice"; value: boolean }
  | { key: "com.apple.developer.pass-type-identifiers"; value: string[] }
  | { key: "com.apple.developer.in-app-payments"; value: string[] }
  | { key: "com.apple.developer.in-app-identity-presentment"; value: boolean }
  | {
      key: "com.apple.developer.in-app-identity-presentment.merchant-identifiers";
      value: string[];
    }
  | { key: "com.apple.developer.weatherkit"; value: boolean }
  | { key: "com.apple.developer.web-browser"; value: boolean }
  | {
      key: "com.apple.developer.web-browser.public-key-credential";
      value: boolean;
    }
  | { key: "com.apple.developer.browser.app-installation"; value: boolean }
  | { key: "com.apple.developer.networking.wifi-info"; value: boolean }
  | {
      key: "com.apple.external-accessory.wireless-configuration";
      value: boolean;
    }
  | { key: "com.apple.developer.networking.multipath"; value: boolean }
  | {
      key: "com.apple.developer.networking.HotspotConfiguration";
      value: boolean;
    }
  | { key: "com.apple.developer.nfc.readersession.formats"; value: string[] }
  | { key: "com.apple.developer.nfc.hce"; value: boolean }
  | {
      key: "com.apple.developer.nfc.hce.iso7816.select-identifier-prefixes";
      value: string[];
    }
  | {
      key: "com.apple.developer.nfc.hce.default-contactless-app";
      value: string[];
    };

/**
 * 🤖 iOS Only
 *
 * A config plugin to add/remove/modify entitlements in <projectName>.entitlements
 *
 */
export const withEntitlement: ConfigPlugin<WithEntitlementParams> = (
  config,
  { key, value }
) => {
  config = withEntitlementsPlist(config, (config) => {
    config.modResults = {
      ...config.modResults,
      [key]: value,
    };
    return config;
  });

  return config;
};
