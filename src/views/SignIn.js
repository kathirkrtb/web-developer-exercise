import React, { Component } from 'react'
import  '../assets/css/Login.css'

// Load form components
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';


class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            inputs: {
                email:'',
                password:''
            },
            errors: {},
            submitted: false
        }
  
  
      };

    handleOnChange=(e)=>{
        let inputs = this.state.inputs;
        inputs[e.target.name] = e.target.value;
        this.setState({
            inputs
        });
    }

    handleSubmit=(e)=>{
        
        e.preventDefault();

        if (this.validateForm()) {

            this.setState({
                submitted: true
            });

            const {email,password} = this.state.inputs;

            // post form data to api

            let formData={
                email,
                password
            }

            fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).catch(err => {
                this.setState({
                    submitted: false
                });
            })      

            

        }

    }


    validateForm() {

        let inputs = this.state.inputs;
        let errors = {};
        let formIsValid = true;

        if (!inputs["email"]) {
            formIsValid = false;
            errors["email"] = "Please enter your email.";
        }else{
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(inputs["email"])) {
                formIsValid = false;
                errors["email"] = "Please enter valid email.";
            }
        }


        if (!inputs["password"]) {
            formIsValid = false;
            errors["password"] = "Please enter your password.";
        }

        this.setState({
            errors: errors
        });

        return formIsValid;


    }


    render() {

        const {submitted,inputs,errors}=this.state;

        return (
            <div className='box'>
                <h2 className="text-center">Sign in</h2>                
                <div className="padding margin">
                    <div className="form-group">
                        <Input name="email" type="text" value={inputs.email}  onChange={this.handleOnChange} label="Email" className="form-input" required={true} />
                        {
                            errors.email &&
                            <div className="errors">{this.state.errors.email}</div>
                        }
                        
                    </div>
                    
                    <div className="form-group">
                        <Input name="password" type="password"  onChange={this.handleOnChange} label="Password" className="form-input" required={true} />

                        {
                            errors.password &&
                            <div className="errors">{this.state.errors.password}</div>
                        }
                        
                    </div>

                    <div className="pt">
                        <Checkbox name="remember"  onChange={this.handleOnChange} label="Remember Me?" className="form-input" required={true} />
                    </div>

                    <div className="pt">
                        <Button type="submit"  onClick={this.handleSubmit} label={submitted ? 'Signing in..':"Sign in"} className="btn btn-success" disabled={submitted} />
                    </div>

                </div>


                <div className="text-center margin"> 

                        <p>
                            <a href="/"> <b>Forget your password?</b></a>
                        </p>
                        
                        <p>
                            <span>Dont have account?</span>
                            <a href="/" style={{paddingLeft:'5px'}}> 
                                <b>Sign up</b>
                            </a>
                        </p>

                        <p>
                            <a href="/"><b> <u>Resend email confirmation </u></b></a>
                        </p>

                </div>
               
            </div>
        )
    }
}


export default SignIn;
