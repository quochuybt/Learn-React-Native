import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

const DetailScreen = ({ route, navigation }: any) => {
  const item = route?.params?.item || {
    image: require("../../assets/red.png"),
    title: "Pina Mountain",
    price: 449,
    discountPrice: 350,
    discountPercent: 15,
    description:
      "It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.",
  };

  const [isLiked, setIsLiked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.discountText}>
          {item.discountPercent || 15}% OFF {item.discountPrice || 350}$
        </Text>
        <Text style={styles.originalPrice}>{item.price}$</Text>
      </View>
      <Text style={styles.sectionHeader}>Description</Text>
      <Text style={styles.descriptionText}>
        {item.description ||
          "It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc."}
      </Text>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => setIsLiked(!isLiked)}
        >
          <AntDesign
            name="heart"
            size={30}
            color={isLiked ? "#E94141" : "#222222"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.85}>
          <Text style={styles.addButtonText}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    backgroundColor: "#FDEEEF",
    borderRadius: 16,
    height: 330,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    gap: 30,
  },
  discountText: {
    fontSize: 18,
    color: "gray",
    fontWeight: "500",
  },
  originalPrice: {
    fontSize: 20,
    fontWeight: "700",
    textDecorationLine: "line-through",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },
  descriptionText: {
    fontSize: 15,
    color: "gray",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 20,
  },
  heartButton: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#E94141",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
