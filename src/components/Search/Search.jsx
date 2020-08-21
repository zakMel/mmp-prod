import React from "react"
import services from '../../services/foodInfoServices'
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

        this.setState({
            input: value
        });
    }

    getList = (ingredient) => {
        services.getList(ingredient, 10, 0)
        .then(this.getListSuccess)
        .catch(services.error)
    }

getListSuccess = (response) => {
        console.log(response);
    }

    
    render() {

        return (
            <React.Fragment>
                <div id="searchForm">
                    <input onChange={ this.handleInput } type="text" className="form-control searchInput border-primary"></input>
                    <button onClick={ () => {this.getList(this.state.input)} } type="submit" className="searchButton btn btn-primary">Search</button>
                </div>
            </React.Fragment>
        )

    }
}

export default Search;

