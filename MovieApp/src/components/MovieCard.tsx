import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MovieCardProps } from "../interfaces/Movie";

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";
  return (
    <TouchableOpacity
      onPress={() => onSelect(movie.id)}
      style={[
        {
          width: "100%",
          padding: 10,
          flexDirection: "row",
          borderRadius: 20,
          borderWidth: 1,
          alignItems: "center",
          borderColor: "gray",
          gap: 20,
        },
        isTile && {
          width: "48%",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 8,
        },
      ]}
    >
      <View
        style={{
          width: isTile ? "100%" : 80,
          height: isTile ? 220 : 120,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: movie.poster }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
            borderRadius: 20,
          }}
        />
        {isTile && (
          <Text
            style={{ position: "absolute", top: 10, right: 10, color: "white" }}
          >
            ⭐{movie.rating.toFixed(1)}
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={{ fontSize: 16 }}>Thể loại: {movie.genre}</Text>
        <Text style={{ fontSize: 16 }}>Năm: {movie.year}</Text>
        {!isTile && (
          <Text style={{ fontSize: 16 }}>
            Đánh giá: ⭐{movie.rating.toFixed(1)}
          </Text>
        )}
        <Text style={{ fontSize: 16 }}>
          {movie.isShowing ? "Đang chiếu ✅" : "Ngừng chiếu ❌"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({});
