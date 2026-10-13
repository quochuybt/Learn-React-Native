import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { TourItemProps } from "../interfaces/Tour";
import { formatDate, getSeatLabel } from "../utils/tour";

const TourItem = ({
  tour,
  compact,
  onPress,
  onToggleFavorite,
}: TourItemProps) => {
  const lowSeats = tour.seats <= 3;

  return (
    <View
      style={[styles.card, compact ? styles.compactCard : styles.normalCard]}
    >
      <TouchableOpacity
        style={[
          styles.mainContent,
          compact ? styles.compactMainContent : styles.normalMainContent,
        ]}
        onPress={() => onPress(tour)}
      >
        <View
          style={[
            styles.imageContainer,
            compact
              ? styles.compactImageContainer
              : styles.normalImageContainer,
          ]}
        >
          <Image
            source={{ uri: tour.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={[styles.content, compact && styles.compactContent]}>
          <Text numberOfLines={compact ? 1 : undefined} style={styles.name}>
            {tour.name}
          </Text>

          <Text style={styles.price}>
            {tour.price.toLocaleString("vi-VN")} ₫
          </Text>

          {!compact && (
            <>
              <Text style={styles.city}>{tour.city}</Text>

              <Text style={styles.date}>
                📅 {formatDate(tour.departure)} · {tour.days} ngày
              </Text>

              <Text style={[styles.seats, lowSeats && styles.lowSeats]}>
                {getSeatLabel(tour.seats)}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        testID="fav-btn"
        style={[
          styles.favoriteButton,
          compact ? styles.compactFavoriteButton : styles.normalFavoriteButton,
        ]}
        onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
        accessibilityRole="button"
        accessibilityLabel={
          tour.isFavorite ? "Bỏ yêu thích tour" : "Thêm tour vào yêu thích"
        }
      >
        <Text style={styles.heart}>{tour.isFavorite ? "♥" : "♡"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(TourItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  normalCard: {
    flexDirection: "row",
    minHeight: 90,
    marginHorizontal: 12,
    marginVertical: 6,
  },
  normalMainContent: {
    flex: 1,
    flexDirection: "row",
  },
  normalImageContainer: {
    width: 90,
    height: 90,
  },
  compactCard: {
    width: 160,
    flexDirection: "column",
  },
  compactMainContent: {
    flexDirection: "column",
  },
  compactImageContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
  },

  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
  },

  content: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    paddingRight: 30,
  },
  mainContent: {
    flex: 1,
  },
  imageContainer: {
    overflow: "hidden",
    backgroundColor: "#eee",
  },
  compactContent: {
    padding: 10,
    gap: 5,
  },

  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },
  city: {
    marginTop: 5,
    color: "#666",
    fontSize: 13,
  },
  date: {
    marginTop: 5,
    color: "#555",
    fontSize: 12,
  },
  price: {
    marginTop: 6,
    color: "#16834a",
    fontSize: 15,
    fontWeight: "bold",
  },
  seats: {
    marginTop: 5,
    fontSize: 12,
    color: "#16834a",
  },
  lowSeats: {
    color: "red",
    fontWeight: "bold",
  },

  favoriteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    zIndex: 2,
  },
  normalFavoriteButton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  compactFavoriteButton: {
    position: "absolute",
    right: 6,
    top: 6,
  },
  heart: {
    color: "#e53935",
    fontSize: 23,
    lineHeight: 27,
  },
});
