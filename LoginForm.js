import React, { Component } from "react";
import UserStore from './UserStore';
import InputForm from './InputForm';
import SubmitButton from './SubmitButton';
import TutorialDataService from "./services/tutorial.service";



class LoginForm extends  React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:'',
			buttonDisabled:false
		}
	}
	
	setInputValue(property,val){
			val = val.trim();
		
			this.setState({
				[property]:val
			});
		}

		resetForm(){
			this.setState({
				username:'',
				password:'',
				buttonDisabled:false,
			});
		}

		async doLogin(){

			if(!this.state.username){
				return;
			}
			if(!this.state.password){
				return;
			}
			this.setState({
				buttonDisabled:false
			});
			
			try{

				var data = {
				  username: this.state.username,
				  password: this.state.password
				};

				TutorialDataService.login(data)
				.then(response => {
					if(response.data.success){
						UserStore.isLoggedIn = true;
						UserStore.username = response.data.username;
					}else{
						this.resetForm();
						alert(response.data.msg);
					}
				})
				  
				/*
				let res = await fetch('http://192.168.90.103:8080/api/tutorials/login',{
					method: 'post',
					headers: {
						'Accept': 'application/json',
						'Content-type':'application/json',
						'Referrer-Policy': '*'
					},
					body: JSON.stringify({
						username:this.state.username,
						password:this.state.password
					})
				});
				
				let result = await res.json();
				if(result && result.success){
					
					
					
					UserStore.isLoggedIn = true;
					UserStore.username = result.username;
				}
				else if(result.success === false){
					this.resetForm();
					alert(result.msg);
				}*/
			}
			catch(e){
				console.log(e);
				this.resetForm();
			}
		}


	render(){
		return (
			<div className='LoginForm'>
				Login In
				<InputForm
					type='text'
					placeholder='Username'
					value={this.state.username ? this.state.username : ''}
					onChange={(val)=>this.setInputValue('username',val)}
				/>
				Password
				<InputForm
					type='password'
					placeholder='Password'
					value={this.state.username ? this.state.password : ''}
					onChange={(val)=>this.setInputValue('password',val)}
				/>
				<SubmitButton
					text='Login'
					disabled={this.state.buttonDisabled}
					onClick={()=>this.doLogin()}
				/>
			</div>
		)
	}
}
export default LoginForm;
