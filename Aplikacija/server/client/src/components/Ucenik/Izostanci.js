import React, {Component} from "react"
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


class Izostanci extends Component{
    constructor(props) {
        super(props);
        this.state = {
            response: "staro",
            polugodiste: "prvo",
            tip: "srednja",
            razred: 0,
            izostanakTip: "Opravdani",
            idDeteta: "staro",
            Roditelj: null,
            profa: "staro",
        }
        this.changePolugodiste = this.changePolugodiste.bind(this);
        this.changeRazred = this.changeRazred.bind(this);
        this.getRoditelj = this.getRoditelj.bind(this);
        this.getDete = this.getDete.bind(this);
    }

    changePolugodiste(pol) {
        this.setState({polugodiste: pol})
    }

    changeRazred(r) {
        this.setState({razred: r})
    }

    changeIzostanak(i) {
        this.setState({izostanakTip:i})
    }
    drawNumbers() {
        let brojRazreda;
        if (this.state.tip == "osnovna")
            brojRazreda = 8;
        else
            brojRazreda = 4;
        let li = []
        for (let i = 1; i <=brojRazreda; i++) {
            li.push(<li className={this.state.razred ==  i  ? "active" : ""}><a onClick={() => this.changeRazred(i)} href="#">{i}</a></li>);
        }
        return li;
    }

     componentDidMount () {
    //     // fetch("http://localhost:5000/Zdravko")
    //     //     .then(res => res.json()
    //     //         .then(json => { this.setState({ response: json })})
    //     // );     
    //     // console.log(this.props.infoKorisnika);
    //     // //if (this.props.infoKorisnika != null) {
    //     //     if (this.props.infoKorisnika != null && this.props.infoKorisnika.type == "roditelj") {
    //     //         let _id = "";
    //     //         fetch("http://localhost:5000/Roditelj/" + this.props.infoKorisnika.username)
    //     //             .then(res => res.json()
    //     //                 .then(json => { _id = json.Deca }))
    //     //         console.log("iddeteta"+_id);
    //     //         fetch("http://localhost:5000/Dete/" + _id)
    //     //             .then(res => res.json()
    //     //                 .then(json => { this.setState({ response: json }) }))
    //     //         console.log(this.state.response);
    //     //     }
    //     //}
    this.getRoditelj();
    //console.log(this.state.idDeteta);
   // this.getDete();
    //this.getProfesor();
    var today = new Date();
    var mm = String(today.getMonth() + 1);
    if (mm > 0 && mm < 9)
        this.changePolugodiste("drugo");
    else
        this.changePolugodiste("prvo");

     }

    getRoditelj() {
        // console.log("TEST");
        // console.log(this.props.infoKorisnika);
        // //if (this.props.infoKorisnika != null) {
        //     if (this.props.infoKorisnika != null && this.props.infoKorisnika.type == "roditelj") {
        //         let _id = "";
        //         let Email = this.props.infoKorisnika.username;
        //         fetch("http://localhost:5000/Roditelj/?Email=" + Email)
        //             .then(res => res.json()
        //                 .then(json => { _id = json.Deca; console.log(_id) }))
        //         console.log("iddeteta"+_id);
        //         fetch("http://localhost:5000/Dete/?_id=" + _id)
        //             .then(res => res.json()
        //                 .then(json => { this.setState({ response: json }) }))
        //         console.log(this.state.response);
        //     }
        if (this.props.infoKorisnika.username != null && this.props.infoKorisnika.type == "ucenik")
        {
            axios.post('http://localhost:5000/vratiDete', { email: this.props.infoKorisnika.username })
                .then(res => {
                    this.setState({ idDeteta: res.data._id })
                    this.getDete();
                })
                .catch(err => console.log(err))
        }

        else if (this.props.infoKorisnika.username != null)
        {
            axios.post('http://localhost:5000/vratiRoditelja', { email: this.props.infoKorisnika.username })
                .then(res => {
                    this.setState({ idDeteta: res.data.Deca })
                    this.getDete();
                })
                .catch(err => console.log(err))
            
                fetch("http://localhost:5000/Roditelj/GetRoditeljByEmail/" + this.props.infoKorisnika.username)
                .then(res => res.json()
                    .then(json => { this.setState({ Roditelj: json }) }))
        }
       // console.log(this.props.infoKorisnika.username);
    }

