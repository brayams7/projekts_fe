import axios from "axios"
// import { getToken, getUserData, removeToken, removeUserData } from "../helpers/authLocalStorage"
import { removeTokenCookie, removeUserDataCookie, getTokenCookie, getUserDataCookie} from "../helpers/authCookies"

export const API_BASE = 'http://localhost:8000/api'
export const API_BASE_STORAGE = 'http://127.0.0.1:8000/storage/'

export const axiosIntance = axios.create({
    baseURL:API_BASE,
    headers:{
        "Content-Type":"application/json"
    }
})

/*
    Instancia para token
*/
export const axiosToken = axios.create({
    baseURL:API_BASE,
    headers:{
        "Content-Type":"application/json"
    }
})

//Interceptor

export const publicAxios = () => {
  axiosIntance.interceptors.response.use(
    function(response){
      return response.data
    },
    function(error){
      console.log("error interceptor", error)
      return error
    }
  )
}

export const initAxios = () => {

    axiosToken.defaults.baseURL = API_BASE

    axiosToken.interceptors.request.use( (configAxios) => {

        const token = getTokenCookie()
        const user = getUserDataCookie()
        console.log({
          headers:configAxios,
          user
        })
        if(token && user) {
            configAxios.headers = {
              'username': user.username,
              'Authorization': "Bearer "+ token,
              "Content-Type":"application/json",
              ...configAxios.headers
            }
        }

        return configAxios
    })

    axiosToken.interceptors.response.use(
      function (response) {
        return response.data
      },
      function (error) {
        if(typeof error.response != 'undefined' && typeof error.response.status != 'undefined' && error.response.status === 401) {
          console.log(error, 'response error 1')
          removeTokenCookie()
          removeUserDataCookie()
        }else {
          return error
        }
      }
    )
  }
