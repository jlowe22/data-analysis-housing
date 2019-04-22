import React from "react";
import { Typography, Divider, Layout,Menu, Breadcrumb } from 'antd';

const {Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default class Result extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            price: undefined
        }
    }

    componentDidMount() {
        const in_data = this.props.questions.reduce( (data,question) => {
            data[question['key']] = question['value']
            return data
        }, {})
        fetch('https://us-central1-housing-233718.cloudfunctions.net/bayes_ridge',{
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(in_data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log('GCF result: ', result)
                    this.setState({price: result.toLocaleString("en-US",{style:"currency",currency:"USD"})})
                }
            )
    }

    render(){
        return (
            <div style={{textAlign: 'center'}}>
                <div style={{height:100}}></div>
                <Title level={3}>Your price estimate is...</Title>
                {this.state.price && <Title level={2}> {this.state.price}</Title>}
            </div>
        );
    }
}