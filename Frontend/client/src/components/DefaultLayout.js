import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    CopyOutlined,
    UnorderedListOutlined,
    ShoppingCartOutlined,
    QqOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems, loading } = useSelector(state => state.rootReducer)
    const [collapsed, setcollapsed] = useState(false)
    const toggle = () => {
        setcollapsed(
            !collapsed
        );
    };

    //to get local storage data
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])


    return (
        <Layout>
            {loading && <Spinner />}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h1 className="text-center text-light font-wight-bold mt-4">BitStore</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.location.pathname}
                >
                    <Menu.Item key="/" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="/bills" icon={<CopyOutlined />}>
                        <Link to="/bills">Bills</Link>
                    </Menu.Item>
                    <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
                        <Link to="/items">Items</Link>
                    </Menu.Item>
                    <Menu.Item key="/customers" icon={<UserOutlined />}>
                        <Link to="/customers">Cutomers</Link>
                    </Menu.Item>
                    <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={() => {
                        localStorage.removeItem("auth");
                        navigate("/login");
                    }}>
                        Logout
                    </Menu.Item>
                    <Menu.Item key="/devloper" icon={<QqOutlined />}>
                        <Link to="/devloper">Devloper</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: toggle,
                        }
                    )}
                    <div
                        className="cart-item d-flex jusitfy-content-space-between flex-row"
                        onClick={() => navigate("/cart")}
                    >
                        <p className="abc">{cartItems.length}</p>
                        <ShoppingCartOutlined />
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;