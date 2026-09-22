import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
const PhoneDetail = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/blue.png")} style={styles.image} />
      <Text style={styles.title}>
        Điện thoại Vsmart Joy 3 - Hàng chính hãng
      </Text>
      <View style={styles.review}>
        <View style={styles.star}>
          <AntDesign name="star" size={24} color="yellow" />
          <AntDesign name="star" size={24} color="yellow" />
          <AntDesign name="star" size={24} color="yellow" />
          <AntDesign name="star" size={24} color="yellow" />
          <AntDesign name="star" size={24} color="yellow" />
        </View>
        <Text style={styles.title}>(Xem 828 đánh giá)</Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.newPrice}>1.790.000 đ</Text>
        <Text style={styles.oldPrice}>1.790.000 đ</Text>
      </View>
      <View style={styles.question}>
        <Text style={styles.textRed}>Ở đâu rẻ hơn hoàn tiền</Text>
        <AntDesign name="question-circle" size={24} color="black" />
      </View>
    </View>
  );
};

export default PhoneDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 4,
  },
  title: {
    fontWeight: "400",
    fontSize: 18,
  },
  star: {
    flexDirection: "row",
    gap: 4,
  },
  review: {
    marginVertical: 10,
    flexDirection: "row",
    gap: 40,
    alignItems: "center",
  },
  price: {
    flexDirection: "row",
    gap: 40,
    alignItems: "center",
    marginBottom: 10,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    fontWeight: "bold",
    fontSize: 20,
    color: "gray",
  },
  newPrice: {
    fontWeight: "bold",
    fontSize: 24,
  },
  textRed: {
    color: "red",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: 16,
  },
  question: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
