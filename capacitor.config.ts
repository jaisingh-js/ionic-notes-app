import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic notes app',
  webDir: 'docs',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 100,
            launchAutoHide: true,
            androidScaleType: "CENTER_CROP",
            splashImmersive: true,
            backgroundColor: "#ffffff"
    }
  }
};

export default config;
