import React, {Component} from "react";
import { connect } from 'react-redux';
import Header from "../Header"
import Footer from "./Footer"
import Vladanje from "./Vladanje"
import Dogadjaji from "./Dogadjaji"
import Raspored from "./Raspored"
import Ocene from "./Ocene"
import PromenaLozinke from "./PromenaLozinke"
import Forum from "./Forum"
import Glavna from "./Glavna"
import Izostanci from "./Izostanci"
import ReactDOM from "react-dom"
import {BrowserRouter, Route} from 'react-router-dom'


class UcenikPage extends Component{
    render(){
        return(
            <div>
            <BrowserRouter>
              <div>
             
              <Glavna/> 
         
              </div>
            </BrowserRouter>
          </div>
        )
    }
}
export default UcenikPage