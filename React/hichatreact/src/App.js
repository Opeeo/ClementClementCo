import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

  state = null

  handleClick = () => {
    axios
    .get('http://localhost:8080/api/users/recupInfo', {params : {email: 'clement@gmail.com'}})
    .then(data => (this.setState({data: data})))
    .catch(err => (console.log(err)))
  }

  render() {

    const title = "Test Page de Profil Utilisateur";

    return(
      <div>
         <h1>{title}</h1>
        
         <button onClick={this.handleClick}>Catch it bru</button>


      </div>
  
    );   
  }
}



export default App;