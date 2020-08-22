import React from 'react';
import Item from "./SearchPageItem"
import "../../style/pagination.css";

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleShiftRight = () => {

    let rightOne = this.props.currentTabs[this.props.currentTabs.length - 1] + 1

    let newTabs = this.props.currentTabs.slice()

    // console.log(this.props.currentTabs[this.props.currentTabs.length - 1] + 1)

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

      <div className="arrows react-bootstrap-table-pagination-list col-md-12 col-xs-12 col-sm-12 col-lg-12">
        <ul className="pagination react-bootstrap-table-page-btns-ul">
          <li className="page-item pl-1">
            <button onClick={this.handleShiftLeft} className="btn btn-primary">
              &lt;
            </button>
          </li>

          {this.props.currentTabs.map(
            (tab, index) =>
              <Item
                listItem={tab}
                key={index}
                handlePagination={this.props.handlePagination}
              />
          )}

          <li className="page-item pl-1">
            <button onClick={this.handleShiftRight} className="btn btn-primary">
              &gt;
            </button>
          </li>
        </ul>
      </div>

    )
  }

}


export default Pagination;









