import { useEffect, useState } from "react";
import { OverviewItem } from "../../components/OverviewItem/OverviewItem";
import { BadgeDollarSign, Pencil, ShoppingCart, User } from "lucide-react";
import { Image, Space, Table, Tag } from "antd";

const columns = [
  {
    title: "CUSTOMER NAME",
    dataIndex: "customerName",
    key: "customerName",
    render: (_, { avatar, customerName }) => (
      <div className="flex gap-2 items-center">
        <Image src={`images/${avatar}`} />
        <h2 className="font-bold">{customerName}</h2>
      </div>
    ),
  },
  {
    title: "COMPANY",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "ORDER VALUE",
    dataIndex: "orderValue",
    key: "orderValue",
  },
  {
    title: "ORDER DATE",
    key: "orderDate",
    dataIndex: "orderDate",
  },
  {
    title: "STATUS",
    key: "status",
    render: (_, { status }) => (
      <div className="text-center">
        {status === "New" && <Tag color={"blue"}>{status}</Tag>}
        {status === "In-progress" && <Tag color={"yellow"}>{status}</Tag>}
        {status === "Completed" && <Tag color={"green"}>{status}</Tag>}
      </div>
    ),
  },
  {
    key: "action",
    render: () => (
      <>
        <Pencil className="text-gray-400" />
      </>
    ),
  },
];

export function Dashboard() {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      const dataJson = await fetch("http://localhost:3000/customers")
        .then((res) => res.json())
        .then((data) => data);
      if (dataJson && dataJson.length > 0) {
        setTotalCustomer(dataJson.length);
        setCustomers(dataJson);
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

  const data = customers.map((cus, index) => ({
    key: index,
    customerName: cus.customer_name,
    company: cus.company,
    orderValue: cus.order_value,
    orderDate: cus.order_date,
    status: cus.status,
    avatar: cus.avatar,
  }));

  return (
    <>
      <section className="mb-10">
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
      <section className="mb-8">
        <div className="flex gap-2">
          <img src={"images/Squares four 1.png"} alt="" />
          <h1 className="text-left font-bold">Detailed report</h1>
        </div>
        <Table
          className="my-5 "
          columns={columns}
          dataSource={data}
          rowSelection={Object.assign(Object.assign({}))}
          pagination={{ pageSize: 6 }}
          footer={() => (
            <div className="text-left">{totalCustomer} results</div>
          )}
        />
      </section>
    </>
  );
}
