import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const DetailScreen = ({ navigation, route }: any) => {
  const movie = route?.params?.movie;
  return (
    <SafeAreaView style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: 300, height: 400 }}>
        <Image
          source={{ uri: movie.poster }}
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>{movie.title}</Text>
        <Text style={styles.text}>{movie.genre}</Text>
        <Text style={styles.text}>{movie.year}</Text>
        <Text style={styles.text}>{movie.genre}</Text>
        <Text style={styles.text}>
          {movie.isShowing ? "Đang chiếu✅" : "Ngừng chiếu❌"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "400",
  },
});
