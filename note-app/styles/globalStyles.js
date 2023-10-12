import { StyleSheet } from "react-native";

export const signinStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 200,
    // backgroundColor: "grey",
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#A6C4FD",
    backgroundColor: "#A6C4FD",
    color: "#092C70",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
    width: "auto",
    height: "auto",
    zIndex: 1,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    width: 100,
    marginTop: 30,
    backgroundColor: "#1A51BB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  btnText: { color: "#fff", padding: 10 },
});

export const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    // backgroundColor: "grey",
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#A6C4FD",
    backgroundColor: "#A6C4FD",
    color: "#092C70",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 50,
  },
  icon: {
    position: "absolute",
    width: "auto",
    height: "auto",
    zIndex: 1,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnWrapper: {
    width: 100,
    marginTop: 30,
    backgroundColor: "#1A51BB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  btnText: { color: "#fff", padding: 10 },
});
