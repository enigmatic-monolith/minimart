import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Inventory } from "./types";
import { useMemo } from "react";

export const InventoryCountReport = ({
  time,
  products,
}: {
  time: Date,
  products: Inventory[],
}) => {
  const data = useMemo(() => {
    const indices = products.map((product) => {
      let i = 0;
      let found = false;
      for (i = 0; i < product.quantities.length; i++) {
        if (product.quantities[i].day.toDateString() === time.toDateString() || product.quantities[i].day.getTime() > time.getTime()) {
          found = true;
          break;
        }
      }
      return found ? i : -1;
    });
    const data = [];
    for (let i = 0; i < 7; i++) {
      const currTime = new Date(time.getTime() + i * 24 * 3600 * 1000);
      const dataPoint: any = {
        name: currTime.toLocaleDateString('default', {
          day: 'numeric',
          month: 'short',
        }),
      };
      for (const [i, product] of products.entries()) {
        if (indices[i] === -1) {
          continue;
        }
        let found = false;
        while (indices[i] < product.quantities.length) {
          if (product.quantities[indices[i]].day.toDateString() === currTime.toDateString() || product.quantities[indices[i]].day.getTime() > currTime.getTime()) {
            found = true;
            break;
          }
          indices[i]++;
        }
        if (!found) {
          indices[i] = -1;
          continue;
        }

        dataPoint[product.name] = product.quantities[indices[i]].quantity;
      }
      data.push(dataPoint);
    }
    return data;
  }, [time, products]);

  const colors = useMemo(() => {
    return products.map((product) => ({
      key: product.name,
      color: getRandomColor(),
    }))
  }, [products]);

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Inventory stockpile against time</h3>
      <LineChart width={730} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {colors.map((color) => (
          <Line
            type="monotone"
            dataKey={color.key}
            stroke={color.color}
            key={color.key}
          />
        ))}
      </LineChart>
    </div>
  );
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
