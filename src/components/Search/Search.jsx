import React from "react"
import $ from "jquery"
import services from '../../services/foodInfoServices'
import Pagination from '../Pagination/SearchPagination'
import "./search.css";

class Search extends React.Component {
    constructor (props) {
        super(props);

        this.state={
            input:"",
            totalPages: 0,
            currentTabs: []

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
        
        this.setState((state)=>{

            let tabs = []
            for (let i = 1; i < response.data.totalPages; i++) {
                if (i <= 4) {
                    tabs.push(i);
                }
            }

            return {
                totalPages : response.data.totalPages,
                currentTabs: tabs
            }
        })
    }

    handlePagination = (e) => {
        let target = e.target
        let index = $(target).html()
        let ingredient = this.state.input

        console.log(target, index, ingredient)

        services
        .getList(ingredient, 10, index)
        .then(this.getListSuccess)
        .catch(services.error)
    
    }

      handleUpdatePage = (newTabs) => {
        this.setState(() => {
          return {
            currentTabs: newTabs
          }
        })
    
      }
    
    render() {

        return (
            <React.Fragment>
                <Pagination 
                    currentTabs={this.state.currentTabs}
                    totalPages={this.state.totalPages}
                    handleUpdatePage={this.handleUpdatePage}
                    handlePagination={this.handlePagination}
                />
                <div id="searchForm">
                    <input onChange={ this.handleInput } type="text" className="form-control searchInput border-primary"></input>
                    <button onClick={ () => {this.getList(this.state.input)} } type="submit" className="searchButton btn btn-primary">Search</button>
                </div>
            </React.Fragment>
        )

    }
}

export default Search;

