import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { signinStyles } from "../styles/globalStyles";
import { Formik } from "formik";
import axios from "axios";
import {
  storeData,
  getDataJWT,
  removeData,
  storeUser,
  removeUser,
} from "../components/storage";

export default function SignInPage({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function verifyJWT() {
    const jwt = await getDataJWT();
    // console.log(jwt);
    try {
      const http = await axios.post(
        `https://note-app-backend.up.railway.app/jwt-verify`,
        // "http:////192.168.0.185:4000/jwt-verify",
        {
          token: `${jwt}`,
        }
      );
      if (http.data.state) {
        // console.log("Logged in");
        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
      }
    } catch (error) {
      await removeData();
      await removeUser();
      setIsLoading(false);
      console.log("Not Logged in");
    }
  }

  useEffect(() => {
    verifyJWT();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitData = async (e) => {
    try {
      const http = await axios.post(
        // "https://note-app-backend.up.railway.app/signin",
        "http://192.168.0.185:4000/signin",
        {
          alias: e.alias,
          password: e.password,
        }
      );
      if (http) {
        // console.log(http.data.jwt);
        storeData(`${http.data.jwt}`);
        storeUser(`${e.alias}`);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToSignUp = () => {
    navigation.navigate("Sign Up");
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#1A51BB" />
      </View>
    );
  }
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
    <View style={signinStyles.container}>
      <Image
        source={require("../assets/custom/notes.png")}
        style={{ width: 200, height: 200, resizeMode: "center" }}
      />
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
              autoCapitalize="none"
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
                autoCapitalize="none"
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
              <Pressable style={signinStyles.btnWrapper} onPress={handleSubmit}>
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
    // </TouchableWithoutFeedback>
  );
}