    getDete() {
        fetch("http://localhost:5000/Dete/" + this.state.idDeteta)
            .then(res => res.json()
                .then(json => {
                    this.setState({ response: json });
                    this.getProfesor();
                }))
               
    }

    // getRoditeljId() {
    //     fetch("http://localhost:5000/Roditelj/Email" + this.props.infoKorisnika.username)
    //         .then(res => res.json()
    //         .then(json=>{this.setState({Roditelj:json})}))
    // }

    getProfesor() {
        console.log(this.state.response);
        fetch("http://localhost:5000/profesori/Profesor/" + this.state.response[0].Razredni)
            .then(res => res.json()
                .then(json => this.setState({ profa : json })))
    }
    posaljiZahtev(zah, r, pol, pred, dat, pri) {
        
        // zah je zahtev koji salje roditelj pa mu treba promeniti stanje
        zah.Tip = "Poslat"; //vise nece da se prikazuje u tabeli
        let roditelj = this.state.Roditelj[0]._id;
        let dete = this.state.response[0]._id;
        let zahtev;
        console.log(this.props.infoKorisnika);
        console.log(this.state.Roditelj);
        console.log(this.state.response[0]._id);

        //let korsinikovEmail = this.props.infoKorisnika.username;

        zahtev = {
            RoditeljId: roditelj,
            DeteId: dete,
            Razred: r,
            Polugodiste: pol,
            Tip: zah.Tip,
            Predmet: pred,
            Datum: dat,
            Prihvata: pri
        }
        
        //this.getProfesor();

       
        axios.post("http://localhost:5000/profesori/primiZahtev/", {
            id_profe: this.state.profa._id,
            zahtev: zahtev
        })
            .then(res => {
                axios.post("http://localhost:5000/ucenici/updateIzostanak", {
                    _id: dete,
                    izostanakId: zah._id,
                    tip: "Poslat"
                })
            })
            .catch((error) => {
                console.log(error);
            })

        this.setState({izostanakTip:"Na cekanju"});
        //this.state.profa[0].Zahtevi.push(zahtev);

        




        
        //console.log("LOGUJEM ID:" + _id);
        //RoditeljEmail
        /*fetch("http://localhost:5000/RoditeljEmail/" + korsinikovEmail)
        .then(res => res.json()
        .then(json => { 
            roditelj = json;
            
             zahtev = {
                RoditeljId:roditelj[0].id,
                DeteId:null ,
                Razred:r,
                Polugodiste:pol,
                Predmet:pred,
                Datum:dat,
                Prihvata:pri
            }
           zahtev.DeteId = roditelj[0].Deca;
          
        }))
            .catch(err => console.log(err))*/
        
        
        //NADJI PROFESORA PREKO IMENA KOJI PISE PORED PREDMETA

        //POZOVI POST ZAHTEV ZA DODAVANJE ZAHTEVA ZA TOG NADJENOG PROFESORA

        // fetch("http://localhost:5000/Profesor/NoviZahtev", zahtev);

        
        
    }
    
