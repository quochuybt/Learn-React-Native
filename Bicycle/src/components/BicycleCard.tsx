import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Bicycle } from "../interfaces/Bicycle";
import AntDesign from "@expo/vector-icons/AntDesign";

const BicycleCard = ({ image, title, price }: Bicycle) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => setIsLiked(!isLiked)}
      >
        <AntDesign
          name="heart"
          size={20}
          color={isLiked ? "#E95555" : "#8A8A8A"}
        />
      </TouchableOpacity>

      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.currency}>$</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

export default BicycleCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ecddce",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
    position: "relative",
  },

  image: {
    width: 135,
    height: 120,
    resizeMode: "contain",
    marginVertical: 10,
  },

  heartButton: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#595959",
    marginTop: 4,
  },

  price: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
  },

  currency: {
    color: "#F1863C",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 4,
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
});
