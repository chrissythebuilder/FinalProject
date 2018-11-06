import React, { Component } from 'react';
import { Form, Text, Scope, TextArea, Option, Select } from 'informed';
import { RadioGroup, Radio, Form, Text, TextArea, Option, Select } from 'informed';
import './RegisForm.css';
import API from "../../utils/API";// to connect form to db


  const basicValidation = value => {
    return !value || value.length < 2 ? 'Field must be longer than two characters' : null;
  }

  const duplicateValidation = ( value, values ) => {
    return values.filter( v => v === value ).length > 1 ? 'This field must be unique.' : null;
  }

  const favthingValidation = ( value, values ) => {
    return basicValidation(value) || duplicateValidation( value, values.favthing )
  }


class RegisForm extends Component {

  state = {
    first_name:'',
    last_name:'',
    phone:'',
    email:'',
    password:'',
    twitterAccount:'',
    address:'',
    postalcode:'',
    province: '',
    favthings: '',
    interesthobby: '',
    personality:'',
    amountToSpend:0
  }

    constructor (){
        super ();

    this.handleClick = this.handleClick.bind(this);

    this.setFormApi = this.setFormApi.bind(this);

        this.state={
            value: '',
          displayValue: ''
        }

    }

    handleInputChange = (event) => {
      const { name, value } = event.target;
     this.setState({
       [name]: value
     });
    }

    handleClick = (event) => {
      event.preventDefault();

      let userData = {
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        phone:this.state.phone,
        email:this.state.email,
        password:this.state.password,
        twitterAccount:this.state.twitterAccount,
        address:this.state.address,
        postalcode:this.state.postalcode,
        province: this.state.province,
        favthings: this.state.favthings,
        interesthobby: this.state.interesthobby,
        personality:this.state.personality,
        amountToSpend:parseInt(this.state.amountToSpend)
      }
 console.log(evt.target.value);


      API.registerFn(this.state)
      .then(res => {
        console.log(res);
      });

        this.setState({
            displayValue: this.state.value,
            value: '',



        });
        console.log(this.formApi.getState());
        console.log(userData);

 //======================================================== add user data to db ==================
API.saveUser(userData).then((res)=>{
  console.log(res);

});
//======================================================== add user data to db  ==================
        

    }

    setFormApi(formApi) {
      this.formApi = formApi;
    }


