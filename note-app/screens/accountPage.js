import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { accountStyles } from "../styles/globalStyles";
import { getUser, removeUser, removeData } from "../components/storage";
import axios from "axios";

export default function AccountPage({ navigation }) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");

  const submitData = async (e) => {
    const user = await getUser();
    // console.log(user);
    try {
      await axios.post(
        `https://note-app-backend.up.railway.app/signin/${user}/update`,
        // `http://192.168.0.185:4000/signin/${user}/update`,
        {
          email: e.email,
          name: e.name,
          lname: e.lname,
          oldPass: e.oldPass,
          newPass: e.newPass,
        }
      );
      await removeData();
      await removeUser();
      navigation.navigate("Sign In");
    } catch (error) {
      console.log(error);
    }
  };

  const submitDeletion = async (e) => {
    const user = await getUser();
    try {
      await axios.post(
        `https://note-app-backend.up.railway.app/signin/${user}/delete`,
        // `http://192.168.0.185:4000/signin/${user}/delete`,
        {
          password: e.password,
        }
      );
      await removeData();
      await removeUser();
      navigation.navigate("Sign In");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={accountStyles.container}>
      <Image
        style={{
          resizeMode: "center",
          width: 300,
          height: 100,
          marginTop: 30,
        }}
        source={require("../assets/custom/notes.png")}
      />
      <View style={accountStyles.F1}>
        <Formik
          initialValues={{
            email: "",
            name: "",
            lname: "",
            oldPass: "",
            newPass: "",
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
                style={accountStyles.inputs}
                name="email"
                placeholder="Email"
                placeholderTextColor={"#092C70"}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
              />
              <TextInput
                style={accountStyles.inputs}
                name="name"
                placeholder="Name"
                placeholderTextColor={"#092C70"}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoCapitalize="none"
              />
              <TextInput
                style={accountStyles.inputs}
                name="lname"
                placeholder="Last name"
                placeholderTextColor={"#092C70"}
                onChangeText={handleChange("lname")}
                onBlur={handleBlur("lname")}
                value={values.lname}
                autoCapitalize="none"
              />
              <TextInput
                style={accountStyles.inputs}
                name="oldPass"
                placeholder="User Old Password"
                placeholderTextColor={"#092C70"}
                maxLength={30}
                onChangeText={handleChange("oldPass")}
                onBlur={handleBlur("oldPass")}
                value={values.oldPass}
                autoCapitalize="none"
              />
              <TextInput
                style={accountStyles.inputs}
                name="newPass"
                placeholder="User New Password"
                placeholderTextColor={"#092C70"}
                maxLength={30}
                onChangeText={handleChange("newPass")}
                onBlur={handleBlur("newPass")}
                value={values.newPass}
                autoCapitalize="none"
              />
              <View>
                <Pressable
                  style={accountStyles.btnWrapper}
                  onPress={handleSubmit}
                >
                  <Text style={accountStyles.btnText}>Update</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>

      <View style={accountStyles.F2}>
        <Formik
          initialValues={{
            password: "",
          }}
          onSubmit={(e) => submitDeletion(e)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                style={accountStyles.inputsDelete}
                name="password"
                placeholder="User Current Password"
                placeholderTextColor={"#092C70"}
                maxLength={30}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoCapitalize="none"
              />
              <View>
                <Pressable
                  style={accountStyles.btnWrapperDelete}
                  onPress={handleSubmit}
                >
                  <Text style={accountStyles.btnTextDelete}>
                    Delete Account
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}
