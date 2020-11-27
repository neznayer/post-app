import React, { Component } from "react";
import "./post-list-item.css";

export default class PostListItem extends Component {


  render() {
    const { label, onDelete, onToggleImportant, onToggleLiked, important, liked } = this.props;
    
    console.log(important);
    let classNames = "app-list-item d-flex justify-content-between";

    if (important) {
      classNames += " important"; // tut vazhno pered probel!
    }
    if (liked) {
      
      classNames += " like"; // tut vazhno pered probel!
    }

    return (
      <div className={classNames}>
        <span className="app-list-item-label" onClick={onToggleLiked}>
          {label}
        </span>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn-star btn-sm"
            type="submit"
            onClick={onToggleImportant}
          >
            <i className="fa fa-star"></i>
          </button>
          <button className="btn-trash btn-sm" type="submit" onClick={onDelete}>
            <i className="fa fa-trash-o"></i>
          </button>
          <i className="fa fa-heart"></i>
        </div>
      </div>
    );
  }
}
