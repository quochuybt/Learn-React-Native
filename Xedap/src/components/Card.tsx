import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Bicycle } from "../interfaces/Bicycle";
import { AntDesign } from "@expo/vector-icons";
import { images } from "../constants/images";

const Card = ({ image, title, price }: Bicycle) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View
      style={{
        backgroundColor: "#F7BA8326",
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
        position: "relative",
      }}
    >
      <View
        style={{
          width: 135,
          height: 120,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={images[image]}
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={{ textAlign: "center", fontSize: 20, color: "#00000099" }}>
          {title}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: "#F7BA83", fontSize: 20 }}>$</Text>
        <Text style={{ fontSize: 20 }}>{price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setIsLiked(!isLiked)}
        style={{ position: "absolute", top: 10, left: 15 }}
      >
        <AntDesign
          name="heart"
          size={20}
          color={isLiked ? "#E95555" : "#8A8A8A"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
