import React from "react";
import Note from "./Note";
import Inputfield from "./Inputfield";
import Setauthtoken from "../utils/Setauthtoken";
import axios from "axios";
import "../styles/Notes.css";

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidUpdate() {
    this.GetAllNotes();
  }
  componentDidMount() {
    this.GetAllNotes();
  }
  componentWillMount() {
    if (!localStorage.getItem("Token")) {
      return this.props.history.push("/");
    }
  }
  GetAllNotes = () => {
    const result = Setauthtoken();
    axios
      .get(`/notes/${result.user_id}`, {
        headers: { Authorization: `${result.token}` }
      })
      .then(res => {
        this.setState({ notes: res.data.notes });
      });
  };

  render() {
    return (
      <div>
        <Inputfield />
        <div className="card-columns">
          <div className="notes">
            {this.state.notes.map((note, key) => (
              <Note {...note} key={key} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Notes;
