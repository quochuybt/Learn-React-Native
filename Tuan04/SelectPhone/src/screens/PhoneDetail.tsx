import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const images: any = {
  blue: require("../../assets/blue.png"),
  red: require("../../assets/red.png"),
  den: require("../../assets/den.png"),
  silver: require("../../assets/silver.png"),
};

const PhoneDetail = ({ route, navigation }: any) => {
  const selectedColor = route.params?.selectedColor || "blue";
  return (
    <View style={styles.container}>
      <Image source={images[selectedColor]} style={styles.image} />
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
      <Pressable
        style={styles.buttonColor}
        onPress={() => navigation.navigate("SelectColor")}
      >
        <Text style={styles.buttonColorTitle}>4 MÀU - CHỌN MÀU</Text>
        <MaterialIcons
          name="navigate-next"
          size={24}
          color="black"
          style={styles.icon}
        />
      </Pressable>
      <Pressable style={styles.buttonContainer}>
        <Text style={styles.buttonTitle}>CHỌN MUA</Text>
      </Pressable>
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
  buttonColor: {
    marginTop: 12,
    flexDirection: "row",
    width: "100%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  buttonColorTitle: {
    fontSize: 16,
    fontWeight: "400",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  buttonContainer: {
    marginTop: 32,
    width: "100%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonTitle: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});
