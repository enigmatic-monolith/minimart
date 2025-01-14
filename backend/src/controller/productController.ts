import { Response } from "express";
import { AuthRequest } from "../middleware/authentication";
import { supabaseClient } from "../services/supabaseClient";
import { Tables } from "../database.types";
import { decode } from "base64-arraybuffer";

export type Product = Tables<"products">;
const productsTbl = "products";
const productImageBucket = "productImages";

export const getAllProducts = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase.from(productsTbl).select("*");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);

  return;
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  const { name, desc, quantity, price }: Product = req.body;
  const image = req.file;

  const supabase = supabaseClient(req.accessToken ?? "");

  let imageUrl = null;
  if (image) {
    const filePath = `products/${Date.now()}_${image.originalname}`;
    const fileBase64 = decode(image.buffer.toString("base64"));
    const { data, error } = await supabase.storage
      .from(productImageBucket)
      .upload(filePath, fileBase64, {
        contentType: "image/png",
      });
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    imageUrl = `${
      supabase.storage.from(productImageBucket).getPublicUrl(filePath).data
        .publicUrl
    }`;
  }

  const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          desc,
          quantity,
          price,
          image_url: imageUrl,
        },
      ]);
  
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json(data);
};
