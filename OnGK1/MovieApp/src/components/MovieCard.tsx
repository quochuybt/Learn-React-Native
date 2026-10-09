import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MovieCardProps } from "../interfaces/Movie";

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          gap: 10,
          width: "100%",
          marginVertical: 20,
        },
        isTile && { width: "48%", flexDirection: "column" },
      ]}
      onPress={() => onSelect(movie.id)}
    >
      <View
        style={{
          height: !isTile ? 100 : 200,
          width: !isTile ? 70 : 130,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: movie.poster }}
          style={{
            height: !isTile ? "100%" : "auto",
            width: "100%",
            aspectRatio: isTile ? 2 / 3 : undefined,
            resizeMode: "contain",
            borderRadius: 10,
          }}
        />
        {isTile && (
          <Text style={styles.ratingAb}>⭐{movie.rating.toFixed(1)}</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1}>{movie.title}</Text>
        {!isTile && <Text>{movie.genre}</Text>}
        {!isTile && <Text>{movie.year}</Text>}
        {!isTile && <Text>⭐{movie.rating.toFixed(1)}</Text>}
        <Text>{movie.isShowing ? "Đang chiếu✅" : "Ngừng chiếu❌"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  ratingAb: {
    position: "absolute",
    top: 10,
    right: 15,
    color: "white",
  },
});
