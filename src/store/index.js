import Vue from 'vue'
import Vuex from 'vuex'
import instance from "@/service";
// import {jwtInterceptor} from "@/service/Interceptor";
import router from '../router'
Vue.use(Vuex)
export default new Vuex.Store({
  namespaced:true,
  state: {
    user: null,
    token: null,
    customers: []
  },
  getters: {
    customers: state => state.customers,
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.data
    }
  },
  actions: {
    login({commit}, payload){
      console.log(commit)
      instance('post',`auth/login`,payload)
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
      instance('post',`logout`)
          .then(()=>{
              localStorage.clear();
              router.push('/login')
            })
          .catch(err=>{
            console.log(err)
          })
    },
    addCustomer({commit}, payload){
      console.log(commit)
      instance('post','customers',payload)
          .then(()=>{
            router.push('/customers')
          })
          .catch((err)=>{
            Event.$emit('ApiError', 'Unable to add customer')
            console.log(err)
          })
    },
    getCustomers({commit}){
      instance('get','customers')
          .then((res)=>{
            commit('MUTATE', { state: 'customers', data: res.data.data.data })
          })
          .catch((err)=>{
            Event.$emit('ApiError', 'Unable to get customers')
            console.log(err)
          })
    },
    getCustomer({commit}, id){
      instance('patch',`customers/${id}`)
          .then((res)=>{
            commit('MUTATE', { state: 'customer', data: res.data.data })
          })
          .catch((err)=>{
            Event.$emit('ApiError', 'Unable to get customer')
            console.log(err)
          })
    },
    updateCustomer(payload){
      instance('patch',`customers/${payload.id}`, payload)
          .then(()=>{
            router.push('/customers')
          })
          .catch((err)=>{
            Event.$emit('ApiError', 'Unable to update customer')
            console.log(err)
          })
    },
    removeCustomer({dispatch}, id){
      instance('delete',`customers/${id}`)
          .then(()=>{
            dispatch('getCustomers')
          })
          .catch((err)=>{
            Event.$emit('ApiError', 'Unable to delete customer')
            console.log(err)
          })
    },
  },
  modules: {
  }
})
