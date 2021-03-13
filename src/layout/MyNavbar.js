import React from "react";
import { Layout, Menu } from "antd";
const { Header } = Layout;
function MyNavbar(props) {
  return (
    <>
      <Header
        className="header des-hed"
        style={{ width: "100%", height: "65px" }}
      >
        <Menu
          style={{ height: "65px" }}
          theme="dark"
          mode="horizontal"
          defaultActiveFirst={false}
        >
          <Menu.Item className="header-menu">
            <a href="/" className="hd-name">
              Nutrition Recommender
            </a>
          </Menu.Item>
          <Menu.Item className="child-m" key="3">
            <a href="/about-us">About Us</a>
          </Menu.Item>

          <Menu.Item className="child-m" key="2">
            <a href="/food-recommender">Recommender</a>
          </Menu.Item>
          <Menu.Item className="child-m" key="1">
            <a href="/scan">Scan</a>
          </Menu.Item>
        </Menu>
      </Header>

      <Header
        className="header mob-hed"
        style={{ width: "100%", height: "65px", display: "none" }}
      >
        <Menu
          style={{ height: "65px" }}
          theme="dark"
          mode="horizontal"
          defaultActiveFirst={false}
        >
          <Menu.Item className="header-menu">
            <a href="/" className="hd-name">
              Nutrition Recommender
            </a>
          </Menu.Item>
          <Menu.Item className="child-m" key="1">
            <a href="/scan">Scan</a>
          </Menu.Item>
          <Menu.Item className="child-m" key="2">
            <a href="/food-recommender">Recommender</a>
          </Menu.Item>
          <Menu.Item className="child-m" key="3">
            <a href="/about-us">About Us</a>
          </Menu.Item>
        </Menu>
      </Header>
    </>
  );
}

export default MyNavbar;
