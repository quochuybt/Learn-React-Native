import MovieCard from "../src/components/MovieCard";
import { Movie } from "../src/interfaces/Movie";
import { fireEvent, render } from "@testing-library/react-native";

describe("MovieCard Component", () => {
  const MockMovie: Movie = {
    id: "1",
    title: "Mai",
    genre: "Action",
    year: 2024,
    rating: 8,
    poster: "image",
    isShowing: true,
  };

  describe("a", () => {
    it("title và rating", async () => {
      const { getByText } = await render(
        <MovieCard movie={MockMovie} onSelect={jest.fn()} />,
      );

      expect(getByText("Mai")).toBeTruthy();
      expect(getByText(/⭐\s*8\.0/)).toBeTruthy();
    });
  });

  describe("d", () => {
    it("fire.event", async () => {
      const onSelectMock = jest.fn();
      const { getByText } = await render(
        <MovieCard movie={MockMovie} onSelect={onSelectMock} />,
      );

      fireEvent.press(getByText("Mai"));

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(onSelectMock).toHaveBeenCalledWith("1");
    });
  });
});
