import { useEffect, useState } from "react";
import { OverviewItem } from "../../components/OverviewItem/OverviewItem";
import { BadgeDollarSign, ShoppingCart, User } from "lucide-react";

export function Dashboard() {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCustomer = async () => {
      const dataJson = await fetch("http://localhost:3000/customers")
        .then((res) => res.json())
        .then((data) => data);
      if (dataJson && dataJson.length > 0) {
        setTotalCustomer(dataJson.length);
      }
    };

    fetchCustomer();

    const fetchOrder = async () => {
      const dataJson = await fetch("http://localhost:3000/orders")
        .then((res) => res.json())
        .then((data) => data);
      if (dataJson && dataJson.length > 0) {
        setTotalPrice(
          dataJson.reduce((total, data) => (total += data.totalPrice), 0)
        );
      }
    };

    fetchOrder();
  }, []);

  return (
    <>
      <section>
        <div className="flex gap-2">
          <img src={"images/Squares four 1.png"} alt="" />
          <h1 className="text-left font-bold">Overview</h1>
        </div>

        <div className="grid grid-cols-3 gap-5 my-5">
          <OverviewItem
            background={"bg-pink-50"}
            color={"-pink-400"}
            title={"Turnover"}
            value={"$" + Math.ceil(totalPrice).toLocaleString()}
            percentageChange={6.8}
            icon={<ShoppingCart className="text-pink-400" />}
          />
          <OverviewItem
            background={"bg-blue-50"}
            color={"-blue-400"}
            title={"Profit"}
            value={"$" + Math.ceil(totalPrice * 0.32).toLocaleString()}
            percentageChange={6.1}
            icon={<BadgeDollarSign className="text-blue-400" />}
          />
          <OverviewItem
            background={"bg-blue-50"}
            color={"-blue-400"}
            title={"New customer"}
            value={totalCustomer}
            percentageChange={6.84}
            icon={<User className="text-blue-400" />}
          />
        </div>
      </section>
    </>
  );
}
