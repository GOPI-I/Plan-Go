import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the user slice


const store = configureStore({
  reducer: {
    user: userReducer, // Add user reducer
  },
});

export default store;