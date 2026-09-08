import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const BookCard = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/biasach.jpg")} style={styles.biasach} />
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
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 8,
    padding: 12,
    borderRadius: 12,
  },
  biasach: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});
