import { NavigatorScreenParams } from "@react-navigation/native";
import { Book } from "../interface/BookInterface";

export type MainTabParamList = {
  Home: undefined;
  Category: undefined;
  Cart: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Home: undefined; // Direct navigation alias
  Cart: undefined; // Direct navigation alias
  BookDetail: {
    bookId: number;
    book?: Book;
  };
  Checkout: {
    totalAmount: number;
    items?: any[];
  };
};
