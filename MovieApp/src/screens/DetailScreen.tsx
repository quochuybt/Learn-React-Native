import { StyleSheet, Text, View, Image } from "react-native";

const DetailScreen = ({ navigation, route }: any) => {
  const movie = route?.params?.movie;
  return (
    <View style={{ padding: 20 }}>
      <View style={{ height: 400 }}>
        <Image
          source={{ uri: movie.poster }}
          style={{ height: "100%", width: "100%", borderRadius: 5 }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={{ fontSize: 16 }}>Thể loại: {movie.genre}</Text>
        <Text style={{ fontSize: 16 }}>Năm: {movie.year}</Text>

        <Text style={{ fontSize: 16 }}>
          Đánh giá: ⭐{movie.rating.toFixed(1)}
        </Text>

        <Text style={{ fontSize: 16 }}>
          {movie.isShowing ? "Đang chiếu ✅" : "Ngừng chiếu ❌"}
        </Text>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
