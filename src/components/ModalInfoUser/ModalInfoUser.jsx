import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

export const ModalInfoUser = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  isSubmitting,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          customerName: initialValues.customerName,
          company: initialValues.company,
          orderValue: initialValues.orderValue,
          orderDate: initialValues.orderDate
            ? dayjs(initialValues.orderDate)
            : null,
          status: initialValues.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [initialValues, form, open]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        orderDate: values.orderDate
          ? values.orderDate.format("YYYY-MM-DD")
          : null,
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Customer" : "Add Customer"}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={isSubmitting}
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          label="Customer Name"
          name="customerName"
          rules={[{ required: true, message: "Please input customer name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name="company"
          rules={[{ required: true, message: "Please input company name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Order Value"
          name="orderValue"
          rules={[{ required: true, message: "Please input order value!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Order Date"
          name="orderDate"
          rules={[{ required: true, message: "Please select order date!" }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select>
            <Select.Option value="New">New</Select.Option>
            <Select.Option value="In-progress">In-progress</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
