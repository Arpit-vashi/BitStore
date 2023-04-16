import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList.js'
import { useDispatch } from "react-redux";
const Homepage = () => {
    const [ItemsData, setItemsData] = useState([])
    const [selecedCategory, setSelecedCategory] = useState("drinks");
    const categories = [
        {
            name: "Drinks",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png",
        },
        {
            name: "Appetizers",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1069/1069354.png",
        },
        {
            name: "Noodles",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/1471/1471262.png",
        },
        {
            name: "Breads",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/6482/6482985.png",
        },
        {
            name: "Vegetables",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/2329/2329865.png",
        },
        {
            name: "Rice",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/3174/3174880.png",
        },
        {
            name: "Desserts",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081949.png",
        },
    ];

    //use effect
    useEffect(() => {
        const getAllItems = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/items/get-item')
                setItemsData(data);
                useDispatch({ type: "HIDE_LOADING" });
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        getAllItems();
    }, [useDispatch])
    return (
        <DefaultLayout>
            <div className="d-flex">
                {categories.map((category) => (
                    <div

                        key={category.name}
                        className={`d-flex category ${selecedCategory === category.name && "category-active"
                            }`}
                        onClick={() => setSelecedCategory(category.name)}
                    >
                        <h4>{category.name}</h4>
                        <img
                            src={category.imageUrl}
                            alt={category.name}
                            height="40"
                            width="60"
                        />
                    </div>
                ))}
            </div>

            <Row>
                {ItemsData
                    .filter((i) => i.category === selecedCategory)
                    .map((item) => (
                        <Col xs={24} lg={6} md={12} sm={6}>
                            <ItemList key={item.id} item={item} />
                        </Col>
                    ))}
            </Row>
        </DefaultLayout>
    );
};

export default Homepage;