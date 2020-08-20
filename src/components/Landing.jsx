import React from 'react';
import {firestore} from '../configFirebase';
import dbServices from '../services/dbServices';


class Landing extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {};
  }
  
  componentDidMount(){
    
  }
  
  dbChange() {
    const db = firestore;
    const ingredients = db.collection("ingredients");
    const lettus = ingredients.doc("lettus");
  
    dbServices.get(lettus);
    dbServices.set(lettus, {name: 'lettus', amount: 'one head'});
    dbServices.delete(lettus);
  }

  render(){
    return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <h1>Keep it up Zachary!!!</h1>
          <h3>"Just Make Progress Today :)"</h3>
        </header>
      </div>
    </React.Fragment>
    );
  }  


}

export default Landing;
