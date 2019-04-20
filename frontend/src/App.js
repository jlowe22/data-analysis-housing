import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Result from './pages/Result';
import Survey from './pages/Survey';
import About from './pages/About';

const {Header, Footer, Content } = Layout;


function App() {
  return (
    <Router>
        <Layout>
          <Header>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="/about"><Link to="/about">About</Link></Menu.Item>
                <Menu.Item key="/survey"><Link to="/survey">Survey</Link></Menu.Item>
            </Menu>
          </Header>
          <Content >
            <Route exact path="/" component={Home} />
            <Route path="/survey" component={Survey} />
            <Route path='/result' component={Result} />
            <Route path="/about" component={About} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Housing Price Prediction ©2018 created by Convergent Data Analysis 
          </Footer>
        </Layout>
    </Router>
  );
}
export default App;

