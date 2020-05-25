import React, { Component } from 'react'
import axios from 'axios';

const Ocene = props => (
    <tr key={props._id}>{props.podaci.map((podatak,index) => {
    return <td key={index}> {podatak.oceneIzOvogPredmeta.join(', ')} </td>
    })}</tr>
)




export default class Statistika extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             predmeti: [],
             ucenik: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/ucenici/ucenik/'+this.props.match.params.id)
        .then(res => {
            this.setState({ predmeti: res.data.predmeti, ucenik: res.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }
  
    render() {
        return (
            <div className="container"> 
                <h2>{this.state.ucenik.ime} {this.state.ucenik.prezime}, {this.state.ucenik.godina}/{this.state.ucenik.odeljenje}</h2>
                <table className="table table-bordered table-striped">
                <thead >
                    <tr>
                        <th scope="row">Matematika</th>
                        <th scope="row">Srpski</th>
                        <th scope="row">Fizika</th>
                        <th scope="row">Engleski</th>
                        <th scope="row">Hemija</th>
                        <th scope="row">Informatika</th>
                        <th scope="row">Fizicko</th>
                        <th scope="row">Istorija</th>
                        <th scope="row">Geografija</th>
                        <th scope="row">Psihologija</th>  
                        <th scope="row">Sociologija</th>     
                    </tr>
                </thead>
                <tbody>
                <Ocene podaci={this.state.predmeti} />
                </tbody>
                </table>
          </div>
        )
    }
}
