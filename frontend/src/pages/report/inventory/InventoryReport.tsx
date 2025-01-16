import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Inventory, InventoryQuantity, ProductLog } from "./types";
import { InventoryCountReport } from "./InventoryCountReport";

export const InventoryReport = ({ time }: { time: Date }) => {
  const [products, setProducts] = useState<Inventory[]>([]);
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/product/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.map((item: any) => ({
          id: item.id,
          name: item.name,
          quantities: [],
        })))
      })
      .then(() => fetch(`${import.meta.env.VITE_API_BASE_URL}/product/log/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }))
      .then((res) => res.json())
      .then((data: ProductLog[]) => {
        setProducts(
          (products) => products.map((product) => {
            const logs = data
              .filter((log) => log.product_id === product.id)
              .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            let currTime = new Date(0);
            const quantities: InventoryQuantity[] = [];
            for (const log of logs) {
              const newTime = new Date(log.created_at);
              if (newTime.toDateString() === currTime.toDateString()) {
                quantities[quantities.length - 1].quantity = log.new_quantity;
              } else {
                quantities.push({
                  day: newTime,
                  quantity: log.new_quantity,
                });
                currTime = newTime;
              }
            }
            return {
              ...product,
              quantities: quantities,
            };
          })
        );
      });
  }, []);

  return (
    <div>
      <h2>Inventory Report</h2>
      <InventoryCountReport products={products} time={time} />
    </div>
  );
};
