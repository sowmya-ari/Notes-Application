const models = require("../models/Index");

const CreateNotes = async function(notes) {
  try {
    const result = await models.Notes.create({
      user_id: notes.user_id,
      title: notes.title,
      content: notes.content
    });
    return result;
  } catch (error) {
    throw Error("Unable to post the notes");
  }
};

const ReadNotes = async function(data) {
  try {
    const result = await models.Notes.findAll({
      where: {
        user_id: data.user_id
      }
    });
    return result;
  } catch (error) {
    throw Error("Unable to read the notes");
  }
};

const UpdateNotes = async function(notes, data) {
  try {
    const result = await models.Notes.update(
      {
        content: notes.content
      },
      {
        where: { id: data.id }
      }
    );
    return result;
  } catch (error) {
    throw Error("Unable to update notes");
  }
};

const UpdateTitle = async function(notes, data) {
  try {
    const result = await models.Notes.update(
      {
        title: notes.title
      },
      {
        where: { id: data.id }
      }
    );
    return result;
  } catch (error) {
    throw Error("Unable to update title");
  }
};

const DeleteNotes = async function(notes) {
  try {
    const result = await models.Notes.destroy({
      where: {
        id: notes.id
      }
    });
    return result;
  } catch (error) {
    throw Error("Unable to delete the notes");
  }
};

const UpdateColor = async function(notes, data) {
  try {
    const result = await models.Notes.update(
      {
        color: notes.color
      },
      {
        where: { id: data.id }
      }
    );
    return result;
  } catch (error) {
    throw Error("Unable to update the color of a notes");
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
