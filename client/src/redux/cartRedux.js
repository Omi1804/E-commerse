// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     quantity: 0,
//     total: 0,
//   },
//   reducers: {
//     addProduct: (state, action) => {
//       state.quantity += 1;
//       state.products.push(action.payload);
//       state.total += action.payload.price * action.payload.quantity;
//     },
//     updatedProducts:()=>{
        
//     },
//     removeProduct: (state, action) => {
//         const productId = action.payload;
//         const removedProduct = state.products.find((product) => product._id === productId);
      
//         if (removedProduct) {
//           const updatedProducts = state.products.filter((product) => product._id !== productId);
//           const removedQuantity = removedProduct.quantity;
//           const removedPrice = removedProduct.price * removedQuantity;
            

//           if (state.quantity >= removedQuantity) {
//             state.quantity -= removedQuantity;
//           } else {
//             state.quantity = 0;
//           }
      
//           state.products = updatedProducts;
//           state.total -= removedPrice;
//         }
//       },
//   },
// });

// export const { addProduct,removeProduct } = cartSlice.actions;
// export default cartSlice.reducer;

//updated cartRedux file

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.products.find((product) => product._id === productToAdd._id);

      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        existingProduct.quantity += productToAdd.quantity;
      } else {
        // Otherwise, add the product to the cart
        state.products.push(productToAdd);
      }

      state.quantity += productToAdd.quantity;
      state.total += productToAdd.price * productToAdd.quantity;
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      const removedProduct = state.products.find((product) => product._id === productId);

      if (removedProduct) {
        const removedQuantity = removedProduct.quantity;
        const removedPrice = removedProduct.price * removedQuantity;

        if (state.quantity >= removedQuantity) {
          state.quantity -= removedQuantity;
        } else {
          state.quantity = 0;
        }

        state.products = state.products.filter((product) => product._id !== productId);
        state.total -= removedPrice;
      }
    },
    updateProduct: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingProduct = state.products.find((product) => product._id === productId);

      if (existingProduct) {
        const quantityDiff = quantity - existingProduct.quantity;
        existingProduct.quantity = quantity;

        state.quantity += quantityDiff;
        state.total += quantityDiff * existingProduct.price;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;
