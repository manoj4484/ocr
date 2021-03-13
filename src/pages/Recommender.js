import React, { useState } from "react";
import { Form, Button, Divider, Layout, Row, List, Col } from "antd";
import { Select } from "antd";
import Axios from "axios";
import { server } from "../server.js";

const { Option } = Select;

const { Content } = Layout;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const Recommender = () => {
  const [name, setName] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [notRecommended, setNotRecommended] = useState([]);
  const diseaseArray = [
    "DIABETES",
    "HEART DISEASE",
    "BLOOD PRESSURE",
    "STROKE",
    "KIDNEY DISEASE",
  ];
  function handleChange(value) {
    console.log(value);
    setName(value);
  }
  const fetchDetails = async () => {
    try {
      //headers
      await Axios({
        url: `${server}/get-recommendation`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          disease: name,
        },
      })
        .then((res) => {
          setRecommended(res.data.res.recommended_foods);
          setNotRecommended(res.data.res.not_recommended_foods);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };
  return (
    <>
      <Layout className="layout">
        <Content className="form-cont">
          <Form {...formItemLayout} onFinish={fetchDetails}>
            <p
              style={{
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Select disease name
            </p>
            <Form.Item>
              <p>Diseases</p>
              <Select
                style={{ width: "100%" }}
                placeholder="Select a disease..."
                defaultValue={[]}
                optionLabelProp="label"
                onChange={handleChange}
              >
                {diseaseArray.map((disease, id) => (
                  <Option value={disease} label={disease}>
                    <div className="demo-option-label-item">{disease}</div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button className="mt-1" type="primary" htmlType="submit">
                Recommend
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
      <Layout className="layout">
        <Content className="list-cont">
          <Divider orientation="left" style={{ color: "green" }}>
            Recommended
          </Divider>
          <List
            size="large"
            header={<div>Following foods are safe for you.</div>}
            bordered
            dataSource={recommended}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider orientation="left" style={{ color: "red" }}>
            Not Recommended
          </Divider>
          <List
            size="large"
            header={<div>Following foods may not be safe for you.</div>}
            bordered
            dataSource={notRecommended}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Content>
      </Layout>
    </>
  );
};

export default Recommender;
