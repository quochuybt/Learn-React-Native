import { ImageSourcePropType } from "react-native";

export interface Book {
  id: number;
  source: ImageSourcePropType;
  title: string;
  author: string;
  price: number;
  discount: number;
  category?: string;
  description?: string;
}

export interface BookCardItemProp {
  book: Book;
  isSingle?: boolean;
  onPress?: () => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
}
