import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Upload,
  Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useTourFormLogic from "./hook/useTourFormLogic";
import { TourData } from "../../types/Tour/index.types";

export interface TourFormProps {
  onSubmit: (values: TourData, image?: File) => Promise<void>;
  initialValues?: TourData;
  loading?: boolean;
}

const TourForm: React.FC<TourFormProps> = ({
  onSubmit,
  initialValues,
  loading,
}) => {
  const {
    imageUrl,
    normFile,
    handleBeforeUpload,
    handleUploadChange,
    handleSubmit,
    form,
  } = useTourFormLogic({ onSubmit, initialValues });

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Start Date"
        name="start_date"
        rules={[{ required: true, message: "Please input the start date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="End Date"
        name="end_date"
        rules={[{ required: true, message: "Please input the end date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          beforeUpload={handleBeforeUpload}
          onChange={handleUploadChange}
          listType="picture-card"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>

        {imageUrl && <Image width={200} src={imageUrl} />}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {initialValues ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TourForm;
