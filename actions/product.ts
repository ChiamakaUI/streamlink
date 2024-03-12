"use server";

import { db } from "@/lib/db";

export const createProduct = async (values) => {
  const res = await db.product.createMany({
    data: values,
  });

  return res;
};

export const getProducts = async (id) => {
  const products = await db.product.findMany({
    where: {
      userId: id
    }
  })
  return products
};