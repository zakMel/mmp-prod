import React from "react"
import {Button} from 'react-bootstrap';
import "./search.css";

class Search extends React.Component {
    constructor (props) {
        super(props);

        this.state={
            input:"",
        }
    }

    handleInput = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState( (state, props) => {
            return {
                [name]: value
            }
        });
    
    }

    
    render() {

        return (
            
            <div id="searchForm">
                <input onChange={ this.handleInput } type="search" className="form-control searchInput"></input>
                <Button  type="submit" className="searchButton">Search</Button>
            </div>
        )

    }
}

export default Search;

