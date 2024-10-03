import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginStatus: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { setLoginStatus } = authSlice.actions;
export default authSlice.reducer;
