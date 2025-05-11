import { Colors } from "@/constants/Colors";
import { useSSO } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import LottieView from "lottie-react-native";
import { useCallback, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const { startSSOFlow } = useSSO();
  const { top } = useSafeAreaInsets();

  console.log(AuthSession.makeRedirectUri());

  const animation = useRef<LottieView>(null);

  const openLink = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const onGoogleAuth = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      console.log("createdSessionId", createdSessionId);

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startSSOFlow]);

  // const { user } = useUser();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/* <Button title="Sign In" onPress={onPress} />
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Button title="Sign in" onPress={onPress} />
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut> */}
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        style={styles.loginImage}
      />
      {/* <Image
        source={require("@/assets/images/login.png")}
        style={styles.bannerImage}
      /> */}

      <View>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 250,
            height: 250,
            alignSelf: "center",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("@/assets/lotties/home.json")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log("Sign in with apple");
          }}
          style={styles.button}
        >
          <Ionicons name="logo-apple" size={24} color="black" />
          <Text style={styles.buttonText}>Conectar con apple</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onGoogleAuth} style={styles.button}>
          <Ionicons name="logo-google" size={24} color="black" />
          <Text style={styles.buttonText}>Conectar con google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("Sign in with email");
          }}
          style={styles.button}
        >
          <Ionicons name="mail" size={24} color="black" />
          <Text style={styles.buttonText}>Conectar con el correo</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          <Text>
            Al continuar, aceptas los{" "}
            <Text
              style={styles.link}
              onPress={() => openLink("https://google.com")}
            >
              términos y condiciones.
            </Text>{" "}
            y las <Text style={styles.link}>políticas de privacidad</Text>{" "}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  bannerImage: {
    height: 280,
    resizeMode: "contain",
    alignSelf: "center",
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 10,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightBorder,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
