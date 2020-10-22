import React from 'react';
import Item from "./SearchPageItem"
import "../../style/pagination.css";

class Pagination extends React.Component {

  state = {};
  

  handleShiftRight = () => {

    let rightOne = this.props.currentTabs[this.props.currentTabs.length - 1] + 1

    let newTabs = this.props.currentTabs.slice()
    
    if (rightOne <= this.props.totalPages) {

      newTabs.push(rightOne)
      newTabs.shift()

      this.props.handleUpdatePage(newTabs)
    }

  }

  handleShiftLeft = () => {
    let leftOne = this.props.currentTabs[0] - 1

    let newTabs = this.props.currentTabs.slice()

    if (leftOne > 0) {

      newTabs.unshift(leftOne)
      newTabs.pop()

      this.props.handleUpdatePage(newTabs)

    }

  }

  render() {

    return (
      <React.Fragment>
      {this.props.currentTabs.length > 0 

      ?
      <div className="paginationMain">
          
          <div className="pagButtonContainer">

          <button onClick={this.handleShiftLeft} className="leftArrow">
            &lt;
          </button>
     

          {this.props.currentTabs.map(
            (tab, index) =>
              <Item
                listItem={tab}
                key={index}
                handlePagination={this.props.handlePagination}
              />
          )}

          <button onClick={this.handleShiftRight} className="rightArrow">
            &gt;
          </button>

        </div>

      </div>
      
      :""

      }
      
      </React.Fragment>
    )
  }

}


export default Pagination;









