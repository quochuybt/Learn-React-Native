import Card from "../src/components/Card";
import { Bicycle } from "../src/interfaces/Bicycle";
import { render } from "@testing-library/react-native";

describe("CardComponet", () => {
  const mockData: Bicycle = {
    id: 1,
    title: "Test",
    image: "image",
    price: 1900,
  };

  describe("test ten phim", () => {
    it("Hien thi ten phim", async () => {
      const { getByText } = await render(
        <Card
          title={mockData.title}
          image={mockData.image}
          price={mockData.price}
          id={mockData.id}
        />,
      );

      expect(getByText(/Test/)).toBeTruthy();
    });
  });
});
