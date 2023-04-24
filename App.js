import "react-native-gesture-handler";
import React from "react";
import { store, persistor } from "./src/app/store";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./src/pages/signin";
import Home from "./src/pages/home";

import { StyleSheet, Button, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput, TouchableOpacity } from "react-native";
import Member from "./src/pages/member/createMember";
import Chit from "./src/pages/chit/createChit";

function HomeScreen() {
  const SignIn = () => {
    fetch("");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput style={{ borderWidth: 1 }} type="name" placeholder="name" />
      <br />
      <TextInput
        style={{ borderWidth: 1 }}
        type="number"
        placeholder="mobile"
      />
      <View>
        <TouchableOpacity>
          <Text style={{ backgroundColor: "primary" }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const TabNav = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="Home" useLegacyImplementation>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="TabScreen" component={TabNav} />
      <Drawer.Screen name="Member" component={Member} />
      <Drawer.Screen name="Chit" component={Chit} />
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  const { access_token } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          <Stack.Screen name="HomTabe" component={DrawerNav} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
