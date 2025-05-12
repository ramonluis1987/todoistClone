export default {
  expo: {
    name: "todoistClone",
    slug: "todoistClone",
    version: "1.0.0",
    scheme: "todoistclone",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    orientation: "portrait",
    extra: {
      eas: {
        projectId: "6d60a167-bbb4-4a96-bbfa-0ef53d1c0f57",
      },
    },
    android: {
      package: "com.todoistclone.app",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "todoistclone",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.todoistclone.app",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "react-native-bottom-tabs",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
