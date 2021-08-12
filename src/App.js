import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Alert} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';

class App extends Component{

	constructor(props){
		super(props);
		this.state = {
			cargado1: false,
			encuesta: null,
			cargado2: false,
			idEncuesta: 0,
			titleEncuesta: null,
			descriptionEncuesta: null,
			error1: 0,
			error2: 0
		};
		this.handleEncuesta = this.handleEncuesta.bind(this);
		this.handleFind = this.handleFind.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handleAppend = this.handleAppend.bind(this);
	}

	//--------------//
	// Métodos CRUD //
	//--------------//

	getEncuesta(id){
		fetch("https://hr3o4t2e2i.execute-api.us-east-2.amazonaws.com/find/" + id)
		.then(async result => {
			let aux = await result.json();
			if (aux != null){
				this.setState({
					cargado1: true,
					encuesta: aux.Item,
				});
				console.log(aux);
			} else {
				this.setState({
					cargado1: true,
					encuesta: null,
				});
				console.log(aux);
			}
		},
		(error) => {
			this.setState({
				cargado1: false,
				encuesta: null,
				error1: 1
			});
			console.log(error);
		})
	}

	getAllEncuesta(){
		fetch("https://hr3o4t2e2i.execute-api.us-east-2.amazonaws.com/view")
		.then(async result => {
			let enc = await result.json();
			const payload = {
				id: enc.Count + 1,
				titulo: this.state.titleEncuesta,
				descripcion: this.state.descriptionEncuesta
			}
			return payload;
		},
		(error) => {
			this.setState({
				error2: 1
			});
			console.log(error);
		})
	}

	addEncuesta(datos){
		fetch("https://hr3o4t2e2i.execute-api.us-east-2.amazonaws.com/add", {method:'PUT', body: JSON.stringify(datos)})
		.then( async (resp) => {
			const response = await resp.json();
			console.log(response);
			this.setState({
				cargado2: true,
			})
		},
		(error) => {
			this.setState({
				error2: 1,
				cargado2: false,
			});
			console.log(error);
		})
	}

	//---------------------------------------//
	// Funciones modificadoras de parametros //
	//---------------------------------------//

	// Guarda el id escrito en el campo de texto
	handleEncuesta(e){
        this.setState({idEncuesta: e.target.value});
    }

	// Guarda el titulo escrito en el campo de texto
	handleTitle(e){
        this.setState({titleEncuesta: e.target.value});
    }

	// Guarda la descripcion escrita en el campo de texto
	handleDescription(e){
        this.setState({descriptionEncuesta: e.target.value});
    }

	//--------------------//
	// Funciones de envio //
	//--------------------//

	// Busca el id dentro de dynamo
	handleFind(){
		if(this.state.idEncuesta !== ""){
			this.getEncuesta(this.state.idEncuesta);
		} else {
			this.setState({error1: 2});
		}
	}

	// Agrega una nueva encuesta
	handleAppend(){
			if(this.state.titleEncuesta !== "" && this.state.descriptionEncuesta !== ""){
				try {
					const auxiliar = this.getAllEncuesta();
					this.addEncuesta(auxiliar);
				} catch (error) {
					this.setState({error2: 1});
				}
			} else {
				this.setState({error2: 2});
			}
	}

	//--------//
	// Render //
	//--------//

	render(){
		return(
			<Box display="flex">
				<div className="container">
					<div className="cardAux">
						<h3>Buscar encuesta</h3>
						<fieldset>
							<div className="formCell-container">
								<span className="icon-form">ID</span>
								<input type="text" onChange={this.handleEncuesta} placeholder="ID de encuesta a buscar" />
							</div>
							<button className="searchButton" onClick={this.handleFind} type="button">
								<SearchIcon style={{ fill: '#C6C9CC' }}></SearchIcon>
							</button>
							<br></br>
							<br></br>
							<br></br>
							{this.state.cargado1 ? (
								this.state.encuesta!==undefined ? (
									<div>
										<h4>Encuesta solicitada</h4>
										<div className="cardResponse">
										<Card className="cardFormat">
											<Card.Img variant="top" className="cardImage" style={{width: "20%"}} src="https://img.icons8.com/ios/50/000000/survey.png" />
											<Card.Body>
												<Card.Title>Titulo: {this.state.encuesta.titulo}</Card.Title>
												<Card.Text>
													Descripcion: {this.state.encuesta.descripcion}
												</Card.Text>
											</Card.Body>
										</Card>
										</div>
									</div>
								):(
								<div className="alertContainer">
									<h4>Encuesta solicitada</h4>
									<Alert variant="danger">
										<b>La encuesta no existe</b>
									</Alert>
								</div>
								)
							):(
								<p></p>
							)}
						</fieldset>
					</div>

					<div className="cardAux">
						<h3>Crear encuesta</h3>
						<fieldset>
							<div className="formCell-container2">
								<span className="icon-form">T</span>
								<input type="text" onChange={this.handleTitle} placeholder="Título de la encuesta" />
							</div>
							<div className="formCell-container2">
								<span className="icon-form">D</span>
								<input type="text" onChange={this.handleDescription} placeholder="Descripción de la encuesta" />
							</div>
							<Button onClick={this.handleAppend} variant="secondary" type="button">
								Crear
							</Button>
						</fieldset>
						<br></br>
						<br></br>
						<br></br>
						{this.state.cargado2 ? (
							<p>Agregado correctamente</p>
						):(
							<p></p>
						)}
					</div>
				</div>
			</Box>
		);
	}
}

export default App;
