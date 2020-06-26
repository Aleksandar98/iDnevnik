import React, { Component}from "react"
import 'bootstrap/dist/css/bootstrap.min.css'


class PromenaLozinke extends Component {

    constructor(props) {
        super(props);
        this.state={response:""}
    }
    render() {
        return (
            <div className="container MT ">
            
                <h2 className="centar">Dobrodosli na stranicu za dobijanje nove lozinke</h2>
            
                <form className="form-horizontal" action="/action_page.php">
                
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Email:</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" placeholder="Unesite email adresu" name="email" />
                        </div>
                    </div>
                
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Nova Lozinka:</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" placeholder="Unesite novu lozinku" name="pwd" />
                        </div>
                    </div>
            
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Potvrda lozinke:</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" placeholder="Potvrdite novu lozinku" name="pwd" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-danger">Sacuvaj</button>
                        </div>
                    </div>
                        
                </form>
            </div>

        )
    }
}

export default PromenaLozinke