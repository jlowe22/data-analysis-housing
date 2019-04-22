import React from "react";
import { Typography, Layout,Menu, Breadcrumb } from 'antd';
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom';

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
        if (this.props.questions.some( (item) => item.value === "")){
            return (
                <div style={{textAlign: 'center'}}>
                    <div style={{height:50}}></div>
                    <Title level={3}> Please finish filling out our survey in the <Link to="/survey">survey tab</Link>.</Title>
                </div>
            )
        } else if (this.state.price == undefined){
            return (
                <div style={{textAlign: 'center'}}>
                    <div style={{height:50}}></div>
                    <Loader 
                        type="Puff"
                        color="#00BFFF"
                        height="100"	
                        width="100"
                    /> 
                </div>
            )
        } else {
            return (
                <div style={{textAlign: 'center'}}>
                    <div style={{height:50}}></div>
                    <Title level={3}>Your price estimate is...</Title>
                    <Title level={2}> {this.state.price}</Title>
                </div>
            );
        }
        
    }
}