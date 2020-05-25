import React, { Component } from 'react'
import axios from 'axios';
import {Nav} from './Nav'

export class Profesor extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             ucenici: [],
             podaciLogovanogProfesora: this.props.location.state.podaciProfesor
             
        }

        
    }

    componentDidMount() {
        axios.get('http://localhost:8080/ucenici')
        .then(res => {
            this.setState({ ucenici: res.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }




    
    render() {
        return (
            <div>
                <Nav profesor={this.state.podaciLogovanogProfesora}>
                </Nav>
                <div className='container'>
                
                </div>
            </div>
        )
    }
}

export default Profesor


