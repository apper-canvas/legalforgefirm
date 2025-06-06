import { configureStore, createSlice } from '@reduxjs/toolkit'

// Simple app slice to prevent empty reducer error
const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    error: null,
    currentDocument: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setCurrentDocument: (state, action) => {
      state.currentDocument = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { setLoading, setError, setCurrentDocument, clearError } = appSlice.actions

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
})