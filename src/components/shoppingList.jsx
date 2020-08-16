import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import css from "../style/shoppingList.css"

export default function shoppingList (props) {

    return (
        <React.Fragment>

            <div id="page"> 

                <h2 className="text-center" style={{color: "red"}}>shoppingList</h2>     

                    <div className="text-center listContainer">
                        <ListGroup>

                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <div className="container">
                                    <input className="itemCheck" type="checkbox" aria-label="Checkbox for following text input"></input>
                                    <span>Lettuce</span>
                                </div>
                            </ListGroup.Item>

                        
                        </ListGroup>

                    
                        <div className="buttonContainer">
                            <Button className="submitButton" variant="primary" size="lg">
                                SUBMIT
                            </Button>
                        </div>

                    </div>

            </div>

        </React.Fragment>

    )

};