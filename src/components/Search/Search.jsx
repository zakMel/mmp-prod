import React from "react";
import $ from "jquery";
import services from '../../services/foodInfoServices';
import Pagination from '../Pagination/SearchPagination';
import SearchItem from './SearchItem';
import "../../style/search.css";
import "../../style/pagination.css";

class Search extends React.Component {

    state = {
        input:"",
        totalPages: 0,
        mappedIngredients: []

    }
    

    handleInput = (e) => {
        const target = e.target;
        const value = target.value;

        this.setState({
            input: value
        });
    }

    getList = (ingredient) => {
        services
        .getFoodInfo(ingredient, 11, 1)
        .then(this.handleListSuccess)
        .catch(services.error)
    }

    handleListSuccess = (response) => {

        let tabs = []
        for (let i = 1; i < response.data.totalPages; i++) {
            if (i <= 4) {
                tabs.push(i);
            }
        }

        this.props.handleUpdatePage(tabs);
        
        this.setState(()=>{

            return {
                totalPages : response.data.totalPages,
                mappedIngredients: response.data.foods.map( ingredient => this.renderIngredients(ingredient) ),
            }

        })
    }

    handlePagination = (e) => {
        let target = e.target
        let index = $(target).html()
        let ingredient = this.state.input

        services
        .getFoodInfo(ingredient, 11, index)
        .then(this.handlePageSuccess)
        .catch(services.error)
    
    }

    handlePageSuccess = (response) => {
        
        this.setState(()=>{

            return {
                totalPages : response.data.totalPages,
                mappedIngredients: response.data.foods.map( ingredient => this.renderIngredients(ingredient) ),
            }

        })
    }
    

    renderIngredients = (ingredient) => {
        return (
            <SearchItem
                key={ingredient.fdcId}
                ingredient={ingredient}
                description={ingredient.description}
                nutrients={ingredient.foodNutrients}
                addIngredient={this.props.addIngredient}
                lastURL={this.props.history.location.lastURL}
                passedProps={this.props.history.location.passedProps}
                handleSearching={this.props.handleSearching}
                resetCurrentTabs={this.props.resetCurrentTabs}
            />
        );

    };

    render() {

        return (
            <React.Fragment>

                <div className="ingredientList">
                    {this.state.mappedIngredients}
                </div>
                
                <Pagination  
                    currentTabs={this.props.currentTabs}
                    handleUpdatePage={this.props.handleUpdatePage}
                    totalPages={this.state.totalPages}
                    handlePagination={this.handlePagination}
                />    
                
                <button onClick={ () => {this.getList(this.state.input)} } type="submit" className="searchButton">Search</button>
                <input onChange={ this.handleInput } placeholder="Enter Ingredient" type="text" className="searchInput_SI"></input>    
                
            </React.Fragment>
        )

    }
}

export default Search;

