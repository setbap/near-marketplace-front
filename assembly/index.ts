import { ContractPromiseBatch, context } from "near-sdk-as";
import { Product, listedProducts, Supporters } from "./modal";

export function setProduct(product: Product): void {
  let storedProduct = listedProducts.get(product.id);
  if (storedProduct !== null) {
    throw new Error(`a product with ${product.id} already exists`);
  }
  listedProducts.set(product.id, Product.fromPayload(product));
}

export function donate(productId: string): void {
  let storedProduct = listedProducts.get(productId);
  if (storedProduct == null) {
    throw new Error(`no product with ${productId} exists`);
  }
  const acceptableSupports = [
    "1000000000000000000000000",
    "2000000000000000000000000",
    "3000000000000000000000000",
    "4000000000000000000000000",
    "5000000000000000000000000",
  ];
  if (!acceptableSupports.includes(context.attachedDeposit.toString())) {
    throw new Error(`wrong amount of Near Deposited`);
  }
  ContractPromiseBatch.create(storedProduct.owner).transfer(
    context.attachedDeposit
  );
  storedProduct.incrementDonateAmount(
    context.sender,
    I8.parseInt(context.attachedDeposit.toString().charAt(0))
  );
  listedProducts.set(productId, storedProduct);
}

export function getProduct(id: string): Product | null {
  return listedProducts.get(id);
}

export function resetData(): void {
  if (context.sender != "newbuilder.testnet") {
    throw new Error("only alice can reset data");
  }
  listedProducts.clear();
}

export function getDonatedProduct(sender: string): Product[] {
  const s: string = sender;
  const donateProducts: Product[] = new Array<Product>();
  const products = listedProducts.values();
  for (let index = 0; index < products.length; index++) {
    if (products[index].supporters.includes(s)) {
      donateProducts.push(products[index]);
    }
  }
  return donateProducts;
}

export function getProducts(): Product[] {
  return listedProducts.values();
}
