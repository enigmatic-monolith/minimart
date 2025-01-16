import { Response } from "express";
import { AuthRequest } from "../middleware/authentication";
import { supabaseClient } from "../services/supabaseClient";
import { Tables, TablesInsert, TablesUpdate } from "../database.types";
import { decode } from "base64-arraybuffer";

export type Product = Tables<"products">;
export type ProductUpdate = TablesUpdate<"products">;
export type ProductCreate = TablesInsert<"products">;
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

export const getAllProductLog = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase.from("product_updates").select("*");

  if (error) {
    res.status(500).json(error);
    return;
  }

  res.json(data);
  return;
}

export const uploadProductImage = async (req: AuthRequest, res: Response) => {
  const image = req.file;
  const supabase = supabaseClient(req.accessToken ?? "");

  if (!image) {
    res.status(500).json({ error: "No image provided" });
    return;
  }

  const filePath = `${Date.now()}_${image.originalname}`;
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

  const imageUrl = `${
    supabase.storage.from(productImageBucket).getPublicUrl(filePath).data
      .publicUrl
  }`;
  res.status(200).json({ image_url: imageUrl });
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, desc, price, quantity, image_url }: ProductUpdate = req.body;

  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase
    .from("products")
    .update({
      name,
      desc,
      quantity,
      price,
      image_url,
      last_updated_by: req.user.sub
    } as ProductUpdate)
    .eq("id", id)
    .select();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const { error: updateError } = await supabase
    .from("product_updates")
    .insert([
      {
        product_id: id,
        new_quantity: quantity,
      }
    ]);
  
  if (updateError) {
    res.status(500).json({ error: updateError.message });
    return;
  }

  res.status(200).json(data);
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  const { name, desc, quantity, price, image_url }: ProductCreate = req.body;

  const supabase = supabaseClient(req.accessToken ?? "");

  const { data, error } = await supabase.from("products").insert([
    {
      name,
      desc,
      quantity,
      price,
      image_url,
    },
  ])
    .select();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const { error: updateError } = await supabase
    .from("product_updates")
    .insert([
      {
        product_id: data?.[0].id,
        new_quantity: quantity,
      }
    ]);
  
  if (updateError) {
    res.status(500).json({ error: updateError.message });
    return;
  }

  res.status(200).json(data);
};
