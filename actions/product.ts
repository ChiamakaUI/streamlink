"use server";

import { db } from "@/lib/db";

export const createProduct = async (values) => {
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