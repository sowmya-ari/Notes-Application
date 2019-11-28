import React from "react";

class Logout extends React.Component {
  componentWillMount() {
    localStorage.clear();
    this.props.history.push("/");
    window.location.reload();
  }
  render() {
    return <p>Logout</p>;
  }
}
export default Logout;
