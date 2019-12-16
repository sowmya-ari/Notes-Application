import React from "react";
import axios from "axios";
import SetAuthToken from "../utils/SetHeaderWithToken";
import "../styles/Inputfield.css";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  HandleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  HandleContentChange = event => {
    this.setState({ content: event.target.value });
  };

  HandleSubmit = event => {
    event.preventDefault();
    const result = SetAuthToken();
    const data = {
      user_id: result.user_id,
      title: this.state.title,
      content: this.state.content
    };
    axios.post("http://localhost:8000/notes", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${result.token}`
      }
    });
    this.setState({
      title: " ",
      content: " "
    });
  };

  render() {
    return (
      <div className="Notebook">
        <form onSubmit={this.HandleSubmit} className="input">
          <textarea
            name="title"
            placeholder="Title"
            className="title"
            value={this.state.title}
            onChange={this.HandleTitleChange}
          />
          <textarea
            name="content"
            className="content"
            placeholder="Write a note"
            value={this.state.content}
            onChange={this.HandleContentChange}
          />
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default InputField;
