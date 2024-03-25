"use server";

import { db } from "@/lib/db";

type Product = {
    image: string;
    name: string;
    price: number;
    streamType: string;
    liveStreamName: string;
    userId: string;
}

export const createProduct = async (values: Product[]) => {
  const res = await db.product.createMany({
    data: values,
  });
// console.log(res)
  return res;
};

export const getProductsByUserId = async (id: string) => {
  const products = await db.product.findMany({
    where: {
      userId: id,
    }
  })
  return products
};

export const getProductsByStream = async (streamId: string) => {
  const products = await db.product.findMany({
    where: {
      liveStreamName: streamId,
    }
  })
  // console.log(products)
  return products
};

export const getProductsByAuction = async (streamId: string) => {
  const products = await db.product.findMany({
    where: {
      liveStreamName: streamId,
      streamType: "auction"
    }
  })
  // console.log(products)
  return products
};

export const getCurrentProduct = async (id: string) => {
  const product = await db.user.findUnique({ where: { id } });

  console.log(product)
  return product
}