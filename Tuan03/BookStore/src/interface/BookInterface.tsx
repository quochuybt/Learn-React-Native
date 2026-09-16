import { ImageSourcePropType } from "react-native";

export interface Book {
  source: ImageSourcePropType | string;
  title: string;
  author: string;
  price: number;
  discount: number;
}

export interface BookCardItemProp {
  book: Book;
  isSingle?: boolean;
}
