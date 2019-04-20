import React from 'react'
import { Form, Input, Row, Col, } from 'antd';
import original_questions from '../config/questions.json';

const CustomizedForm = Form.create({
  name: 'survey',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const fields = {}
    props.questions.forEach( (question) => {
        const {key} = question;
        fields[key] = Form.createFormField({
            ...question,
            value: question.value
        })
    })
    return fields
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="vertical">
        {props.questions.map( (question) => {
            const {key, prompt} = question
            return (
                <Form.Item key={key} label={prompt}>
                    {getFieldDecorator(key, {
                    rules: [{ required: true, message: key + ' is required!' }],
                    })(<Input />)}
                </Form.Item>
            )
        })
        }
    </Form>
  );
});

export default class Survey extends React.Component {
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
        return {
            questions: newQuestions
        }
    });
  }

  render() {
    const questions = this.state.questions;
    return (
        <div style={{textAlign: 'center'}}>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={4}>
                    <CustomizedForm 
                        questions={questions} 
                        onChange={this.handleFormChange} 
                    />
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={10}>
                <pre className="language-bash" style={{textAlign:'left'}}>
                {JSON.stringify(questions, null, 2)}
                </pre>
                </Col>
            </Row>
            
        </div>
    );
  }
}