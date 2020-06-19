import React,{ Component } from "react";
import { BrowserRouter, Redirect, Route} from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { connect } from 'react-redux';
import * as actions from '../actions'
import PreviewPage from "./PreviewPage";


import Header from "./Header"
import Forget from "./Forget"
import Reset from "./Reset"
import Footer from "./Ucenik/Footer"
import Vladanje from "./Ucenik/Vladanje"
import Dogadjaji from "./Ucenik/Dogadjaji"
import Raspored from "./Ucenik/Raspored"
import Ocene from "./Ucenik/Ocene"
import PromenaLozinke from "./Ucenik/PromenaLozinke"
import Forum from "./Ucenik/Forum"
import Glavna from "./Ucenik/Glavna"
import Izostanci from "./Ucenik/Izostanci"
import axios from 'axios';
import Header2 from "./Header2";

const Landing = () =>{
    return(
        <div>
           
            <h4>Dobro dosli na portal o statusu deteta</h4>

        </div>
);
};


class App extends Component{

    constructor(props) {
        super(props)
    
        this.state = {
          response: null,
          ucenik: null
        }
      }

    componentDidMount(){
        axios
        .get("/api/current_user")
        .then(res => {
           this.setState({response:res.data || false})
        })
        .then(() =>{
            if(this.state.response)
            axios
            .get("http://localhost:5000/DeteEmail/"+this.state.response.username)
            .then(ucenikRes =>{
                this.setState(prevState =>({
                    ...prevState,
                    ucenik:ucenikRes.data
                }))
            })
        })
    }
    
    render(){

            console.log(this.state.response)

            // if (this.state.ucenik == null) {
            //     return <span>Loading...</span>;
            // }
        
        return(

            <div>
                <BrowserRouter>
                    <div>
                        {this.state.response ? <Header ucenik={this.state.ucenik} response={this.state.response} /> : <Header2/>}
                        
                         <Route exact path="/" component={Glavna}> {this.state.response ? <Redirect to="/preview" /> : <Landing />}</Route> 
                        <Route exact path="/login" component={LoginForm}/>
                        <Route exact path="/register" component={RegisterForm}/>
                        <Route exact path="/preview"   ucenik={this.state.ucenik} response={this.state.response} render={(props) => <PreviewPage {...props} response={this.state.response} />}/>
                       
                       <Route exact path="/Forum" component={Forum} />
                        
                        
                        <Route exact path="/Izostanci" render={(props) => <Izostanci {...props} infoKorisnika ={this.state.response} />}/>
                       
                        <Route exact path="/Vladanje" component={Vladanje} />
                        <Route exact path="/Raspored" component={Raspored} />
                        <Route exact path="/Dogadjaji" component={Dogadjaji} />
                        <Route exact path="/Ocene" component={Ocene} />
                        <Route exact path="/PromenaLozinke" component={PromenaLozinke}/>
                        <Route exact path="/Forget" component={Forget} />
                        <Route  path="/Reset" component={Reset} />
                    <Footer />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
//  function mapStateToProps(state){
//      return { auth: state.auth}
//    }

//  export default connect(mapStateToProps, actions)(App);
export default App;