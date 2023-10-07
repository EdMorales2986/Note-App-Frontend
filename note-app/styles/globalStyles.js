import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "grey",
  },
  inputA: {
    borderWidth: 1,
    borderColor: "#A6C4FD",
    backgroundColor: "#A6C4FD",
    color: "#092C70",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 50,
  },
  inputB: {
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
    marginTop: 70,
    backgroundColor: "#1A51BB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  btnText: { color: "#fff", padding: 10 },
});
