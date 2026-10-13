import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TourItem from "../src/components/TourItem";
import { Tour } from "../src/interfaces/Tour";

const mockTour: Tour = {
  id: "101",
  name: "Đà Lạt mộng mơ",
  city: "Đà Lạt",
  days: 3,
  price: 2590000,
  seats: 2,
  departure: "2026-11-05",
  image: "https://example.com/dalat.jpg",
  isFavorite: false,
};

describe("TourItem component", () => {
  const mockOnPress = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Bố cục compact và không compact", () => {
    it("compact = true: không hiển thị thành phố (queryByText trả về null)", async () => {
      const { queryByText } = await render(
        <TourItem
          tour={mockTour}
          compact={true}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      expect(queryByText(mockTour.city)).toBeNull();
    });

    it("compact = false: có hiển thị thành phố", async () => {
      const { queryByText } = await render(
        <TourItem
          tour={mockTour}
          compact={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      expect(queryByText(mockTour.city)).not.toBeNull();
    });
  });

  describe("Sự kiện tương tác", () => {
    it('nhấn nút tim fav-btn: gọi onToggleFavorite đúng 1 lần với (id, true) và onPress không được gọi', async () => {
      const { getByTestId } = await render(
        <TourItem
          tour={mockTour}
          compact={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      const favButton = getByTestId("fav-btn");
      fireEvent.press(favButton);

      expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
      expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockTour.id, true);
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it("nhấn tên tour: onPress được gọi với cả object tour", async () => {
      const { getByText } = await render(
        <TourItem
          tour={mockTour}
          compact={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      const tourName = getByText(mockTour.name);
      fireEvent.press(tourName);

      expect(mockOnPress).toHaveBeenCalledTimes(1);
      expect(mockOnPress).toHaveBeenCalledWith(mockTour);
    });
  });
});