    render() {
        // this.getRoditelj();
        // //console.log(this.state.idDeteta);
        // this.getDete();
        // this.getProfesor();
        //this.getRoditeljId();

        //console.log(this.props.infoKorisnika.username);
        // if (!this.state.response[0].Izostanci) {
        //     return <span>Loading...</span>
        // }
        if (!this.state.response[0].Izostanci) {
            return <h2>Loading...</h2>
        }
        
        if(this.state.razred==0 )
            this.changeRazred(this.state.response[0].Razred);


        let sviIzostanci = this.state.response[0].Izostanci;
        let tr = [];

        let brOpravdanih = 0;
        let brNeopravdanih = 0;
        let suma = 0;

        sviIzostanci.forEach((izostanak, i) => {
            let td = [];
            if (izostanak.Tip == "Opravdani" && izostanak.Razred==this.state.razred && izostanak.Polugodiste==this.state.polugodiste)
                {
                brOpravdanih++;
                }
            else if (izostanak.Tip == "Neopravdani" && izostanak.Razred==this.state.razred && izostanak.Polugodiste==this.state.polugodiste)
                {
                brNeopravdanih++;
                }
            
            if (izostanak.Tip == this.state.izostanakTip && izostanak.Razred==this.state.razred && izostanak.Polugodiste==this.state.polugodiste && izostanak.Tip!="Poslat") {
                td.push(React.createElement("td", null, izostanak.Predmet))
                td.push(React.createElement("td", null, izostanak.Datum))
                if (izostanak.Tip == "Na cekanju")
                {
                    // ovaj deo je vidljiv samo kod roditelja
                    /*td.push(React.createElement("button", {className:"btn btn-success"}, "Opravdaj"));
                    td.push(React.createElement("button", { className: "btn btn-danger" }, "Neopravdaj"));*/
                    //let btnO = <td>{(React.createElement("button", { className: "btn btn-success" }, "Opravdaj"))}</td>
                    let btnN = <td><button className="btn btn-danger" onClick={() => this.posaljiZahtev(izostanak,izostanak.Razred, izostanak.Polugodiste, izostanak.Predmet, izostanak.Datum, false)} >Neopravdaj</button></td>

                    let btnO = <td><button className="btn btn-success" onClick={() => this.posaljiZahtev(izostanak,izostanak.Razred, izostanak.Polugodiste, izostanak.Predmet, izostanak.Datum, true)} >Opravdaj</button></td>

                   
                 //   btnO.onClick = this.posaljiZahtev(izostanak.Razred,izostanak.Polugodiste,izostanak.Predmet,izostanak.Datum,true);
                    
                    // btnN.onClick = function () {
                    //     this.posaljiZahtev(izostanak.Razred,izostanak.Polugodiste,izostanak.Predmet,izostanak.Datum,false);
                    // }
                    td.push(btnO);
                    td.push(btnN);
                    //klik na dugme salje profesoru opravdaj ili neopravdaj i profesor donosi krajnju odluku i salje je roditelju i tada se samo tip izostanka nacekanju pretvata u o ili n
                } 
                 
            }
            tr[i] = <tr>{td}</tr>
        });

        suma = brOpravdanih + brNeopravdanih;

        return (
            <div className="  levidesni">
                <div className="levi">
                <h3 className="RazredTekst">Razred</h3>

                <div className="Razred">
                    <ul className="pagination">
                        {this.drawNumbers()}
                    </ul>
                </div>
                
                <div className="polugodiste">
                    <ul className="pagination">
                        <li className={this.state.polugodiste == "prvo" ? "active" : ""}><a onClick={() => this.changePolugodiste("prvo")} href="#prvopolugodiste">Prvo polugodiste</a></li>
                        <li className={ this.state.polugodiste == "drugo" ? "active" : "" }><a onClick={() => this.changePolugodiste("drugo")} href="#drugopolugodiste">Drugo polugodiste</a></li>
                    </ul>
                </div>

                {/* <div className="row"> */}
                    <div >
                        <ul className="pagination">
                            <li className={this.state.izostanakTip == "Opravdani" ? "active" : ""}><a onClick={() => this.changeIzostanak("Opravdani")} href="#Opravdani">Opravdani</a></li>
                            <li className={this.state.izostanakTip == "Neopravdani" ? "active" : ""}><a onClick={() => this.changeIzostanak("Neopravdani")} href="#Neopravdani">Neopravdani</a></li>
                            {this.props.infoKorisnika.type != "ucenik" ?
                            <li className={ this.state.izostanakTip == "Na cekanju" ? "active" : "" }><a onClick={() => this.changeIzostanak("Na cekanju")} href="#Nacekanju">Na cekanju</a></li>
                            :
                            null
                            }
                        </ul>               
                    </div>
                    <h3 >Broj opravdanih: {brOpravdanih}</h3>
                    <h3 >Broj neopravdanih: {brNeopravdanih}</h3>
                    <h3 style={{ color: "red" }}>Ukupno: {suma}</h3>
                 </div>
                
                    <div className=" desni">
                        <table className="table-responsive table table-hover">
                            <thead>
                                <tr>
                                    <th>Predmet</th>
                                <th>Datum</th>
                                <th ></th>
                                </tr>
                            </thead>
                            <tbody>
                               {tr}
                            </tbody>
                        </table>
                    </div>


                    
                {/* </div> */}
                
            </div>
        )
    }
}

export default Izostanci