import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 5, marginVertical: 25 }}>
      <View style={{ marginVertical: 25 }}>
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "500" }}>
          A premium online store for{"\n"}sporter and their stylish choice
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#E941411A",
          justifyContent: "center",
          alignItems: "center",
          height: 360,
          borderRadius: 50,
          paddingTop: 50,
          paddingBottom: 20,
        }}
      >
        <Image
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          source={require("../../assets/blue.png")}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ textAlign: "center", fontSize: 27, fontWeight: "700" }}>
          POWER BIKE{"\n"}SHOP
        </Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#E94141",
          paddingVertical: 15,
          borderRadius: 30,
          marginTop: 50,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontSize: 24 }}
          onPress={() => navigation.navigate("Store")}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
