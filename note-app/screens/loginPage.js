import react, { useState } from "react";
import {
  loginStyleSheet,
  Image,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { loginStyles } from "../styles/globalStyles";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={loginStyles.container}>
        <Text
          style={{
            paddingBottom: 200,
            paddingTop: 150,
            fontSize: 24,
            color: "#092C70",
          }}
        >
          Notes
        </Text>
        <Text
          style={{
            marginBottom: 50,
            fontSize: 28,
            fontWeight: "bold",
            color: "#092C70",
          }}
        >
          Bienvenido!
        </Text>
        <TextInput
          style={loginStyles.inputA}
          placeholder="User Name"
          placeholderTextColor={"#092C70"}
          value={user}
          onChangeText={(e) => setUser(e)}
        />
        <View style={loginStyles.passwordBox}>
          <TextInput
            style={loginStyles.inputB}
            secureTextEntry={!showPassword}
            placeholder="User Password"
            placeholderTextColor={"#092C70"}
            value={password}
            maxLength={30}
            onChangeText={(e) => setPassword(e)}
          />
          <Pressable
            style={{
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              right: 30,
              zIndex: 2,
            }}
            onPress={toggleShowPassword}
          >
            <AntDesign
              style={loginStyles.icon}
              name="eyeo"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
        <View>
          <Pressable style={loginStyles.btnWrapper}>
            <Text style={loginStyles.btnText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
