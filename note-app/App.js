import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./screens/signInPage";
import SignUpPage from "./screens/signUpPage";
import HomePage from "./screens/homePage";
import CustomHeaderLeft from "./components/customHeaderLeft";
import CustomHeaderRight from "./components/customHeaderRight";
import AccountPage from "./screens/accountPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
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
              headerTitle: "",
              headerTitleAlign: "center",
              headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
              headerRight: () => <CustomHeaderRight navigation={navigation} />,
            })}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerStyle: { backgroundColor: "#1A51BB" },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
            backgroundColor: "#252525",
            color: "#fff",
          }}
        >
          <Stack.Screen name="Account" component={AccountPage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
