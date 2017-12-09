import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
const http=Vue.http


export default new Vuex.Store({
    state:{
        cities:[],
        errorMessage:false
    },
    mutations:{
    saveCity(state,name) {
        http.get('http://api.openweathermap.org/data/2.5/forecast?q='+name+',IN&appid=1c407f68b72190cff18512e643ceac0e')
        .then(function(res){
            state.cities.push(name);
            state.errorMessage=false;
        }).catch((err)=>{
            state.errorMessage=true;
        })
      },
      deleteCity(state,getindex){
        state.cities.splice(getindex,1);
      }
    },
    actions:{
        saveCityActions({commit},payload){
            commit('saveCity', payload)
        }
    }
})