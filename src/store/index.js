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
    customers: [],
    customer:{},
    vehicles:[],
    vehicle:{},
    orders:[]
  },
  getters: {
    customers: state => state.customers,
    customer: state => state.customer,
    vehicles: state => state.vehicles,
    vehicle: state => state.vehicle,
    orders: state => state.orders
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
            // Event.$emit('ApiError', 'Unable to add customer')
            console.log(err)
          })
    },
    getCustomers({commit}){
      instance('get','customers')
          .then((res)=>{
            commit('MUTATE', { state: 'customers', data: res.data.data.data })
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to get customers')
            console.log(err)
          })
    },
    getCustomer({commit}, id){
      instance('get',`customers/${id}`)
          .then((res)=>{
            commit('MUTATE', { state: 'customer', data: res.data.data })
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to get customer')
            console.log(err)
          })
    },
    updateCustomer({commit},payload){
      console.log(commit)
      instance('patch',`customers/${payload.id}`, payload)
          .then(()=>{
            router.push('/customers')
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to update customer')
            console.log(err)
          })
    },
    removeCustomer({dispatch}, id){
      instance('delete',`customers/${id}`)
          .then(()=>{
            Event.$emit('ApiSuccess', 'Customer Successfully removed')
            router.push('/customers')
            dispatch('getCustomers')
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to delete customer')
            console.log(err)
          })
    },
    addVehicle({dispatch}, payload){
      instance('post','fleet',payload)
          .then(()=>{
            dispatch('getVehicles')
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to add customer')
            console.log(err)
          })
    },
    getVehicles({commit}){
      instance('get','fleet')
          .then((res)=>{
            commit('MUTATE', { state: 'vehicles', data: res.data.data.data })
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to get vehicles')
            console.log(err)
          })
    },
    getVehicle({commit}, id){
      instance('get',`fleet/${id}`)
          .then((res)=>{
            commit('MUTATE', { state: 'vehicle', data: res.data.data })
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to get customer')
            console.log(err)
          })
    },
    updateVehicle({dispatch},payload){
      instance('patch',`fleet/${payload.id}`, payload)
          .then(()=>{
            Event.$emit('ApiSuccess', 'Vehicle Successfully updated')
            dispatch('getVehicles')
          })
          .catch((err)=>{
            Event.$emit('ApiError', 'Unable to update vehicle')
            console.log(err)
          })
    },
    removeVehicle({dispatch}, id){
      instance('delete',`fleet/${id}`)
          .then(()=>{
            Event.$emit('ApiSuccess', 'Vehicle Successfully removed')
            router.push('/vehicles')
            dispatch('getVehicles')
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to delete vehicle')
            console.log(err)
          })
    },
    getOrders({commit}){
      instance('get','orders')
          .then((res)=>{
            commit('MUTATE', { state: 'orders', data: res.data.data.data })
          })
          .catch((err)=>{
            // Event.$emit('ApiError', 'Unable to get orders')
            console.log(err)
          })
    },
  },
  modules: {
  }
})
