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
  Button,
} from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";

import { loginStyles } from "../styles/globalStyles";
import { Formik } from "formik";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitData = async (e) => {
    // console.log(e.alias, e.password);
    try {
      // MAFER, para que axios funcione el segmento de la Ip lo tienes que sustituir
      // con el que te tira Metro despues de correr 'npx expo start' o 'npm run start'
      const http = await axios.post("http://192.168.222.211:4000/signin", {
        alias: e.alias,
        password: e.password,
      });
      console.log(http.data);
    } catch (error) {
      console.log(error);
    }
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
        <Formik
          initialValues={{ alias: "", password: "" }}
          onSubmit={(e) => submitData(e)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={loginStyles.inputA}
                name="alias"
                placeholder="User Name"
                placeholderTextColor={"#092C70"}
                onChangeText={handleChange("alias")}
                onBlur={handleBlur("alias")}
                value={values.alias}
              />
              <View style={loginStyles.passwordBox}>
                <TextInput
                  style={loginStyles.inputB}
                  name="password"
                  secureTextEntry={!showPassword}
                  placeholder="User Password"
                  placeholderTextColor={"#092C70"}
                  maxLength={30}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
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
                <Pressable
                  style={loginStyles.btnWrapper}
                  onPress={handleSubmit}
                >
                  <Text style={loginStyles.btnText}>Login</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
