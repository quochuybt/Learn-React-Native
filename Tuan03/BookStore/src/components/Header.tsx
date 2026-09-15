import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
      </View>
      <View style={styles.rightContainer}>
        <Pressable onPress={() => console.log("search")}>
          <FontAwesome name="search" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => console.log("cart")}>
          <FontAwesome name="shopping-cart" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "indigo",
    paddingHorizontal: 16,
    height: 56,
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightContainer: {
    flexDirection: "row",
    gap: 20,
  },
  logo: {
    height: 50,
    width: 100,
  },
});
