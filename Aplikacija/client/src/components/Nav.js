import React from 'react';

export  const Nav = (props) => (
<nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/Profesor">ADULINX SOFT</a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="active"><a href="/Profesor">Forum <span className="sr-only">(current)</span></a></li>
        <li className="dropdown">
          <a href="/Profesor" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Izaberi odeljenje <span className="caret"></span></a>
          <ul className="dropdown-menu">
            {props.profesor.odeljenja.map((value,ind) => {
              return <li key={ind}><a href={'/Odeljenje/'+value.godina+'/'+value.odeljenje} >{value.godina}/{value.odeljenje}</a></li>
            })}
          </ul>
        </li>
      </ul>
      {props.profesor.razredni ? <ul className="nav navbar-nav"><li><a href="/Profesor">Zakazi roditeljski<span className="sr-only">(current)</span></a></li></ul> : null }
      <ul className="nav navbar-nav navbar-right">    
            <li><a href="/">Odjavi se</a></li>
      </ul>
    </div>
  </div>
</nav>
)

