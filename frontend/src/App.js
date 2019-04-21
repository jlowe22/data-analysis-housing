import React from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import Result from './pages/Result';
import Survey from './pages/Survey';
import About from './pages/About';
import original_questions from './config/questions.json';
import fake_data from './config/fake_data.json';


const {Header, Footer, Content } = Layout;


class App extends React.Component{

  state = {
    questions: original_questions
  };

  handleFormChange = (changedFields) => {
    // props.form.setFieldsValue(changedFields)
    this.setState((oldState) => {
        const newQuestions = oldState.questions
        const changedKey = Object.keys(changedFields)[0]
        const idx = newQuestions.findIndex((element) => element.key === changedKey)
        newQuestions[idx] = changedFields[changedKey]
        console.log('new questions: ', newQuestions)
        return {
            questions: newQuestions
        }
    });
  }

  fillFakeData = () => {
    const sample = fake_data[Math.floor(Math.random() * fake_data.length)];
    const newQuestions = [...this.state.questions]
    sample.forEach( (item,idx) => {
      newQuestions[idx]['value'] = item
    })
    this.setState({questions: newQuestions})

  }

  render = () => {
    return (
      <Router forceRefresh={false}>
          <Layout>
            <Header>
              <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['/']}
                  style={{ lineHeight: '64px' }}
              >
                  <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
                  <Menu.Item key="/about"><Link to="/about">About</Link></Menu.Item>
                  <Menu.Item key="/survey"><Link to="/survey">Survey</Link></Menu.Item>
                  <Menu.Item key="/result"><Link to="/result">Result</Link></Menu.Item>
              </Menu>
            </Header>
            <Content >
              <Route exact path="/" component={Home} />
              <Route 
                path="/survey" 
                render={(props) => <Survey {...props} 
                                    questions={this.state.questions} 
                                    handleFormChange={this.handleFormChange}
                                    fillFakeData={this.fillFakeData}
                                    />}
              />
              <Route 
                path='/result' 
                render={(props) => <Result {...props} questions={this.state.questions} />} 
              />
              <Route path="/about" component={About} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Housing Price Prediction ©2018 created by Convergent Data Analysis 
            </Footer>
          </Layout>
      </Router>
    );
  }
}

export default App;

