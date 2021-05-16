import React, { Component } from "react";
import {observer} from 'mobx-react';
import { configure } from "mobx";

import { Switch, Route, Link } from "react-router-dom";
import UserStore from './UserStore';
import LoginForm from './LoginForm';
import InputForm from './InputForm';
import SubmitButton from './SubmitButton';
import TutorialDataService from "./services/tutorial.service";


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";


class App extends Component {

	
	async componentDidMount(){
		try{


			TutorialDataService.isLoggedIn()
			  .then(response => {
				  if(response.data.success){
						UserStore.loading = false;
						UserStore.isLoggedIn = true;
						UserStore.username = response.data.username;
					}else{
						UserStore.loading = false;
						UserStore.isLoggedIn = false;
					}
				console.log(response.data);
			  })
			  .catch(e => {
				console.log(e);
			  });

			/*
			 //~ let res = await fetch(TutorialDataService.isLoggedIn(),{
			  let res = await fetch('http://192.168.90.103:8080/api/tutorials/isLoggedIn',{
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-type':'application/json',
					'Referrer-Policy': 'no-referrer'
				}
			});

			let result = await res.json();

			if(result && result.success){
				UserStore.loading = false;
				UserStore.isLoggedIn = true;
				UserStore.username = result.username;
			}else{
				UserStore.loading = false;
				UserStore.isLoggedIn = false;
			}*/
		}
		catch(e){
			UserStore.loading = false;
			UserStore.isLoggedIn = false;
		}
		
	}

	async doLogout(){
		try{
			let res = await fetch('/Logout',{
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-type':'application/json'
				}
			});
			let result = await res.json();
			
			if(result && result.success){
				UserStore.isLoggedIn = false;
				UserStore.username = '';
			}
		}
		catch(e){
			console.log(e);
		}
	}

	
  render() {
	  if(UserStore.loading){
		return(
			<div className="app">
				waiting..Login Form Creatingg..
			</div>
		);

	}else{
		if(UserStore.isLoggedIn){
			    return (
				  <div>
					<nav className="navbar navbar-expand navbar-dark bg-dark">
					  <Link to={"/tutorials"} className="navbar-brand">
						Sezer Market ({})
					  </Link>
					  <div className="navbar-nav mr-auto">
						<li className="nav-item">
						  <Link to={"/tutorials"} className="nav-link">
							Customers
						  </Link>
						</li>
						<li className="nav-item">
						  <Link to={"/add"} className="nav-link">
							Add
						  </Link>
						</li>
					  </div>
					</nav>

					<div className="container mt-3">
					  <Switch>
						<Route exact path={["/", "/tutorials"]} component={TutorialsList} />
						<Route exact path="/add" component={AddTutorial} />
						<Route path="/tutorials/:id" component={Tutorial} />
					  </Switch>
					</div>
				  </div>
				);
		}
		return(
			<div className="app">
			 <LoginForm/>
			</div>
		);
	}
  }
}


export default observer(App);
