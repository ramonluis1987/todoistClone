export default ({ config }) => {
  const isCI = process.env.EAS_BUILD_PLATFORM !== undefined;

  return {
    ...config,
    name: "todoistClone",
    slug: "todoistClone",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "todoistclone",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      eas: {
        projectId: "6d60a167-bbb4-4a96-bbfa-0ef53d1c0f57"
      }
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.todoistclone.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.todoistclone.app",
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "todoistclone"
            }
          ],
          category: ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "react-native-bottom-tabs",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static"
          }
        }
      ],
      // Solo incluye expo-dev-launcher en desarrollo local
      ...(isCI
        ? []
        : [
          [
            "expo-dev-launcher",
            {
              launchMode: "most-recent"
            }
          ]
        ])
    ],
    experiments: {
      typedRoutes: true
    }
  };
};
