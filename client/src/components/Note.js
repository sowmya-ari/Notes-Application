import React from "react";
import { CompactPicker } from "react-color";
import axios from "axios";
import SetAuthToken from "../utils/SetHeaderWithToken";
import "../styles/Note.css";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: " ",
      content: " ",
      displayColorPicker: false,
      color: ""
    };
  }

  componentWillMount() {
    if (!this.props.color) {
      this.setState({ color: "#FFFFFF" });
    } else {
      this.setState({ color: this.props.color });
    }
  }

  componentDidMount() {
    this.setState({
      title: this.props.title,
      content: this.props.content
    });
  }

  DeleteNotes = () => {
    const result = SetAuthToken();
    const id = this.props.id;
    axios.delete(`http://localhost:8000/notes/${id}`, {
      headers: { Authorization: `${result.token}` }
    });
  };

  HandleEditingNotes = () => {
    this.setState({
      editing: true,
      title: this.props.title,
      content: this.props.content
    });
  };

  HandleTitleEditing = event => {
    const changedtitle = event.target.value;
    this.setState({ title: changedtitle });
  };

  HandleContentEditing = event => {
    const changedcontent = event.target.value;
    this.setState({ content: changedcontent });
  };

  HandleEditingDone = event => {
    const result = SetAuthToken();
    const id = this.props.id;
    const title = { title: this.state.title };
    const content = { content: this.state.content };
    if (event.keyCode === 13) {
      this.setState({
        editing: false
      });
      axios.patch(
        `http://notes-alb-1339370148.us-east-1.elb.amazonaws.com:8000/notes/${id}`,
        title,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${result.token}`
          }
        }
      );
      axios.put(
        `http://notes-alb-1339370148.us-east-1.elb.amazonaws.com:8000/notes/${id}`,
        content,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${result.token}`
          }
        }
      );
    }
  };

  HandleSelectingColor = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  HandleColoringDone = () => {
    this.setState({ displayColorPicker: false });
  };

  HandleColorChange = color => {
    const result = SetAuthToken();
    axios.patch(
      `http://notes-alb-1339370148.us-east-1.elb.amazonaws.com:8000/notes/color/${this.props.id}`,
      { color: color.hex },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${result.token}`
        }
      }
    );
    this.setState({ color: color.hex });
  };

  render() {
    const view = {};
    const edit = {};
    if (this.state.editing === true) {
      view.display = "none";
    } else {
      edit.display = "none";
    }
    const popover = {
      position: "relative",
      zIndex: "2"
    };
    const cover = {
      position: "absolute",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px"
    };
    const color = {
      background: `${this.state.color}`
    };
    return (
      <div classname="note">
        <div className="card border-dark mb-3" style={{ maxWidth: "18rem" }}>
          <h5 className="card-header" style={view}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={this.DeleteNotes}
            >
              Delete
            </button>
            <button
              type="button"
              id="color-picker-2"
              className="btn btn-secondary btn-sm"
              onClick={this.HandleSelectingColor}
            >
              Color
            </button>
            {this.state.displayColorPicker ? (
              <div style={popover}>
                <div style={cover} onClick={this.HandleColoringDone} />
                <CompactPicker
                  color={this.state.color}
                  onChange={this.HandleColorChange}
                />
              </div>
            ) : null}
          </h5>
          <div
            className="card-body text-dark"
            onClick={this.HandleEditingNotes}
            style={{ ...view, ...color }}
          >
            <h1 className="card-title">{this.props.title}</h1>
            <p className="card-text ">{this.props.content}</p>
          </div>
        </div>
        <div style={edit} className="editing">
          <textarea
            type="text"
            className="titlearea"
            value={this.state.title}
            onChange={this.HandleTitleEditing}
            onKeyDown={this.HandleEditingDone}
          />
          <textarea
            type="text"
            className="contentarea"
            value={this.state.content}
            onChange={this.HandleContentEditing}
            onKeyDown={this.HandleEditingDone}
          />
        </div>
      </div>
    );
  }
}
export default Note;
