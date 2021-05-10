const Note = require('../database/schema/noteSchema');
const User = require('../database/schema/userSchema');

const resolvers = {
  Query: {
    allNotes: async () => {
      return Note.find();
    },
    getUser: () => {
      null;
    },
    getNotes: (root, args) => {},
  },
  Mutation: {
    createNote: async (root, args) => {
      try {
        //USER-need Note add it to User-notes-array
        console.log(args);
        const note = new Note({ ...args });
        const request = await note.save();
        return request;
      } catch (error) {
        console.log(error);
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      const response = await user.save();
      return user;
    },
  },
};

module.exports = resolvers;
