import Inventory from "./inventory";

export default interface Company {
  nit: string;
  name?: string;
  description?: string;
  address?: string;
  phone?: string;
  inventories?: Inventory[]
}