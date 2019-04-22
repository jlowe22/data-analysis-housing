import React from 'react'
import { Form, Input, Row, Col, Button } from 'antd';


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
    <Form layout="vertical" onSubmit={(e) => {
      e.preventDefault()
      props.history.push('/result')
    }}>
        {props.questions.map( (question) => {
            const {key, prompt, validation} = question
            return (
                <Form.Item key={key} label={prompt}>
                    {getFieldDecorator(key, {
                    rules: [
                      { required: true, message: key + ' is required!' },
                      {...validation, transform: (value) => parseInt(value,10)}],
                    
                    })(<Input />)}
                </Form.Item>
            )
        })
        }
        {/* <Button type="primary" htmlType="submit" className="login-form-button" onSubmit={e => {
          e.preventDefault()
          console.log('submitted: ', this.props.questions)
          }}>
            Submit
        </Button> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onSubmit={(e) => {console.log('')}}
          >
            Log in
          </Button>
        </Form.Item>
    </Form>
  );
});

export default class Survey extends React.Component {

  render() {
    const {handleFormChange, questions, history, fillFakeData} = this.props;
    return (
        <div style={{textAlign: 'center'}}>
            <Row style={{paddingBottom: 20, paddingTop: 20}}>
              <Button type="primary" onClick={fillFakeData}>
                Generate Fake Data
              </Button>
            </Row>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={10}>
                    <CustomizedForm 
                        questions={questions} 
                        onChange={handleFormChange}
                        history={history}
                    />
                </Col>
            </Row>
            {/* <Row type="flex" justify="space-around" align="middle">
                <Col span={10}>
                <pre className="language-bash" style={{textAlign:'left'}}>
                {JSON.stringify(questions, null, 2)}
                </pre>
                </Col>
            </Row> */}
            
        </div>
    );
  }
}