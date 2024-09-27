import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoggedIn: false,
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.users.push(action.payload); // Add the new user to the user list
      state.currentUser = action.payload; // Automatically log in the new user
      state.isLoggedIn = true;
    },
  },
});

export const {
  addUser,
  setLogin,
  logout,
  loginSuccess,
  setError,
  registerSuccess,
} = userSlice.actions;

export default userSlice.reducer;
