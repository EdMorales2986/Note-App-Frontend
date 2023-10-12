import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value) => {
  try {
    // console.log(value);
    await AsyncStorage.setItem("key", value);
  } catch (e) {
    console.error(e);
  }
};
export const storeUser = async (value) => {
  try {
    // console.log(value);
    await AsyncStorage.setItem("alias", value);
  } catch (e) {
    console.error(e);
  }
};

export const getDataJWT = async () => {
  try {
    const value = await AsyncStorage.getItem("key");
    // return await AsyncStorage.getAllKeys();
    if (value !== null) {
      //   console.log("jwt: " + value);
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};
export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem("alias");
    // return await AsyncStorage.getAllKeys();
    if (value !== null) {
      //   console.log("jwt: " + value);
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem("key");
  } catch (e) {
    console.error(e);
  }
};
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("alias");
  } catch (e) {
    console.error(e);
  }
};
