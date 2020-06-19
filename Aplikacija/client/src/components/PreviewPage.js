import React, {Component} from "react";
import { connect } from 'react-redux';
import UcenikPage from './Ucenik/UcenikPage';
import ProfesorPage from './Profesor/ProfesorPage';

class PreviewPage extends Component{

    renderContent(){
        if(this.props.response === null){
            return <h1>Loading...</h1>
        }
        if(this.props.response === false){
            return <h1>Niste ulogovani</h1>
        }else{
            if(this.props.response.type === "ucenik"){
                return <UcenikPage  ucenik={this.props.ucenik} response={this.props.response}/>
            }
            if(this.props.response.type === "profesor"){
                return <ProfesorPage/>
            }
        return <h1>Neka greska</h1>
        }
    }
    render(){
        //console.log(this.props);
        return(
            this.renderContent()
        )
    }
}

// function mapStateToProps(state){
//     return { auth: state.auth}
//   }

// export default connect(mapStateToProps)(PreviewPage);
export default PreviewPage