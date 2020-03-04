import  Vue from 'vue'
import Vuex from 'vuex'

import  counter from './modules/counter';
import  cart from './modules/cart';
import  user from './modules/user';
import  classify from './modules/classify/index';
import  login from './modules/login/index';



import  index from './modules/home/index';






Vue.use(Vuex);

export default new Vuex.Store({
   modules:{
       counter:counter,
       cart,
       user,
       classify,
       login,
       index
   }
})