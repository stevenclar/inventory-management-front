import Product from "./product";
import Company from "./company";

export default interface Inventory {
  id: number;
  availableQuantity: string;
  description: string;
  product: Product;
  company?: Company
}
