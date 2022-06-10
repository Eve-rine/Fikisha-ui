import Vue from 'vue'
import Vuex from 'vuex'
import instance from "@/service";
// import {jwtInterceptor} from "@/service/Interceptor";
import router from '../router'
Vue.use(Vuex)
const API_BASE_URL=process.env.VUE_APP_API;
export default new Vuex.Store({
  namespaced:true,
  state: {
    user: null,
    token: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    login({commit},payload){
      console.log(commit);
      instance('post',`${API_BASE_URL}auth/login`,payload)
          .then(res=>{
            localStorage.setItem('Fikisha_user', JSON.stringify(res.data.data))
            localStorage.setItem('Fikisha_token', res.data.token)
            Event.$emit('ApiSuccess', 'Logging In...')
            router.push('/')
          })
          .catch((err)=>{
            Event.$emit('ApiError', 'Incorrect credentials')
            console.log(err)
          })
    },
    logout(){
      instance('post',`${API_BASE_URL}logout`)
          .then(()=>{
              localStorage.clear();
              window.location.replace('/login')
          })
          .catch(err=>{
            console.log(err)
          })
    }
  },
  modules: {
  }
})
