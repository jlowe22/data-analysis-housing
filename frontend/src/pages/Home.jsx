import React from "react";
import { Typography, Row, Col, Button } from 'antd';

const { Title, Paragraph, Text } = Typography;

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class Home extends React.Component {
    render(){
        return (
            <div style={{ textAlign: 'center' }}>
                <Row type="flex" justify="space-around" align="middle">
                    <Title>Pr<span style={{color:'#1575BF',textShadow:'2px 2px 2px #558ABB'}}>AI</span>ce</Title>
                </Row>
                <Row>
                    <Title level={4}>Intelligently Predict Austin Housing Prices</Title>
                </Row>
                <Row>
                    <Button size={"large"} onClick={(e) => {
                        e.preventDefault()
                        this.props.history.push('/survey')
                    }}>Get Started</Button>
                </Row>
            </div>
            
            
        )
    }
}