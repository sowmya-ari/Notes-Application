var token = localStorage.getItem("Token");
var user_id = localStorage.getItem("user_id");
const Setauthtoken = function() {
  const result = { token, user_id };
  return result;
};
export default Setauthtoken;
