import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>
          A premium online store for{"\n"}sporter and their stylish choice
        </Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image source={require("../../assets/blue.png")} style={styles.image} />
      </View>
      <View style={styles.shopNameContainer}>
        <Text style={styles.shopTitle}>POWER BIKE{"\n"}SHOP</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Store")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 25,
  },
  headerTextContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 28,
  },
  imageWrapper: {
    marginTop: 30,
    backgroundColor: "#F9E7E7",
    borderRadius: 45,
    height: 360,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  shopNameContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  shopTitle: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#E94141",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
