import React from "react"
import {Button} from 'react-bootstrap';
import "./search.css";

class Search extends React.Component {
    constructor (props) {
        super(props);

        this.state={
            imput:[],
        }
    }


    render() {

        return (
            
            <div id="searchForm">
                <input type="search" className="form-control searchInput"></input>
                <Button type="submit" className="searchButton">Search</Button>
            </div>
        )

    }
}

export default Search;

