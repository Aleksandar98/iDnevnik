import React, { Component } from 'react'
import Slika from '../slika1.png'
import axios from 'axios';

const Ucenik = props => (
    <div className="row">
        {props.ucenici.map(ucenik => {
            return     <div key={ucenik._id} className="col-md-4">  
            <div className="thumbnail">
                <img src={Slika} style={{height:"200px"}}  alt="slika" />
                <div className="caption">
                    <h3>{ucenik.ime} {ucenik.prezime}</h3>
                    <h5>Odeljenje: {ucenik.godina}/{ucenik.odeljenje}</h5>
                    <p><a href="#" className="btn btn-primary" role="button">Dodaj ocenu</a> <a href={'/Statistika/'+ucenik._id} className="btn btn-default" role="button">Vidi statistiku</a></p>
                </div>
            </div>
        </div> 
        })}
    </div>
)

export default class Odeljenje extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ucenici: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/ucenici/'+this.props.match.params.god+'/'+this.props.match.params.ode)
        .then(res => {
            this.setState({ ucenici: res.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    render() {
        return (
            <div className="container" style={{marginTop:"30px"}}>
                <div className="row">
                     <Ucenik ucenici={this.state.ucenici} />
                </div>
            </div>
        )
    }
}

