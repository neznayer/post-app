import React, { Component } from "react";
import "./search-panel.css";

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
  }

  onUpdateSearch(e) {
    //e nuzhen chtoby sledit za tem chto vvodytsa v text
    const term = e.target.value;
    this.setState({ term }); // {term} === {term:term}
    this.props.onUpdateSearch(term);
  }

  render() {
    return (
      <input
        className="from-control search-input"
        type="text"
        placeholder="search"
        onChange={this.onUpdateSearch}
      />
    );
  }
}
