import axios from 'axios'
import { API_BASE_URL } from '../api'
import { GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_SUCCESS } from './authActionType'

export const loginUserAction=(loginData)=>async(dispatch)=>{
  
  try {
    const {data}=await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data)
    
    if(data.token){
        localStorage.setItem("token",data.token)

    }
    dispatch({type:LOGIN_SUCCESS,payload:data.token})
   } catch (error) {
    console.log("------",error)
    dispatch({type:LOGIN_FAILURE,payload:error})
    
   }
}
export const registerUserAction=(signupData)=>async(dispatch)=>{
    try {
     const {data}=await axios.post(`${API_BASE_URL}/auth/signup`,signupData.data)
     if(data.token){
      
         localStorage.setItem("token",data.token)
 
     }
     dispatch({type:REGISTER_SUCCESS,payload:data.token})
    } catch (error) {
     console.log("------",error)
     dispatch({type:REGISTER_FAILURE,payload:error})
     
    }
 }
 export const getProfileAction=(jwt)=>async(dispatch)=>{
    try {
        const {data}=await axios.get(`${API_BASE_URL}/Api/user/profile`,{
        headers: {
            Authorization:`Bearer ${jwt}`,
        },
    })

        
        dispatch({type:GET_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_PROFILE_FAILURE,payload: error})
    }
 }
 export const updateProfileAction = (reqData) => async (dispatch) => {
    
    try {
      const { data } = await axios.put(`${API_BASE_URL}/Api/update/user`, reqData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const searchUserAction=(query)=>async(dispatch)=>{
    console.log("sh")
  dispatch({type:SEARCH_USER_REQUEST})
  try {
    const {data}=await axios.get(`${API_BASE_URL}/Api/user/search?query=${query}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      
    })
    console.log(data);
    dispatch({type:SEARCH_USER_SUCCESS,payload:data})
  } catch (error) {
    dispatch({type:SEARCH_USER_FAILURE,payload:error})
  }
  }




