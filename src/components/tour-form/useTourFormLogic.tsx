import  { useEffect, useState } from "react";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';
import { Form, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { TourFormProps } from ".";


export interface TourValues {
    id?: string;
    title: string;
    description: string;
    price: number;
    start_date: Dayjs | null;
    end_date: Dayjs | null;
    image_url?: string;
}


const useTourFormLogic = ({onSubmit, initialValues}: TourFormProps) => {
  const [form] = Form.useForm<TourValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    initialValues?.image_url
  );

  const normFile = (e: UploadChangeParam): UploadFile[] | undefined => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleBeforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    return isJpgOrPng && isLt2M;
  };

  const handleUploadChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      let file: File | undefined;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        file = fileList[0].originFileObj as File;
      }
      onSubmit(values, file);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        id: initialValues.id,
        title: initialValues.title,
        description: initialValues.description,
        price: initialValues.price,
        start_date: initialValues.start_date
          ? dayjs(initialValues.start_date)
          : null,
        end_date: initialValues.end_date ? dayjs(initialValues.end_date) : null,
        image_url: initialValues.image_url,
      });
      setImageUrl(initialValues.image_url);
    }
  }, [form, initialValues, setImageUrl]);


  return {
    imageUrl,
    normFile,
    handleBeforeUpload,
    handleUploadChange,
    handleSubmit,
    form
  };
};

export default useTourFormLogic;
