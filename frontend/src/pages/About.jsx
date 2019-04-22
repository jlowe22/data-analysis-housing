import React from "react";
import { Typography, Divider, Layout, Avatar } from 'antd';

const {Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class About extends React.Component {
    render(){
        return (
            <div style={{textAlign:'center'}}>
                <Title level={2}>About</Title>
                <Paragraph>
                    PrAIce is a housing price prediction model that uses classical machine learning methods to predict house prices in Austin.
                </Paragraph>
            </div>
            
        );
    }
}