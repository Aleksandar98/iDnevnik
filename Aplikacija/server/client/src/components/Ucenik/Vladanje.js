import React, { Component } from "react"
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

class Vladanje extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: "staro",
            idDeteta:"staro"
        }

        // this.componentDidMount = this.componentDidMount.bind(this);
        this.getRoditelj = this.getRoditelj.bind(this);
        this.getDete = this.getDete.bind(this);
    }

    
   // componentDidMount () {
        // this.callApi();
        // fetch("http://localhost:5000/Zdravko")
        //     .then(res => res.json()
        //         .then(json => { this.setState({ response: json })})
        // );     
    //}
    
    getRoditelj() {
        // if (this.props.infoKorisnika.username != null)
        // {
        //     axios.post('http://localhost:5000/vratiRoditelja', { email: this.props.infoKorisnika.username })
        //     .then(res => this.setState({ idDeteta: res.data.Deca }))
        // .catch(err => console.log(err))
        // }
        if (this.props.infoKorisnika.username != null && this.props.infoKorisnika.type == "ucenik")
        {
            axios.post('http://localhost:5000/vratiDete', { email: this.props.infoKorisnika.username })
                .then(res => this.setState({ idDeteta: res.data._id }))
                .catch(err => console.log(err))
        }

        else if (this.props.infoKorisnika.username != null)
        {
            axios.post('http://localhost:5000/vratiRoditelja', { email: this.props.infoKorisnika.username })
            .then(res => this.setState({ idDeteta: res.data.Deca }))
        .catch(err => console.log(err))
        }
    }

    getDete() {
        fetch("http://localhost:5000/Dete/" + this.state.idDeteta)
            .then(res => res.json()
                .then(json => { this.setState({ response: json }) }))
    }

    render() {

        this.getRoditelj();
        // console.log(this.state.idDeteta);
        // if (this.state.idDeteta == "staro")
        //     return <h3>Loading1...</h3>
        this.getDete();

        if (!this.state.response[0].Napomene) {
            return <span>Loading...</span>;
        }
        //let napomenaList = this.state.response[0].Napomene.map(nap => <a key={nap._id} href="#" className="list-group-item">{nap.Tekst} </a>)
        let napomenaList = this.state.response[0].Napomene.map(nap => <tr ><td> {nap.Tekst} </td></tr>)

        return (
            <div className="MT">  
                <h4 style={{color: "red", marginBottom: "20px"}}>Trenutna ocena iz vladanja je: <span className="vladanjeOcena"> {this.state.response[0].Vladanje} </span>  </h4> 
                
                <table  className="table  table-hover ">
                    <thead>
                        <th>Napomena</th>
                    </thead>
                    <tbody>
                    {napomenaList}
                    </tbody>
                </table>
                
            </div>
    )}
}
export default Vladanje