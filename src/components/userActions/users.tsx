import React, { use, useEffect, useState } from "react";
import { Table, Tag, Typography } from "antd";
import type { User } from "../../services/users-api/types";
import { fetchUsers } from "../../services/users-api/users";


const { Text } = Typography;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const data = await fetchUsers();
  //       setUsers(data);
  //     } catch (err: any) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUsers();
  // }, []);

 
      const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

     const clients = use(loadUsers())


  if (error) return <Text type="danger">{error}</Text>;

  const columns = [
    {
      title: "Seq",
      dataIndex: "id",
      key: "id",
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "Active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      render: (value: string) => {
        if (!value) return "-";
        const date = new Date(value);
        return date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      },
    },

  ];

  return <Table loading={loading} dataSource={users} columns={columns} rowKey="id" />;
};

export default UserList;
