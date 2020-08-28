import React from "react"
import $ from "jquery"
import services from '../../services/foodInfoServices'
import Pagination from '../Pagination/SearchPagination'
import SearchItem from './SearchItem'
import "../../style/search.css";
import "../../style/pagination.css";

class Search extends React.Component {
    constructor (props) {
        super(props);

        this.state={
            input:"",
            totalPages: 0,
            currentTabs: [],
            mappedIngredients: []

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
        services
        .getFoodInfo(ingredient, 11, 1)
        .then(this.getListSuccess)
        .catch(services.error)
    }

    getListSuccess = (response) => {
        console.log(response);

        let tabs = []
        for (let i = 1; i < response.data.totalPages; i++) {
            if (i <= 4) {
                tabs.push(i);
            }
        }
        
        this.setState((state)=>{


            return {
                totalPages : response.data.totalPages,
                currentTabs: tabs,
                mappedIngredients: response.data.foods.map((ingredient) => {
                    return this.renderIngredients(ingredient);
                  }),
            }
        })
    }

    handlePagination = (e) => {
        let target = e.target
        let index = $(target).html()
        let ingredient = this.state.input

        console.log(target, index, ingredient)

        services
        .getFoodInfo(ingredient, 11, index)
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
    

    renderIngredients = (ingredient) => {
        return (
            <SearchItem
                key={ingredient.fdcId}
                ingredient={ingredient}
                description={ingredient.description}
                nutrients={ingredient.foodNutrients}
                addIngredient={this.props.addIngredient}
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
                    currentTabs={this.state.currentTabs}
                    totalPages={this.state.totalPages}
                    handleUpdatePage={this.handleUpdatePage}
                    handlePagination={this.handlePagination}
                />
                
                <div id="searchForm">
                    <input onChange={ this.handleInput } placeholder="Enter Search Ingredient" type="text" className="text-center form-control searchInput border-primary"></input>
                    <button onClick={ () => {this.getList(this.state.input)} } type="submit" className="searchButton btn btn-primary">Search</button>
                </div>
                
            </React.Fragment>
        )

    }
}

export default Search;

