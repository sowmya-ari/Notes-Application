const joi = require("@hapi/joi");

const Notes = function(notes) {
  const schema = {
    user_id: joi
      .number()
      .integer()
      .required(),
    title: joi.string().required(),
    content: joi.string().required()
  };
  return joi.validate(notes, schema);
};

module.exports = {
  Notes
};
