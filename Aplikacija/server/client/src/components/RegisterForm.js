import React, {Component} from "react";

class RegisterForm extends Component{


  

    render(){
        return(

            <form method='POST' action='http://localhost:5000/register'>
                <input placeholder="Email" type="email" name="username"></input>
                <input placeholder="Password"type="password" name="password"></input>
               
            <p>
              <label>
                <input type="radio" name="type" value="ucenik"/>
                <span>Ucenik</span>
              </label>
            </p>
            <p>
              <label>
                <input type="radio" name="type" value="roditelj"/>
                <span>Roditelj</span>
              </label>
            </p>
            <p>
              <label>
                <input type="radio" name="type" value="profesor"/>
                <span>Profesor</span>
              </label>
            </p>

            
            <button type="submit">Registruj se</button>


            </form>
            
       
        );
    }
}

export default RegisterForm