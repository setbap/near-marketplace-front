import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

export class Supporters {
  name: string;
  date: i64;
  amount: i8;
}

@nearBindgen
export class Product {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  owner: string;
  supporters: Array<string>;

  public static fromPayload(payload: Product): Product {
    const product = new Product();
    product.id = payload.id;
    product.name = payload.name;
    product.description = payload.description;
    product.image = payload.image;
    product.location = payload.location;
    product.owner = context.sender;
    product.supporters = new Array<string>();
    return product;
  }
  public incrementDonateAmount(name: string, amount: i8): void {
    // const supporter = new Supporters();
    // supporter.date = Date.now();
    // supporter.name = name;
    // supporter.amount = amount;
    this.supporters.push(name);
  }
}

export const listedProducts = new PersistentUnorderedMap<string, Product>(
  "LISTED_PRODUCTS"
);
