import {
  ActivityIndicator,
  Alert,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
  RefreshControl,
  Switch,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Tour } from "../interfaces/Tour";
import TourItem from "../components/TourItem";
import { formatDate, groupByCity } from "../utils/tour";

const API_URL = "https://6ac9d2683115bcc9582007ae.mockapi.io/tours";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [tours, setTour] = useState<Tour[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (isRefresh = false) => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Không thể tải danh sách tour");
      }

      const data: Tour[] = await res.json();
      setTour(
        data.map((tour: Tour) => ({
          ...tour,
          isFavorite: tour.isFavorite ?? (tour as any).isFavorite ?? false,
        })),
      );
    } catch (error) {
      Alert.alert("Lỗi", "Không tải được danh sách tour.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const filteredTours = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase();

    if (!keyword) return tours;

    return tours.filter((tour) =>
      tour.name.toLocaleLowerCase().includes(keyword),
    );
  }, [tours, search]);

  const sections = useMemo(() => groupByCity(filteredTours), [filteredTours]);

  const favoriteTours = useMemo(
    () => filteredTours.filter((tour) => tour.isFavorite),
    [tours],
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  const handlePress = (tour: Tour) => {
    Alert.alert(
      tour.name,
      `Ngày khởi hành: ${formatDate(tour.departure)}\n` +
        `Số ngày: ${tour.days} ngày\n` +
        `Giá: ${tour.price.toLocaleString("vi-VN")} ₫`,
    );
  };

  const handleToggleFavorite = async (id: string, next: boolean) => {
    const previousFavorite = tours.find((tour) => tour.id === id)?.isFavorite;

    if (previousFavorite === undefined) {
      return;
    }
    setTour((prev) =>
      prev.map((tour) =>
        tour.id === id ? { ...tour, isFavorite: next } : tour,
      ),
    );

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFavorite: next,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (error) {
      setTour((prev) =>
        prev.map((tour) =>
          tour.id === id ? { ...tour, isFavorite: previousFavorite } : tour,
        ),
      );

      Alert.alert(
        "Lỗi",
        "Không thể cập nhật trạng thái yêu thích. Vui lòng thử lại.",
      );
    }
  };

  const renderFavoriteHeader = () => (
    <View style={styles.favoriteSection}>
      <Text style={styles.favoriteTitle}>
        Tour yêu thích ({favoriteTours.length})
      </Text>

      {favoriteTours.length === 0 ? (
        <Text style={styles.emptyFavorite}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          horizontal
          data={favoriteTours}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact={true}
              onPress={handlePress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          contentContainerStyle={styles.favoriteList}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>Tour Việt</Text>
          <Text>23664121 - Lê Nguyễn Quốc Huy</Text>
        </View>

      <View style={styles.searchContainer}>
        <Text>Tìm kiếm theo tên:</Text>
        <TextInput
          style={styles.input}
          value={search}
          placeholder="Tìm tour theo tên..."
          onChangeText={setSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          stickySectionHeadersEnabled
          ListHeaderComponent={renderFavoriteHeader}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {section.title} · {section.data.length} tour
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact={false}
              onPress={handlePress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Không tìm thấy tour phù hợp</Text>
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#16834a"]}
              tintColor="#16834a"
            />
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  favoriteSection: {
    paddingTop: 14,
    paddingBottom: 12,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 12,
    marginBottom: 10,
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
  },
  separator: {
    width: 10,
  },
  favoriteList: {
    paddingHorizontal: 12,
  },
  emptyFavorite: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#777",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    padding: 12,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  sectionHeader: {
    backgroundColor: "#e8f0fe",
    padding: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  empty: {
    textAlign: "center",
    padding: 20,
  },
});
