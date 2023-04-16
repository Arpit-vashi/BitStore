import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { CrownOutlined, SlackOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
const devloper = () => {
    return (
        <DefaultLayout >
            <h1 className="d-head"><u>Devloper Details</u></h1>
            <br></br>
            <h3><b><SlackOutlined />  Coded By:- Arpit M Vashi</b></h3>
            <br></br>
            <h3><b><CrownOutlined />  Portfolio:- https://devloper.me</b></h3>
            <br></br>
            <h3><b><LinkedinOutlined />  Linkedin:-</b></h3>
            <br></br>
            <h3><b><GithubOutlined />  Github:-https://github.com/Arpit-vashi</b></h3>
            <br></br>
            <br></br>
            <br></br>
            <h5>Refrence:- Youtube,Stackoverflow,Github</h5>

        </DefaultLayout>
    );
};

export default devloper;