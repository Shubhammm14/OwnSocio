import axios from 'axios'
import { API_BASE_URL } from '../api'
import { FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS, SEARCHED_USER_FAILURE, SEARCHED_USR_FAILURE, SEARCHED_USR_REQUEST, SEARCHED_USR_SUCCESS, SEARCHED_usr_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_SUCCESS, USER_SUGESSION_REQUEST, USER_SUGGESION_FAILURE, USER_SUGGESION_SUCCESS } from './authActionType'

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
 export const getSearchUserProfile=(id)=>async(dispatch)=>{
  console.log("....",id)
  dispatch({type:SEARCHED_USR_REQUEST})
  try {
    const {data}=await axios.get(`${API_BASE_URL}/Api/user/profile/${id}`,{
    headers: {
        Authorization:`Bearer ${localStorage.getItem('token')}`,
    },
})

    
    dispatch({type:SEARCHED_USR_SUCCESS,payload:data})
} catch (error) {
    dispatch({type:SEARCHED_USR_FAILURE,payload: error})
}
 }
 export const getProfileAction=(jwt)=>async(dispatch)=>{
    try {
        const {data}=await axios.get(`${API_BASE_URL}/Api/user/profile/${-1}`,{
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
    console.log(reqData)
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
  export const findSuggestions=()=>async(dispatch)=>{
    dispatch({type:USER_SUGESSION_REQUEST})
     try {
        const {data}=await axios.get(`${API_BASE_URL}/Api/random/unfollowing/user/`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        
        dispatch({type:USER_SUGGESION_SUCCESS,payload:data})
     } catch (error) {
      dispatch({type:USER_SUGGESION_FAILURE,payload:error})
     }
  }
  export const followUser=({itemId})=>async(dispatch)=>{
    dispatch({type:FOLLOW_USER_REQUEST})
     try {
        const {data}=await axios.put(`${API_BASE_URL}/Api/follow/user/${itemId}`,{},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        dispatch({type:FOLLOW_USER_SUCCESS,payload:data})
     } catch (error) {
      dispatch({type:FOLLOW_USER_FAILURE,payload:error})
     }
  }




