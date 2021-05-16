import React, { Component } from "react";

class InputForm extends  React.Component {
	render(){
		return (
			<div className='InputForm'>
				<input 
				className='input' 
				type={this.props.type}
				placeholder={this.placeholder}
				value={this.value} onChange={ (e)=> this.props.onChange(e.target.value) }
				
				/>
			</div>
		)
	}
}
export default InputForm;
