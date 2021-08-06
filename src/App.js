import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap'


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
					<Form>
						<fieldset>
							<legend>Buscar encuesta</legend>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>ID</Form.Label>
								<Form.Control type="text" placeholder="ID de encuesta a buscar" />
							</Form.Group>
							<Button variant="dark" type="submit">
								Buscar
							</Button>
						</fieldset>
					</Form>
				</div>
				<div className="cardAux">
					<Form>
						<fieldset>
							<legend>Crear encuesta</legend>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Titulo</Form.Label>
								<Form.Control type="text" placeholder="Titulo de la encuesta" />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Descripcion</Form.Label>
								<Form.Control type="text" placeholder="Descripcion de la encuesta" />
							</Form.Group>
							<Button variant="dark" type="submit">
								Crear
							</Button>
						</fieldset>
					</Form>
				</div>
			</div>
		</Box>
		);
	}
}

export default App;
