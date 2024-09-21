import currency from "currency.js";

export const vnd = (value: number) =>
  currency(value, {
    symbol: "",
    separator: ".",
    decimal: ",",
    precision: 0,
  }).format() + " đ";
