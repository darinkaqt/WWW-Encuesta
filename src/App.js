import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import './App.css';


class App extends Component{

	constructor(props){
		super(props);
		this.state = {
			encuestas: [],
			cargado: false // variable de estado
		};
	}

	render(){
		return (
			<Box display="flex">
			<div className="container">
				<div className="cardAux">
				
				</div>
				<div className="cardAux">
					a
				</div>
			</div>
		</Box>
		);
	}
}

export default App;
