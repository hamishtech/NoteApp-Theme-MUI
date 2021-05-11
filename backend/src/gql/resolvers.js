const Note = require('../database/schema/noteSchema');
const User = require('../database/schema/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  UserInputError,
  ValidationError,
  ForbiddenError,
  AuthenticationError,
} = require('apollo-server-errors');
require('dotenv').config();

const resolvers = {
  Query: {
    allNotes: async (root, args, context) => {
      console.log(context.user);
      return Note.find();
    },
    getNotes: async (root, args, context) => {
      if (!context.user) {
        throw new ForbiddenError('cannot access notes, not logged in');
      }
      const userNotes = await User.findById(context.user.id).populate('notes');
      return userNotes.notes;
    },
    getUser: async (root, args, context) => {
      if (!context.user || context.error) {
        throw new ForbiddenError('Authentication error: cannot access user');
      }
      const user = await User.findById(context.user.id).populate('notes');
      return user;
    },
  },
  Mutation: {
    createNote: async (root, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            'need to be logged in to create a note'
          );
        }
        //USER-need Note add it to User-notes-array
        let user = await User.findById(context.user.id);
        const note = new Note({ ...args });
        user.notes.push(note._id);
        const savedUser = await user.save();
        const request = await note.save();
        return request;
      } catch (error) {
        console.log(error);
      }
    },
    deleteNote: async (root, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            'need to be logged in to delete a note'
          );
        }
        //USER-need Note add it to User-notes-array
        const request = await User.findByIdAndDelete(args.id);
        return;
      } catch (error) {
        console.log(error);
      }
    },
    ///USER
    createUser: async (root, args) => {
      const hash = await bcrypt.hash(args.password, 10);
      args = { ...args, password: hash };
      const user = new User({ ...args });
      const response = await user.save();
      return response;
    },
    login: async (root, args) => {
      console.log('login recieved');
      try {
        const user = await User.findOne({ username: args.username });
        if (!user) {
          throw new UserInputError('username not found', {
            invalidUser: args.username,
          });
        }
        const authBoolean = await bcrypt.compare(args.password, user.password);
        if (!authBoolean) {
          throw new ValidationError('wrong password');
        }
        const tokenInput = {
          username: user.username,
          password: user.password,
          id: user._id.toString(),
        };
        const token = jwt.sign(tokenInput, process.env.SECRET);
        return { token };
      } catch (error) {
        return error;
      }
    },
  },
};
module.exports = resolvers;
