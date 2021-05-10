const Note = require('../database/schema/noteSchema');
const User = require('../database/schema/userSchema');

const resolvers = {
  Query: {
    allNotes: () => null,
    getUser: () => {
      null;
    },
    getNotes: () => {},
  },
  Mutation: {
    createNote: async (root, args) => {
      try {
        //USER-need to Note add it to User-notes-array
        console.log(args);
        const note = new Note({ ...args });
        const request = await note.save();
        return request;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
