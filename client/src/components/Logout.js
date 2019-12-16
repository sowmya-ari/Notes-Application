import React from "react";

class Logout extends React.Component {
  componentWillMount() {
    localStorage.clear();
    this.props.history.push("/");
    window.location.reload();
  }
  render() {
    return <p></p>;
  }
}
export default Logout;
