import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

import css from "../style/shoppingList.css"

export default function shoppingList (props) {

    return (
        <React.Fragment>
            <div className="h2 text-center">shoppingList</div>     

            <div className="text-center" id="shoppingList">
                <ListGroup>
                    <ListGroup.Item>
                        <div>
                            <input type="checkbox" aria-label="Checkbox for following text input"></input>
                            <span>Lettuce</span>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div>
                            <input type="checkbox" aria-label="Checkbox for following text input"></input>
                            <span>tommato</span>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div>
                            <input type="checkbox" aria-label="Checkbox for following text input"></input>
                            <span>onion</span>
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div>
                            <input type="checkbox" aria-label="Checkbox for following text input"></input>
                            <span>pepper</span>
                        </div>
                    </ListGroup.Item>
                   
                </ListGroup>
            </div>

            <div className="mb-2 text-center justify-content-flex-end">
                <Button variant="primary" size="lg" id="submitButton">
                    SUBMIT
                </Button>
            </div>
        </React.Fragment>

    )

};