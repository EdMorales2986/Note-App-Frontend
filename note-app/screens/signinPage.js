import react, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { signinStyles } from "../styles/globalStyles";
import { Formik } from "formik";
import axios from "axios";

export default function SignInPage({ navigation }) {
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
      const http = await axios.post("http://192.168.0.182:4000/signin", {
        alias: e.alias,
        password: e.password,
      });
      // console.log(http.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const goToSignUp = () => {
    navigation.navigate("Sign Up");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={signinStyles.container}>
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
                style={signinStyles.inputs}
                name="alias"
                placeholder="User Name"
                placeholderTextColor={"#092C70"}
                onChangeText={handleChange("alias")}
                onBlur={handleBlur("alias")}
                value={values.alias}
              />
              <View style={signinStyles.passwordBox}>
                <TextInput
                  style={signinStyles.inputs}
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
                    style={signinStyles.icon}
                    name="eyeo"
                    size={24}
                    color="black"
                  />
                </Pressable>
              </View>
              <View>
                <Pressable
                  style={signinStyles.btnWrapper}
                  onPress={handleSubmit}
                >
                  <Text style={signinStyles.btnText}>Sign In</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
        <Pressable style={{ marginTop: 10 }} onPress={goToSignUp}>
          <Text> Don't have an account </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
