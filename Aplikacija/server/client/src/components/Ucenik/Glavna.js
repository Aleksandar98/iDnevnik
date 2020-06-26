import React, {Component} from "react"
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'


class Glavna extends Component {
    constructor(props) {
        super(props);
        this.state={response: ""}
    }
    render() {
        return (
            <div className="MT centar" >
                <h1>Dobrodosli na online portal skole</h1>
                <img width="85%" height="85%" src="https://www.cfchildren.org/wp-content/uploads/blog/august-2018/parental-engagement-supports-SEL-1024x536.jpg" />
            </div>
        
        )
    }
}

export default Glavna