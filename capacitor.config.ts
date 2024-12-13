import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'NuevaRegistraApp',
  webDir: 'www',
  android: {
    allowMixedContent: true
  },
  plugins: {
    BarcodeScanner: {
      enableVibration: true,
      enableTorch: true
    }
  }
};

export default config;
