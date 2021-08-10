import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, ListGroup} from 'react-bootstrap'
/* import {Card, CardTitle, CardMedia, CardText} from 'material-ui/core'; */


class App extends Component{

	constructor(props){
		super(props);
		this.state = {
			cargado1: false,
			encuesta: null,
			cargado2: false,
			idEncuesta: null
		};
		this.handleEncuesta = this.handleEncuesta.bind(this);
		this.handleFind = this.handleFind.bind(this);
	}

	//Métodos
	getEncuesta(id){
		fetch("https://hr3o4t2e2i.execute-api.us-east-2.amazonaws.com/find/" + id)
		// .then(res => res.json)
		.then(async result => {
			let aux = await result.json();
			if (aux != null){
				this.setState({
					cargado1: true,
					encuesta: aux.Item,
					cargado2: false,
				});
				console.log(aux);
			} else {
				this.setState({
					cargado1: true,
					encuesta: null,
					cargado2: false,
				});
				console.log(aux);
			}
		},
		(error) => {
			this.setState({
				cargado1: false,
				encuesta: null,
				cargado2: false,
			});
			console.log(error);
		})
	}

	// postEncuesta(obj){
	// 	fetch("https://hr3o4t2e2i.execute-api.us-east-2.amazonaws.com/add", {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(obj)
	// 	})
	// 	.then(res => res.json)
	// 	.then(
	// 		(result) => {
	// 			this.setState({
	// 				cargado1: false,
	// 				cargado2: true,
	// 			})
	// 			console.log(result);
	// 		},
	// 		(error) => {
	// 			this.setState({
	// 				cargado1: false,
	// 				encuesta: null,
	// 				cargado2: false,
	// 			});
	// 			console.log(error);
	// 		}
	// 	)
	// }

	// Imprimimos la encuesta elegida
	// encuestas(){
	// 	encuestas.map(enc=>{
	// 		return(
	// 		<div>
	// 			<ListGroup>
	// 				<ListGroup.Item>{enc.id}</ListGroup.Item>
	// 				<ListGroup.Item>{enc.titulo}</ListGroup.Item>
	// 				<ListGroup.Item>{enc.descripcion}</ListGroup.Item>
	// 			</ListGroup>
	// 		</div>
	// 		)
	// 	});
	// 	return encuestas;
	// }

	// Guarda el id escrito en el campo de texto
	handleEncuesta(e){
		console.log(e.target.value);
        this.setState({idEncuesta: e.target.value});
    }

	// Busca el id dentro de dynamo
	handleFind(){
		if(this.state.idEncuesta != ""){
			this.getEncuesta(this.state.idEncuesta);
			console.log(this.state.encuesta);
		}
	}

	render(){
		return(
			<Box display="flex">
			<div className="container">
				<div className="cardAux">
					<Form>
						<fieldset>
							<div className="icon-container">
								<legend>Buscar encuesta</legend>
								<img src="https://img.icons8.com/ios/50/000000/survey.png"/>
							</div>
							<Form.Group className="mb-3">
								<Form.Label>ID</Form.Label>
								<Form.Control type="text" onChange={this.handleEncuesta} placeholder="ID de encuesta a buscar" />
							</Form.Group>
							<Button onClick={this.handleFind} variant="outline-dark" type="button">
								Buscar
							</Button>
							<br></br>
							<br></br>
							<br></br>
							{this.state.cargado1 ? (
								this.state.encuesta!==undefined ? (
									<div className="row">
										<h5>Encuesta solicitada</h5>
										<div>
											<p>Titulo: {this.state.encuesta.titulo}</p>
											<p>Descripcion: {this.state.encuesta.descripcion}</p>
										</div>
									</div>
								):(
								<div className="row">
									<h5>Encuesta solicitada</h5>
									<h6>La encuesta no existe</h6>
								</div>
								)
							):(
								<p></p>
							)}
						</fieldset>
					</Form>
				</div>

				<div className="cardAux">
					{/* <Form>
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
					</Form> */}
				</div>
			</div>
		</Box>
		);
	}
}

export default App;
