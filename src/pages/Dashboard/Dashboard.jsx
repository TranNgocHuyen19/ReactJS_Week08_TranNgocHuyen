import { useEffect, useState } from "react";
import { OverviewItem } from "../../components/OverviewItem/OverviewItem";
import { BadgeDollarSign, Pencil, ShoppingCart, User } from "lucide-react";
import { Image, Table, Tag, Spin, message, Button } from "antd";
import { ModalInfoUser } from "../../components/ModalInfoUser/ModalInfoUser";
import { insertCustomer, updateCustomer } from "../../services/CustomerService";

export function Dashboard() {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (customer = null) => {
    setCurrentCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentCustomer(null);
  };

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/customers");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const dataJson = await response.json();
      setCustomers(dataJson);
      setTotalCustomer(dataJson.length || 0);
    } catch (error) {
      message.error("Failed to load customers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true);
      console.log(currentCustomer);
      if (currentCustomer?.customer_id) {
        await updateCustomer(currentCustomer.id, values);
        message.success("Cập nhật thành công");
      } else {
        await insertCustomer(values);
        message.success("Thêm mới thành công");
      }

      await fetchCustomers();
      handleCancel();
    } catch (error) {
      console.error("Submit error:", error);
      message.error(error.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();

    const fetchOrder = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const dataJson = await response.json();
        if (dataJson && dataJson.length > 0) {
          setTotalPrice(
            dataJson.reduce((total, data) => total + data.totalPrice, 0)
          );
        }
      } catch (error) {
        message.error("Failed to load orders");
      }
    };

    fetchOrder();
  }, []);

  const columns = [
    {
      title: "CUSTOMER NAME",
      dataIndex: "customerName",
      key: "customerName",
      render: (_, { avatar, customerName }) => (
        <div className="flex gap-2 items-center">
          <Image
            src={`images/${avatar}`}
            fallback="images/default-avatar.png"
          />
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
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "STATUS",
      key: "status",
      render: (_, { status }) => (
        <div className="text-center">
          {status === "New" && <Tag color="blue">{status}</Tag>}
          {status === "In-progress" && <Tag color="yellow">{status}</Tag>}
          {status === "Completed" && <Tag color="green">{status}</Tag>}
        </div>
      ),
    },
    {
      key: "action",
      render: (_, record) => (
        <Pencil
          className="text-gray-400 cursor-pointer"
          onClick={() => showModal(record)}
        />
      ),
    },
  ];

  const data = customers.map((cus, index) => ({
    key: index,
    customerName: cus.customer_name || "N/A",
    company: cus.company || "N/A",
    orderValue: cus.order_value || 0,
    orderDate: cus.order_date || "N/A",
    status: cus.status || "Unknown",
    avatar: cus.avatar || "Avatar.png",
    id: cus.customer_id,
  }));

  return (
    <>
      <section className="mb-10">
        <div className="flex gap-2">
          <img src="images/Squares four 1.png" alt="Overview icon" />
          <h1 className="text-left font-bold">Overview</h1>
        </div>
        <div className="grid grid-cols-3 gap-5 my-5">
          <OverviewItem
            background="bg-pink-50"
            color="-pink-400"
            title="Turnover"
            value={`$${Math.ceil(totalPrice).toLocaleString()}`}
            percentageChange={6.8}
            icon={<ShoppingCart className="text-pink-400" />}
          />
          <OverviewItem
            background="bg-blue-50"
            color="-blue-400"
            title="Profit"
            value={`$${Math.ceil(totalPrice * 0.32).toLocaleString()}`}
            percentageChange={6.1}
            icon={<BadgeDollarSign className="text-blue-400" />}
          />
          <OverviewItem
            background="bg-blue-50"
            color="-blue-400"
            title="New customer"
            value={totalCustomer}
            percentageChange={6.84}
            icon={<User className="text-blue-400" />}
          />
        </div>
      </section>

      <section className="mb-8">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img src="images/Squares four 1.png" alt="Report icon" />
            <h1 className="text-left font-bold">Detailed report</h1>
          </div>
          <button
            className="bg-pink-500 text-white px-3 py-1 rounded-sm"
            onClick={() => showModal()}
          >
            Add Customer
          </button>
        </div>
        <Spin spinning={isLoading}>
          <Table
            className="my-5"
            columns={columns}
            dataSource={data}
            rowSelection={{}}
            pagination={{ pageSize: 6 }}
            footer={() => (
              <div className="text-left">{totalCustomer} results</div>
            )}
          />
        </Spin>
      </section>
      <ModalInfoUser
        open={isModalOpen}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initialValues={currentCustomer}
        isSubmitting={isLoading}
      />
    </>
  );
}
