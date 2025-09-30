import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductApi } from "../utils/api";

export interface IProduct {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  like: boolean;
}

export interface IState {
  items: IProduct[];
  isLoading: boolean;
  error?: string;
}

const initialState: IState = {
  items: [],
  isLoading: true,
  error: "",
};

export const fetchProductsData = createAsyncThunk("products/fetchProductsData", async () => getProductApi());

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addLike: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload) {
          if (item.like) item.like = false;
          else item.like = true;
        }
      });
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addNewPost: (state, action) => {
      const lastItem = state.items[state.items.length - 1];
      const newId = lastItem ? lastItem.id + 1 : 1;

      state.items.unshift({
        ...action.payload,
        like: false,
        id: newId,
      });
    },
    editProduct: (state, action) => {
      const existingProduct = state.items.find((item) => item.id === action.payload.id);

      if (existingProduct) {
        Object.assign(existingProduct, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state) => {
        state.error = "error";
      });
  },
});

export const { addLike, deleteProduct, addNewPost, editProduct } = productSlice.actions;

export default productSlice.reducer;
