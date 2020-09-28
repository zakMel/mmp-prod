import React from 'react';
import "../style/landing.css";

class Landing extends React.Component {

  state = {};
  
  
  componentDidMount(){
    // const db = firestore;
    // let user = firebase.auth().currentUser.uid;
    // let userFiles = db.collection("users").doc(user);
    // let meals1 = userFiles.collection("meals");
    // let meals2 = db.collection("meals");
    // console.log(meals1, meals2)
  }
  
  dbChange() {
    // const db = firestore;
    // const ingredients = db.collection("ingredients");
    // const lettus = ingredients.doc("lettus");
  
    // dbServices.get(lettus);
    // dbServices.set(lettus, {name: 'lettus', amount: 'one head'});
    // dbServices.delete(lettus);
  }

  render() {

    return (
    <React.Fragment>
      <div className="landingContainer">
       
          <h1>Keep it up Zachary!!!</h1>
          <h3>Just Make Progress</h3>
       
      </div>
    </React.Fragment>
    )
  }
}  




export default Landing;
