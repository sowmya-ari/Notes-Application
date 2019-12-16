var token = localStorage.getItem("Token");
var user_id = localStorage.getItem("user_id");
const SetAuthToken = function() {
  const result = { token, user_id };
  return result;
};
export default SetAuthToken;
