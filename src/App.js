import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, ListGroup} from 'react-bootstrap'
import data from './requests/encuestas';
/* import {Card, CardTitle, CardMedia, CardText} from 'material-ui/core'; */


class App extends Component{

	constructor(props){
		super(props);
		this.state = {
			encuestas: [],
			cargado: false, // variable de estado
			idEncuesta: null
		};
	}

	//Métodos
	encuestas(){
		let encuestas = data.encuestas.map(enc=>{
			return(
			<div>
				<ListGroup>
					<ListGroup.Item>{enc.id}</ListGroup.Item>
					<ListGroup.Item>{enc.titulo}</ListGroup.Item>
					<ListGroup.Item>{enc.descripcion}</ListGroup.Item>
				</ListGroup>
			</div>
			)
		});
		return encuestas;
	}
/* 	// Guarda el id escrito en el campo de texto
	handleEncuesta(e){
        if(idEncuesta !== "") this.setState({idEncuesta: e.target.value});
    }
	// Busca y verifica el id dentro de la lista de de encuestas
	handleFind(e){
		let aux = encuestas.filter(x => x.id == e.target.idEncuesta).map(y =>{
			return(
				<div>
					<p>{y.titulo}</p>
					<p>{y.descripcion}</p>
				</div>	
			);
		})
		return aux;
	} */


	render(){
		return (
			<Box display="flex">
			<div className="container">
				<div className="cardAux">
					<Form>
						<fieldset>
							<div className="icon-container">
								<legend>Buscar encuesta</legend>
								<img src="https://img.icons8.com/ios/50/000000/survey.png"/>
								{/* <a href="https://icons8.com/icon/4194/survey">Survey icon by Icons8</a> */}
							</div>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>ID</Form.Label>
								<Form.Control type="text" /* onChange={this.handleEncuesta} */ placeholder="ID de encuesta a buscar" />
							</Form.Group>
							<Button /* id={idEncuesta} onClick={this.handleFind} */ variant="outline-dark" type="submit">
								Buscar
							</Button>
							<br></br>
							<br></br>
							<br></br>
							<div className="row">
								<h5>Encuestas</h5>
                                {this.encuestas()}
                            </div>
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
