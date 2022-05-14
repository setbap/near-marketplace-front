import { parseNearAmount } from "near-api-js/lib/utils/format";
import { v4 as uuid4 } from "uuid";
const GAS = 100000000000000;

export function createProduct(product: { id: any; price: string }) {
  product.id = uuid4();
  product.price = parseNearAmount(product.price + "");
  return window.contract.setProduct({ product });
}

export function getProducts() {
  return window.contract.getProducts();
}

export function getDonatedProduct(sender: string) {
  return window.contract.getDonatedProduct({ sender });
}

export function getProduct({ id }) {
  return window.contract.getProduct({ id });
}

export function donateProduct({ productId, price }) {
  return window.contract.donate({ productId }, GAS, price);
}
