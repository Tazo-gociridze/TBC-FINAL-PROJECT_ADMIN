import React from 'react';
import { Table, Button, Space, Spin } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Dayjs } from 'dayjs';

interface TourValues {
  id?: string;
  title: string;
  description: string;
  price: number;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  image_url?: string;
}

interface TourListProps {
  tours: TourValues[];
  onEdit: (tour: TourValues) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const TourList: React.FC<TourListProps> = ({
  tours,
  onEdit,
  onDelete,
  loading,
}) => {
  const columns: ColumnsType<TourValues> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150, 
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div className="line-clamp-4 text-wrap">{text}</div>,
      responsive: ['md']
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      responsive: ['lg'] 
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => date?.toDate().toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => date?.toDate().toLocaleDateString(),
      responsive: ['md'] 
    },
    {
      title: "Action",
      key: "action",
        width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => onDelete(record.id || "")}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={tours}
        rowKey="id"
         scroll={{ x: true }}
      />
    </Spin>
  );
};

export default TourList;
