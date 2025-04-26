import { post, put } from "./request";

export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await put(`customers/${customerId}`, {
      customer_name: customerData.customerName,
      company: customerData.company,
      order_value: Number(customerData.orderValue),
      order_date: customerData.orderDate,
      status: customerData.status,
      avatar: customerData.avatar || "Avatar.png",
    });

    if (!response) {
      throw new Error("Không nhận được phản hồi từ server");
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật khách hàng:", error);
    throw new Error(error.message || "Cập nhật thất bại");
  }
};

export const insertCustomer = async (customerData) => {
  try {
    const response = await post(`customers`, {
      customer_name: customerData.customerName,
      company: customerData.company,
      order_value: customerData.orderValue,
      order_date: customerData.orderDate,
      status: customerData.status,
      avatar: "Avatar.png",
    });

    if (!response) {
      throw new Error("Không nhận được phản hồi từ server");
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng:", error);
    throw new Error(error.message || "Thêm mới thất bại");
  }
};
