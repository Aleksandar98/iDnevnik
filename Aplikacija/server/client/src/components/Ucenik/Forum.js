import React, { Component } from "react"
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


class Forum extends Component{
    constructor(props){
        super(props);
        this.state = { 
            response: "staro",
            idDeteta:"staro"
        }
        this.getRoditelj = this.getRoditelj.bind(this);
        this.getDete = this.getDete.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.getRoditelj();
    }

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
                .then(res => {
                    this.setState({ idDeteta: res.data._id })
                    this.getDete();
                })
                .catch(err => console.log(err))
        }

       

        // else if (this.props.infoKorisnika.username != null)
        // {
        //     axios.post('http://localhost:5000/vratiRoditelja', { email: this.props.infoKorisnika.username })
        //     .then(res => this.setState({ idDeteta: res.data.Deca }))
        // .catch(err => console.log(err))
        // }
    }

    getDete() {
        fetch("http://localhost:5000/Dete/" + this.state.idDeteta)
            .then(res => res.json()
                .then(json => {
                    this.setState({ response: json });
                }))
    }

    sort(niz) {
        //let dogadjaji = this.state.response[0].Dogadjaji;
        console.log(niz.length);
        for (let i = 0; i < niz.length; i++)
            console.log(niz[i].Datum);
        let i = 0;
        let j = 0;
        let f = 1;
        for (i = 0; i < niz.length-1 ; i++)
        {
            console.log(niz[i]);
            console.log("niz i datum "+niz[i].Datum);
            for (j = i+1; j < niz.length ; j++)
            {
                f = 1;
                console.log("Poredjujem");
                console.log(niz[i].Datum);
                console.log("sa");
                console.log(niz[j].Datum);
                let k = 0;
                for ( k = 0; k< niz[i].Datum.length ; k++) {
                    console.log(niz[i].Datum[k]);
                    console.log(niz[j].Datum[k]);
                    if (niz[i].Datum[k] > niz[j].Datum[k])
                        f = 0;
                    if ( (parseInt(niz[i].Datum[k]) < parseInt(niz[j].Datum[k])) && f == 1) {
                        console.log("USO");
                        console.log("F " + f);
                        console.log(niz[i].Datum[k]);
                        console.log(niz[j].Datum[k]);
                        let pom = niz[i];
                        niz[i] = niz[j];
                        niz[j] = pom;
                        f = 0;
                    }
                }
            }
        }
        for (let i = 0; i < niz.length; i++)
            console.log(niz[i].Datum);
    }

    render() {

        if (!this.state.response[0].Post) {
            return <span>Loading...</span>
        }
        let sviPostovi = this.state.response[0].Post;
        let DomaciPost = [];
        let TestPost = [];
        let VannastavnePost = [];

        this.sort(sviPostovi);
        //let OstaloPost = [];
        sviPostovi.forEach(p => {
            let td = [];
            td.push(React.createElement("td", {style:{color:"red"}}, p.Datum));
             td.push(React.createElement("td", null, p.ProfesorIme));
            td.push(React.createElement("td", null, p.Sadrzaj));
            if (p.TipPosta == "Domaci") {  
                DomaciPost[DomaciPost.length] = <tr>{td}</tr>
            }
            else if (p.TipPosta == "Test") {
                TestPost[TestPost.length] = <tr>{td}</tr>
            }
            else if (p.TipPosta == "Vannastavne") {
                VannastavnePost[VannastavnePost.length] = <tr>{td}</tr>
            }
            // else {
            //     OstaloPost[OstaloPost.length] = <tr>{td}</tr>
            // }
        });



        return (
          <div className="MT">
            <div >
             <h2>Domaci zadaci</h2>
              <table className="table  table-hover ">
                    <thead >
                    <tr>
                    <th className ="datumfix">Datum</th>
                    <th className ="datumfix">Profesor</th>
                    <th>Obavestenje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DomaciPost}
                  </tbody>
              </table>
            </div>
                
            <div >
                <h2>Testovi</h2>
                <table className="table  table-hover ">
                        <thead >
                            <tr>
                            <th className ="datumfix">Datum</th>
                            <th className ="datumfix">Profesor</th>
                            <th>Obavestenje</th>
                            </tr>
                    </thead>
                    <tbody>
                      {TestPost}
                    </tbody>
                </table>
            </div>
                
                <div >
                    <h2>Vannastavne aktivnosti</h2>
              <table className="table  table-hover ">
                  <thead >
                        <tr>
                        <th className ="datumfix">Datum</th>
                        <th className ="datumfix">Profesor</th>
                        <th>Obavestenje</th>
                        </tr>
                  </thead>
                  <tbody>
                     {VannastavnePost}
                  </tbody>
              </table>
                </div>
                
                {/* <div >
                    <h2>Ostalo</h2>
              <table className="table  table-hover ">
                  <thead className ="datumfix">
                      
                          <th>Datum</th>
                          <th>Obavestenje</th>
                      
                  </thead>
                  <tbody>
                      {OstaloPost}
                  </tbody>
              </table>
          </div> */}
      </div>
        )
    }
}

export default Forum