import React from "react";
import { Typography, Divider, Layout,Row, Col, Breadcrumb } from 'antd';

const {Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class Home extends React.Component {
    render(){
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Home</h1>
                <p>Align Center</p>
                <Row type="flex" justify="space-around" align="middle">
                <Col span={4}><DemoBox value={100}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={50}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={120}>col-4</DemoBox></Col>
                <Col span={4}><DemoBox value={80}>col-4</DemoBox></Col>
                </Row>
            </div>
            
            
        )
    }
}