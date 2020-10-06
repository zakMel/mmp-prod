import React from "react"
import $ from "jquery"
import services from '../../services/foodInfoServices'
import Pagination from '../Pagination/SearchPagination'
import SearchItem from './SearchItem'
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
        // console.log(response);

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

        // console.log(target, index, ingredient)

        services
        .getFoodInfo(ingredient, 11, index)
        .then(this.handlePageSuccess)
        .catch(services.error)
    
    }

    handlePageSuccess = (response) => {
        // console.log(response);
        
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
            />
        );

    };

    render() {

        return (
            <React.Fragment>
                <div className="ingreContainer">
                    <div className="ingredientList">
                        {this.state.mappedIngredients}
                    </div>
                    
                    <Pagination  
                        currentTabs={this.props.currentTabs}
                        handleUpdatePage={this.props.handleUpdatePage}
                        totalPages={this.state.totalPages}
                        handlePagination={this.handlePagination}
                    />
                    
                    <div id="searchForm">
                        <input onChange={ this.handleInput } placeholder="Enter Ingredient" type="text" className="text-center form-control searchInput border-primary"></input>
                        <button onClick={ () => {this.getList(this.state.input)} } type="submit" className="searchButton btn btn-primary">Search</button>
                    </div>
                </div>    
                
            </React.Fragment>
        )

    }
}

export default Search;

