import React, { Component } from "react"
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

class InfoiKontakt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: "staro",
            idDeteta: "staro",
            profa: "staro",
            rod: "staro"
        }

        this.getRoditelj = this.getRoditelj.bind(this);
        this.getDete = this.getDete.bind(this);
    }

    
    
   // componentDidMount () {
          
    //}
    
    getRoditelj() {
        
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

        fetch("http://localhost:5000/Roditelj/GetRoditeljByEmail/" + this.props.infoKorisnika.username)
        .then(res => res.json()
            .then(json => { this.setState({ rod: json }) }))
            
        }
    }

    getRoditeljById() {
        
    }

    getDete() {
        fetch("http://localhost:5000/Dete/" + this.state.idDeteta)
            .then(res => res.json()
                .then(json => { this.setState({ response: json }) }))
    }

    getProfesor() {
        fetch("http://localhost:5000/Profesor/" + this.state.response[0].Razredni)
            .then(res => res.json()
                .then(json => this.setState({ profa : json })))
    }

    render() {

        this.getRoditelj();
        if (this.state.idDeteta == "staro")
            return <h3>Loading1...</h3>
        this.getDete();

        if (!this.state.response[0].Ime ) {
            return <span>Loading...</span>;
        }


        //     this.getProfesor();
        // if (!this.state.profa[0].Ime ) {
        //     return <span>Loading...</span>;
        // }

        let dete = this.state.response[0];
        let roditelj;
        if (this.props.infoKorisnika.type == "roditelj") {
            if (!this.state.rod[0].Ime) {
                return <span>Loading...</span>;
            }
            else {
                roditelj = this.state.rod[0];
            }
        }
        //let profesor = this.state.profa[0];

        let informacije = [];
        let pol = "";
        if (this.props.infoKorisnika.type == "ucenik")
        {
            informacije.push(React.createElement("h5",null, "Ime: " + dete.Ime));
            informacije.push(React.createElement("h5", null, "Prezime: " +dete.Prezime));
            informacije.push(React.createElement("h5", null,"Jmbg: " + dete.Jmbg));
            informacije.push(React.createElement("h5", null,"Datum rodjenja: " + dete.DatumRodjenja));
            informacije.push(React.createElement("h5", null,"Adresa: " + dete.Adresa));
            informacije.push(React.createElement("h5", null,"Email adresa: " + dete.Email));
            informacije.push(React.createElement("h5", null, "Razred: " + dete.Razred + "/" + dete.Odeljenje));
            pol = dete.Pol;

        }
        else if (this.props.infoKorisnika.type == "roditelj")
        {
            informacije.push(React.createElement("h5", null,"Ime: " + roditelj.Ime));
            informacije.push(React.createElement("h5", null,"Prezime: " +roditelj.Prezime));
            informacije.push(React.createElement("h5", null,"Email: " + roditelj.Email));
            informacije.push(React.createElement("h5", null, "Telefon: " + roditelj.Telefon));
            pol = roditelj.pol;
        
        }
        // else if (this.props.infoKorisnika.type == "profesor")
        // {

        // }

        return (            
            <div className="cards">
                   {pol=="M"? <img className="slika" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style={{ width:"100%"}} /> : <img className="slika" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" style={{ width:"100%"}} /> } 
                <div className="containers">
                    {/* <h4><b>John Doe</b></h4> 
                    <p>Architect & Engineer</p>  */}
                    {informacije}
                </div>

            </div>



           /* { <div className="MT card card-container">  
                <div>
                    {informacije}
                </div>
                <div>
                    <h4>Kontakt skole:</h4>
                    <h4>Ulica: Bulevar Nikole Tesle 55, Nis</h4>
                    <h4>Telefon: 018 565 256</h4>
                </div>
            </div> }*/
    )}
}
export default InfoiKontakt