import React from "react";
import { store, persistor } from "./src/app/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./src/pages/signin";
import Home from "./src/pages/home";

const Stack = createNativeStackNavigator();

function App() {
  const { access_token } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {access_token === null ? (
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Sign in",
              animationTypeForReplace: access_token === null ? "pop" : "push",
            }}
          />
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
