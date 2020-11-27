import React, { Component } from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-panel/";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import "./app.css";
// tut obrashenie k serveru i poluchenie postov

import styled from "styled-components";

const AppBlock = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;
const StyledAppBlock = styled(AppBlock)`
  background-color: grey;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { label: "Going to learn React", important: true, liked: false, id: 1 },
        { label: "That's soo good", important: false, liked: false, id: 2 },
        { label: "omg!!", important: false, liked: false, id: 3 },
      ],
	  term: "",
	  filter: 'all'
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
	this.onToggleLiked = this.onToggleLiked.bind(this);
	this.onUpdateSearch = this.onUpdateSearch.bind(this);	
	this.onFilterSelect = this.onFilterSelect.bind(this);
	this.maxId = 4;
  }

  deleteItem(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);

      const before = data.slice(0, index);
      const after = data.slice(index + 1);

      const newArr = [...before, ...after];

      return {
        data: newArr,
      };
    });
  }

  addItem(body) {
    const newItem = {
      label: body,
      important: false,
      liked: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];

      return {
        data: newArr,
      };
    });
  }

  onToggleImportant(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const old = data[index];
      const newItem = { ...old, important: !old.important }; // perezapisyvaet like

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ]; // vse do izmenennogo elementa, + novy element, + vse posle nego

      return {
        data: newArr,
      };
    });
  }

  onToggleLiked(id) {
    this.setState(({ data }) => {
      const index = data.findIndex((elem) => elem.id === id);
      const old = data[index];
      const newItem = { ...old, liked: !old.liked }; // perezapisyvaet like

      const newArr = [
        ...data.slice(0, index),
        newItem,
        ...data.slice(index + 1),
      ]; // vse do izmenennogo elementa, + novy element, + vse posle nego

      return {
        data: newArr,
      };
    });
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items;
    } else {
      return items.filter((item) => {
        return item.label.indexOf(term) > -1;
      });
    }
  }

  onUpdateSearch(term) {
	  this.setState({term})
  }

  filterPost(items, filter) {
	  if (filter==='liked') {
		  return items.filter( item => item.liked)
	  } else {
		  return items
	  }
  }

onFilterSelect(filter){
	this.setState({filter});

}

  render() {
    const { data, term, filter } = this.state;
    const likedN = data.filter((item) => item.liked).length; //esli item.like true, to filter vozvrashaet etot element
	const allPosts = data.length;
	const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    return (
      <AppBlock>
        <AppHeader likedN={likedN} allPosts={allPosts} />
        <div className="search-panel d-flex">
          <SearchPanel 
		  onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter 
		  filter={filter}
		  onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.addItem} />
      </AppBlock>
    );
  }
}
