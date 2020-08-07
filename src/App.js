import React from 'react';
import logo from './logo.svg';
import './App.css';
import {firestore} from './configFirebase';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  componentDidMount(){
    var db = firestore;
    var docRef = db.collection("food").doc("greens");
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }  
}

export default App;