    render() {
        //console.log('render', this.state.name);
        return (

      <div style={{margin:80,textAlign:"center"}}>
      <h3>REGISTRATION FORM</h3>
      <h4>Please enter your personal details below:</h4>
      <Form getApi={this.setFormApi} >

<div id = "registration-form">
    <h3> Giver's Personal Information: </h3>
      <Form>
        <div className = "question">
                <label htmlFor="first_name"> First Name: </label>
                <Text field="first_name" name="first_name" className="question-field" id="first_name"  validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
                
          </div>
          <div className = "question">
                <label htmlFor="last_name">Last name:</label>
                <Text field="last_name" name="last_name" className="question-field" id="last_name" validate={basicValidation}value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>
          <div className = "question">
                <label htmlFor="phone">Phone Number:</label>
                <Text field="phone" className="question-field" id="phone" placeholder="XXX-XXX-XXXX" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>
          <div className = "question">
                <label htmlFor="email">Email Address:</label>
                <Text field="email" className="question-field" id="email" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>
          <div className = "question">
                <label htmlFor="password"> Password:</label>
                <Text field="password" className="question-field" id="password" type="password" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>
          <div className = "question">
                <label htmlFor="twitterAccount">Twitter Account:</label>
                <Text field="twitterAccount" className="question-field" id="twitterAccount" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>
          
          <div className = "question">
                <label htmlFor="amountToSpend">Amount To Spend:</label>
                <Text field="amountToSpend" className="question-field" id="amountToSpend" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>

          <ul>
            <RadioGroup field="amountToSpend">
            <label>Amount to spend:   </label>
          <li>
              <Radio value="20" id="quant1" />
              <label htmlFor="radio1">$0 - $20</label>
          </li>
          <li>
              <Radio value="40" id="quant2" />
              <label htmlFor="radio2">$21 - $40</label>
          </li>
          <li>
              <Radio value="60" id="quant3" />
              <label htmlFor="radio3">$41 - $60</label>
          </li>
          <li>
              <Radio value="80" id="quant5" />
              <label htmlFor="radio4">$61 - $80</label>
          </li>
          <li>
              <Radio value="1000" id="quant6" />
              <label htmlFor="radio5">$81 - $110</label>
          </li>
            </RadioGroup>
          </ul>
          <div className = "question">
                <label htmlFor="address">Home Mailing Address:</label>
                <Text field="address" className="question-field" placeholder="Unit # / Street Name / City" id="address" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>
          <div className = "question">
                <label htmlFor="postalcode">Postal Code:</label>
                <Text field="postalcode" className="question-field" placeholder="X1XX1X" id="postalcode" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
          </div>
          <div className = "question"> 
            <label htmlFor="select-province"> Province:</label>
              <Select field="province" id="select-province" value={this.state.value} onChange={this.handleInputChange} v="true">
                  <Option value="" disabled> Select One...
                  </Option>
                      <Option value="ON">ON</Option>
                      <Option value="QC">QC</Option>
                      <Option value="NS">NS</Option>
                      <Option value="NB">NB</Option>
                      <Option value="MB">MB</Option>
                      <Option value="BC">BC</Option>
                      <Option value="PE">PE</Option>
                      <Option value="SK">SK</Option>
                      <Option value="AB">AB</Option>
                      <Option value="NL">NL</Option>
            </Select>
          </div>
    

    <h3> Interests &amp; Personality: </h3>

      <div>
            <label htmlFor="first_name">First name:</label>
            <Text field="first_name" name="first_name" id="first_name" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />

      </div>
      <div>
            <label htmlFor="last_name">Last name:</label>
            <Text field="last_name" name="last_name" id="last_name" validate={basicValidation}value={this.state.value} v="true" onChange={this.handleInputChange} />
      </div>
      <div>
            <label htmlFor="phone">Phone Number:</label>
            <Text field="phone" id="phone" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
      </div>
      <div>
            <label htmlFor="email">Email Address:</label>
            <Text field="email" id="email" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
      </div>
      <div>
            <label htmlFor="password"> Password:</label>
            <Text field="password" id="password" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
      </div>
      <div>
            <label htmlFor="twitterAccount">Twitter Account:</label>
            <Text field="twitterAccount" id="twitterAccount" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
      </div>
      <div>
            <label htmlFor="address">Home Mailing Address:</label>
            <Text field="address" id="address" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
      </div>
      <div>
            <label htmlFor="postalcode">Postal Code:</label>
            <Text field="postalcode" id="postalcode" validate={basicValidation} value={this.state.value} v="true" onChange={this.handleInputChange} />
      </div>
      <div>
        <label htmlFor="select-province">Province:</label>
          <Select field="province" id="select-province" value={this.state.value} onChange={this.handleInputChange} v="true">
              <Option value="" disabled> Select One...
              </Option>
                  <Option value="ON">ON</Option>
                  <Option value="QC">QC</Option>
                  <Option value="NS">NS</Option>
                  <Option value="NB">NB</Option>
                  <Option value="MB">MB</Option>
                  <Option value="BC">BC</Option>
                  <Option value="PE">PE</Option>
                  <Option value="SK">SK</Option>
                  <Option value="AB">AB</Option>
                  <Option value="NL">NL</Option>
        </Select>
      </div>


<h3>Tell us about yourself! The next section is to help your match figure out what to get you!</h3>

  <div>
    <h4>Please tell us 5 of your favourite things in the text box below, separate them with a ',':</h4>
    <TextArea field="favthings" id="favthings" value={this.state.value} v="true" onChange={this.handleInputChange} />
  </div>


  <div>
    <h4>Please tell us 5 of your interests or hobbies in the text box below, separate them with a ',':</h4>
    <TextArea field="interesthobby" id="interesthobby" value={this.state.value} v="true" onChange={this.handleInputChange} validate={favthingValidation} />
  </div>

<div>
   <label htmlFor="personality"> <h4>Please type at least 100 words and tell us about yourself, this information will be used to generate a personality profile for your match:</h4></label>
  <TextArea field="personality" id="personality" value={this.state.value} v="true" onChange={this.handleInputChange} validate={favthingValidation} />
</div>

<div>
  <button type="submit" onClick={this.handleClick}>
    Submit
  </button>
  </div>
  <div><p></p></div>


</Form>
</div>

        );
    }
}

export default RegisForm;
