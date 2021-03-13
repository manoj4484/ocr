import React, { useState } from "react";
import { Form, Button, Input, Layout, Tag, Progress } from "antd";
import { createWorker } from "tesseract.js";
import { Select } from "antd";
import Axios from "axios";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { server } from "../server";

const { Option } = Select;

const { Content } = Layout;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
function OcrScanner() {
  const diseaseArray = [
    "DIABETES",
    "HEART DISEASE",
    "BLOOD PRESSURE",
    "STROKE",
    "KIDNEY DISEASE",
  ];
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [disease, setDisease] = useState([]);
  const [ocr, setOcr] = useState("");
  const [protein, setProtein] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fats, setFats] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [calories, setCalories] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [recommended, setRecommended] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [detected, setDetected] = useState(false);
  const [openScanner, setOpenScanner] = useState(false);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const worker = createWorker({
    logger: (m) => {
      if (m.status === "recognizing text") {
        setPercentage(m.progress * 100);
      }
      console.log(m);
    },
  });

  const imagePicker = async (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  function handleChange(value) {
    console.log(value);
    setDisease(value);
  }

  const handleGender = (value) => {
    setGender(value);
  };

  const handleRecommendation = async () => {
    if (!name || !age || age === 0 || !gender || !disease) {
      return alert("Name, Age and Gender are required fields");
    }
    try {
      await Axios({
        url: `${server}/decide-recommendation`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          diseases: disease,
          protein: parseFloat(protein).toString(),
          carbohydrates: parseFloat(carbohydrates).toString(),
          sugar: parseFloat(sugar).toString(),
          fats: parseFloat(fats).toString(),
          calories: parseFloat(calories).toString(),
        },
      })
        .then((res) => {
          if (res.data.res === "recommended") {
            setRecommended(true);
            setSubmitted(true);
          } else {
            setRecommended(false);
            setSubmitted(true);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const doOCR = async () => {
    try {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(image);
      setOcr(text.split(" "));
      setProtein(
        parseFloat(
          text.slice(text.search(/protein/i) + 8, text.search(/protein/i) + 11)
        )
      );
      setCarbohydrates(
        parseFloat(
          text.slice(
            text.search(/carbohydrates/i) + 13,
            text.search(/carbohydrates/i) + 18
          )
        )
      );
      setSugar(
        parseFloat(
          text.slice(text.search(/sugar/i) + 6, text.search(/sugar/i) + 9)
        )
      );
      setFats(
        parseFloat(text.slice(text.search(/fat/i) + 4, text.search(/fat/i) + 7))
      );
      setCalories(
        parseFloat(
          text.slice(
            text.search(/calories/i) + 8,
            text.search(/calories/i) + 13
          )
        )
      );
      setScanning(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    setScanning(true);
    doOCR();
  };

  return (
    <>
      <Layout className="layout">
        <Content className="form-cont">
          {parseInt(percentage) > 0 && parseInt(percentage) < 100 ? (
            <Progress percent={parseInt(percentage)} className="progress" />
          ) : null}

          <Form {...formItemLayout} onFinish={onFinish}>
            <p
              style={{
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Enter the details
            </p>
            <Form.Item style={{ marginTop: "20px" }}>
              <p>Name</p>
              <Input
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <p>Age</p>
              <Input
                type="number"
                required={true}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <p>Gender</p>
              <Select
                mode="single"
                style={{ width: "100%" }}
                placeholder="Select Gender..."
                defaultValue={[]}
                optionLabelProp="label"
                onChange={handleGender}
              >
                <Option value="Male" label="Male">
                  <div className="demo-option-label-item">Male</div>
                </Option>
                <Option value="Female" label="Female">
                  <div className="demo-option-label-item">Female</div>
                </Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <p>Diseases</p>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select Diseases..."
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
              <input
                type="file"
                name="image"
                id="imagepicker"
                accept="image/*"
                multiple={false}
                onChange={(e) => {
                  imagePicker(e);
                }}
                required={true}
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="mt-1"
                type="primary"
                htmlType="submit"
                // onClick={handelSubmit}
                disabled={scanning}
              >
                {scanning ? "Scanning please wait..." : "Scan"}
              </Button>
            </Form.Item>
            <Form.Item>
              <p>OR</p>
            </Form.Item>
            {openScanner && !detected ? (
              <>
                <Form.Item id="scanner">
                  <BarcodeScannerComponent
                    width={500}
                    height={500}
                    onUpdate={(err, result) => {
                      if (result) {
                        setResult(result.text.split("-"));
                        setProtein(result.text.split("-")[0]);
                        setCarbohydrates(result.text.split("-")[1]);
                        setFats(result.text.split("-")[2]);
                        setSugar(result.text.split("-")[3]);
                        setCalories(result.text.split("-")[4]);
                        setDetected(true);
                        setOpenScanner(false);
                      }
                    }}
                  />
                </Form.Item>
                <p>Detecting...</p>
              </>
            ) : null}
            {!openScanner && !detected ? (
              <Button
                className="mt-1"
                type="primary"
                onClick={() => setOpenScanner(true)}
                disabled={scanning}
              >
                Scan Barcode
              </Button>
            ) : (
              <Button
                className="mt-1"
                type="danger"
                onClick={() => setOpenScanner(false)}
                disabled={scanning}
              >
                Close QR scanner
              </Button>
            )}

            <Form.Item style={{ marginTop: "25px" }}>
              {" "}
              {detected ? (
                <Tag color="success">
                  <snap style={{ fontSize: "20px" }}>Detected</snap>
                </Tag>
              ) : null}
            </Form.Item>
          </Form>
        </Content>
      </Layout>
      <Layout className="layout">
        <Content className="list-cont">
          <div style={{ marginBottom: "20px" }}>
            {submitted ? (
              recommended ? (
                <Tag
                  style={{ padding: "10px", fontSize: "30px" }}
                  color="success"
                >
                  <snap style={{ fontSize: "30px" }}>Recommended</snap>
                </Tag>
              ) : (
                <Tag
                  style={{ padding: "10px", fontSize: "30px" }}
                  color="error"
                >
                  <snap style={{ fontSize: "30px" }}>Not Recommended</snap>
                </Tag>
              )
            ) : null}
          </div>
          <Form {...formItemLayout} onFinish={handleRecommendation}>
            <p
              style={{
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              OCR readings
            </p>
            <Form.Item style={{ marginTop: "20px" }}>
              <p>Calories (kcal)</p>
              <Input
                required={true}
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <p>Protein (gm)</p>
              <Input
                required={true}
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <p>Carbohydrates (gm)</p>
              <Input
                required={true}
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <p>Fats (gm)</p>
              <Input
                required={true}
                value={fats}
                onChange={(e) => setFats(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ marginTop: "20px" }}>
              <p>Sugar (gm)</p>
              <Input
                required={true}
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
              />
            </Form.Item>
            <p>
              <span style={{ color: "red" }}>*</span>Manually add values where
              you see NaN/Wrong Value after scanning.
            </p>

            <Form.Item>
              <Button className="mt-1" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
      {/*list component */}
    </>
  );
}

export default OcrScanner;
