var services = require("../services/Notes");
var validations = require("../validations/Noteschema");

const CreateNotes = async function(req, res) {
  const { value, error } = await validations.Notes(req.body);
  if (error) {
    return res.json({
      status: 401,
      message: error.datails[0].message
    });
  } else {
    try {
      const result = await services.CreateNotes(req.body);
      return res.json({
        status: 201,
        notes: result
      });
    } catch (error) {
      return res.json({
        status: 500,
        error: error
      });
    }
  }
};

const ReadNotes = async function(req, res) {
  try {
    const result = await services.ReadNotes(req.params);
    return res.json({
      status: 200,
      notes: result
    });
  } catch (error) {
    return res.json({
      status: 500,
      error: error
    });
  }
};

const UpdateNotes = async function(req, res) {
  try {
    const result = await services.UpdateNotes(req.body, req.params);
    if (result == 0) {
      return res.json({
        status: 403,
        message: "Notes with requested id is not exist"
      });
    } else {
      return res.json({
        status: 200,
        notes: result
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      error: error
    });
  }
};

const UpdateTitle = async function(req, res) {
  try {
    const result = await services.UpdateTitle(req.body, req.params);
    if (result == 0) {
      return res.json({
        status: 403,
        message: "Notes with requested id is not exist"
      });
    } else {
      return res.json({
        status: 200,
        notes: result
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      error: error
    });
  }
};

const DeleteNotes = async function(req, res) {
  try {
    const result = await services.DeleteNotes(req.params);
    if (result == 0) {
      return res.json({
        status: 403,
        message: "Notes with requested id is not exist"
      });
    } else {
      return res.json({
        status: 200,
        notes: result
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      error: error
    });
  }
};

const UpdateColor = async function(req, res) {
  try {
    const result = await services.UpdateColor(req.body, req.params);
    if (result == 0) {
      return res.json({
        status: 403,
        message: "Notes with requested id is not exist"
      });
    } else {
      return res.json({
        status: 200,
        notes: result
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      error: error
    });
  }
};

module.exports = {
  CreateNotes,
  ReadNotes,
  UpdateNotes,
  UpdateTitle,
  DeleteNotes,
  UpdateColor
};
