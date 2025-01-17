import { Response } from "express";
import { AuthRequest } from "../middleware/authentication";
import { supabaseClient } from "../services/supabaseClient";
import { Tables, TablesInsert } from "../database.types";

export type OrderItem = Tables<"order_items">;
export type OrderItemCreate = TablesInsert<"order_items">;
export type Order = Tables<"orders">;
export type OrderCreate = TablesInsert<"orders">;

export const placeOrder = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");
  const { sub: userId } = req.user;
  const orderItems: Omit<OrderItem, 'order_id'>[] = req.body;

  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    res.status(400).json({ message: "Order items are required." });
    return;
  }

  try {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("points")
      .eq("user_id", userId)
      .single();

    if (userError || !user) {
      res.status(400).json({ message: "User not found." });
      return;
    }

    const totalPrice = orderItems.reduce((total, item) => {
      return total + item.price_at_purchase * item.quantity;
    }, 0);

    if (totalPrice > user.points) {
      res.status(400).json({ message: "Insufficient points." });
      return;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_price: totalPrice,
        status: "pending",
      } as OrderCreate)
      .select("*")
      .single();

    if (orderError) {
      res.status(500).json({ message: "Failed to create order." });
      return;
    }

    const formattedOrderItems = orderItems.map(
      (item: OrderItem) =>
        ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_purchase: item.price_at_purchase,
        } as OrderItemCreate)
    );

    const { data: items, error: orderItemsError } = await supabase.from("order_items").insert(formattedOrderItems);
    if (orderItemsError) {
      res.status(500).json({ message: orderItemsError.message });
      return;
    }

    // Deduct points
    await supabase
      .from("users")
      .update({ points: user.points - totalPrice })
      .eq("user_id", userId);

    res
      .status(201)
      .json({ message: "Order placed successfully!", orderId: order.id });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed.", error });
  }
};

export const getAllOrdersForUser = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");
  const { sub: userId } = req.user;

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    res.status(500).json({ message: "Failed to fetch orders." });
    return;
  }

  res.status(200).json(orders);
};

export const getOrderDetailsById = async (req: AuthRequest, res: Response) => {
  const supabase = supabaseClient(req.accessToken ?? "");
  const { sub: userId } = req.user;
  const { id } = req.params;

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
          *,
          order_items (
            product_id,
            quantity,
            price_at_purchase,
            products (name, desc)
          )
        `
    )
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !order) {
    res.status(404).json({ message: "Order not found." });
    return;
  }

  res.status(200).json(order);
};
