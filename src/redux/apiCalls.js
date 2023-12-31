import { publicRequest, userRequest } from "../requestMethods";
import { 
  loginFailure, 
  loginStart, 
  loginSuccess, 
  logOut,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  addUserFailure,
  addUserStart,
  addUserSuccess,
} from "./userRedux";
import {
    getProductFailure,
    getProductStart,
    getProductSuccess,
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    updateProductFailure,
    updateProductStart,
    updateProductSuccess,
    addProductFailure,
    addProductStart,
    addProductSuccess,
  } from "./productRedux";

//user
export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login",user);
        //res.data here is our user info
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
}

export const register = async (dispatch, user)=>{
    try{
        const res = await publicRequest.post("/auth/register",user);
        //res.data here is our user info
        dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
}

export const logout = async (dispatch) => {
    dispatch(logOut());
}

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    //  we can comment this line if we don't really want to delete it; if this line is called, the item will be deleted from database instead of just on interface
    const res = await userRequest.delete(`/users/${id}`);
    //when we need to send something here to productSlice, we need the action in that function, and it will send the item in the () as the action.payload
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // here we also doesn't really update on database. if we want to achieve that, we need to trigger the actual api call
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    //res是实际传给api的
    const res = await userRequest.post(`/users`, user);
    //dispatch是传给state，只起到暂时的在interface上改变的效果，在数据库中并无改变
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

//product
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await publicRequest.get("/products");
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };
  
  export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
      //  we can comment this line if we don't really want to delete it; if this line is called, the item will be deleted from database instead of just on interface
      const res = await userRequest.delete(`/products/${id}`);
      //when we need to send something here to productSlice, we need the action in that function, and it will send the item in the () as the action.payload
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
  
  export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      // here we also doesn't really update on database. if we want to achieve that, we need to trigger the actual api call
      const res = await userRequest.put(`/products/${id}`, product);
      dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };

  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      //res是实际传给api的
      const res = await userRequest.post(`/products`, product);
      //dispatch是传给state，只起到暂时的在interface上改变的效果，在数据库中并无改变
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };