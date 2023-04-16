import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { Modal, Button, Table, Form, Input, Select, message } from "antd";
const ItemPage = () => {
    const [itemsData, setItemsData] = useState([]);
    const [popupModal, setPopupModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const getAllItems = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/api/v1/items/get-item')
            setItemsData(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    //useEffect
    useEffect(() => {
        getAllItems();
        //eslint-disable-next-line
    }, []);

    //handle deleet
    const handleDelete = async (record) => {
        try {
            await axios.post('http://localhost:4000/api/v1/items/delete-item', { itemId: record._id });
            message.success("Item Deleted Succesfully");
            getAllItems();
            setPopupModal(false);
        } catch (error) {
            message.error("Something Went Wrong");
            console.log(error);
        }
    };

    //table data
    const columns = [
        { title: "Name", dataIndex: "name" },
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => (
                <img src={image} alt={record.name} height="60" width="60" />
            ),
        },
        { title: "Price", dataIndex: "price" },

        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <EditOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setEditItem(record);
                            setPopupModal(true);
                        }}
                    />
                    <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleDelete(record);
                        }}
                    />
                </div>
            ),
        },
    ];

    // handle form  submit
    const handleSubmit = async (value) => {
        if (editItem === null) {
            try {
                // eslint-disable-next-line
                const res = await axios.post('http://localhost:4000/api/v1/items/add-item', value);
                message.success("Item Added Succesfully");
                getAllItems();
                setPopupModal(false);
            } catch (error) {
                message.error("Something Went Wrong");
                console.log(error);
            }
        } else {
            try {
                await axios.put('http://localhost:4000/api/v1/items/edit-item', {
                    ...value,
                    itemId: editItem._id,
                });
                message.success("Item Updated Succesfully");
                getAllItems();
                setPopupModal(false);
            } catch (error) {
                message.error("Something Went Wrong");
                console.log(error);
            }
        }
    };

    return (
        <DefaultLayout>
            <div className="d-flex justify-content-between">
                <h1>Item List</h1>
                <Button type="primary" onClick={() => setPopupModal(true)}>
                    Add Item
                </Button>
            </div>

            <Table columns={columns} dataSource={itemsData} bordered />

            {popupModal && (
                <Modal
                    title={`${editItem !== null ? "Edit Item " : "Add New Item"}`}
                    open={popupModal}
                    onCancel={() => {
                        setEditItem(null);
                        setPopupModal(false);
                    }}
                    footer={false}
                >
                    <Form
                        layout="vertical"
                        initialValues={editItem}
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="price" label="Price">
                            <Input />
                        </Form.Item>
                        <Form.Item name="image" label="Image URL">
                            <Input />
                        </Form.Item>
                        <Form.Item name="productid" label="Product ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="category" label="Category">
                            <Select>
                                <Select.Option value="drinks">Drinks</Select.Option>
                                <Select.Option value="rice">Rice</Select.Option>
                                <Select.Option value="breads">Breads</Select.Option>
                                <Select.Option value="desserts">Desserts</Select.Option>
                                <Select.Option value="noodles">Noodles</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="d-flex justify-content-end">
                            <Button type="primary" htmlType="submit">
                                SAVE
                            </Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </DefaultLayout>
    );
};

export default ItemPage;