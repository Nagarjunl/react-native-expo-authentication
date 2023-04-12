import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen() {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
}

function SignInScreen() {
  const [mobilenumber, setMobilenumber] = React.useState("9790056175");
  const [otp, setOtp] = React.useState("590852");

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="mobilenumber"
        value={mobilenumber}
        onChangeText={setMobilenumber}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        placeholder="otp"
        value={otp}
        onChangeText={setOtp}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button title="Sign in" onPress={() => signIn({ mobilenumber, otp })} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          SecureStore.deleteItemAsync("userToken");
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  console.log(state.userToken);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        fetch("http://192.168.1.4:3005/authentication/validate-otp", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile_number: Number(data.mobilenumber),
            otp_number: Number(data.otp),
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            SecureStore.setItemAsync("userToken", json.access_token);
            dispatch({ type: "SIGN_IN", token: "Bearer " + json.access_token });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: "Sign in",
                animationTypeForReplace: state.isSignout ? "pop" : "push",
              }}
            />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
