import axios from 'axios'
import { API_BASE_URL } from '../api'
import { LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_SUCCESS } from './authActionType'

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
        console.log(data.token)
         localStorage.setItem("token",data.token)
 
     }
     dispatch({type:REGISTER_SUCCESS,payload:data.token})
    } catch (error) {
     console.log("------",error)
     dispatch({type:REGISTER_FAILURE,payload:error})
     
    }
 }