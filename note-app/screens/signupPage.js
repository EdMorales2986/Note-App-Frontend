import react, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { signupStyles } from "../styles/globalStyles";
import { Formik } from "formik";
import axios from "axios";

export default function SignUpPage({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitData = async (e) => {
    try {
      const http = await axios.post(
        // "https://note-app-backend.up.railway.app/signup",
        "http://192.168.0.185:4000/signup",
        {
          alias: e.alias,
          email: e.email,
          name: e.name,
          lname: e.lname,
          password: e.password,
        }
      );
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={signupStyles.container}>
      <Image
        source={require("../assets/custom/notes.png")}
        style={{ width: 200, height: 200, resizeMode: "center" }}
      />
      <Formik
        initialValues={{
          alias: "",
          email: "",
          name: "",
          lname: "",
          password: "",
        }}
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
              style={signupStyles.inputs}
              name="alias"
              placeholder="User Name"
              placeholderTextColor={"#092C70"}
              onChangeText={handleChange("alias")}
              onBlur={handleBlur("alias")}
              value={values.alias}
              autoCapitalize="none"
            />
            <TextInput
              style={signupStyles.inputs}
              name="email"
              placeholder="Email"
              placeholderTextColor={"#092C70"}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
            />
            <TextInput
              style={signupStyles.inputs}
              name="name"
              placeholder="Name"
              placeholderTextColor={"#092C70"}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              autoCapitalize="none"
            />
            <TextInput
              style={signupStyles.inputs}
              name="lname"
              placeholder="Last name"
              placeholderTextColor={"#092C70"}
              onChangeText={handleChange("lname")}
              onBlur={handleBlur("lname")}
              value={values.lname}
              autoCapitalize="none"
            />
            <View style={signupStyles.passwordBox}>
              <TextInput
                style={signupStyles.inputs}
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
                  style={signupStyles.icon}
                  name="eyeo"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
            <View>
              <Pressable style={signupStyles.btnWrapper} onPress={handleSubmit}>
                <Text style={signupStyles.btnText}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
