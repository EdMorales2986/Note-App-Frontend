import { StyleSheet, Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { removeData, removeUser } from "./components/storage";

import SignInPage from "./screens/signInPage";
import SignUpPage from "./screens/signUpPage";
import HomePage from "./screens/homePage";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [loggedIn, setState] = useState(false);

  function terminate() {
    removeData();
    removeUser();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#1A51BB" },
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="Sign In" component={SignInPage} />
        <Stack.Screen name="Sign Up" component={SignUpPage} />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerTitleAlign: "center",
            headerLeft: () => (
              <Pressable
                onPress={() => {
                  terminate();
                  navigation.goBack();
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  LogOut
                </Text>
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
