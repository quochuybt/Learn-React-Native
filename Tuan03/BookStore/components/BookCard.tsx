import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const BookCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          source={require("../assets/biasach.jpg")}
          style={styles.biasach}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text numberOfLines={2}>Săn cá thần</Text>
          <Text>Đặng Thiều Quang</Text>
        </View>
        <Text>200.000 đ</Text>
      </View>
    </View>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  biasach: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 10,
    overflow: "hidden",
  },
});
