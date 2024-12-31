import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '', // Added userId to store the unique identifier
    name: '',
    email: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId; // Capture userId from the payload
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.userId = '';
      state.name = '';
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
