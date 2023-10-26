import axios from "axios"
// import { getToken, getUserData, removeToken, removeUserData } from "../helpers/authLocalStorage"
import { removeTokenCookie, removeUserDataCookie, getTokenCookie, getUserDataCookie} from "../helpers/authCookies"

export const API_BASE = 'http://localhost:8000/api/'
//export const API_BASE_STORAGE = 'http://127.0.0.1:8000/storage/'

export const API_BASE_UI_AVATARS = 'https://ui-avatars.com/api/'

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

      const e  = {
        code: 500,
        data: null,
        description:"Ocurrió un error en el servidor, Intente mas tarde",
      }

      const {response} = error
      return response?.data ? response?.data : e
    }
  )
}

export const initAxios = () => {

    axiosToken.defaults.baseURL = API_BASE

    axiosToken.interceptors.request.use( (configAxios) => {

        const session = getTokenCookie()
        const user = getUserDataCookie()
        console.log({
          headers:configAxios,
          user, session
        })
        if(session && user) {
            configAxios.headers = {
              'username': user.username,
              'Authorization': "Bearer "+ session?.token,
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
