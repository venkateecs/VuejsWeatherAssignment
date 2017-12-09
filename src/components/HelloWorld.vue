<template>
  <div class="hello">
  <h1 class='Heading'>Please Add Your City</h1>
  <input type='text' v-model="name">
  <input class="btn" type="button"  value="Save city" @click="saveCity"><span v-if="duplicateMessage" class="errorMessage">City Already Exists</span> <span v-if="errorMessage" class="errorMessage">Please Enter Valid City</span>
  <ul  v-for="(value, index) in cities" style="margin-top:1%;">
   <li class="cityalign">
     {{value}}
   </li>
   <img class="btn-delete" @click="deleteCity(index)" src="http://cdn1.iconfinder.com/data/icons/diagona/icon/16/101.png"/>
   <span class="weatherCity" @click="goToCityDetails(value)">
    click here for {{value}} weather forecast
   </span>
  </ul>
    <!--<ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/city">city</router-link></li>
    </ul>
    <router-view></router-view>-->   
  </div>
</template>

<script>
import store from '../store/store'
export default {
  name: 'HelloWorld',
  computed:{
    cities() {
      return store.state.cities;
    },
    errorMessage(){
      return store.state.errorMessage;
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name:'',
      duplicateMessage:false
    }
  },
  methods:{
    saveCity(){
      //store.commit('saveCity',this.name)
      let duplicateCheck=true;
      for(let i=0 ; i< store.state.cities.length ;i++) {
       if(store.state.cities[i] === this.name) {
         duplicateCheck=false
         break
       } 
      }
if(duplicateCheck == true){
  store.dispatch('saveCityActions', this.name) 
      this.name='';
      this.duplicateMessage=false;
}
else{
  this.duplicateMessage=true;
}
},
    deleteCity(argIndex) {
    store.commit('deleteCity',argIndex)
    },
    goToCityDetails(argCity){
     this.$router.push('/city/'+argCity);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.Heading{
  color:green;
  font-family:cursive
}
.btn{
  color:yellow;
  background-color:green;
}
.btn-delete {
    position: absolute;
    left: 55%;
    margin-left: -10px;
    margin-top: 0px;
    cursor: pointer;
}
.weatherCity{
  margin-right:1%;
  color:blue;
  font-family:'verdana';
  position:relative;
  right:-15%;
}
.cityalign{
  position:relative;
  right:-8%;
}
.weatherCity:hover{
  cursor:pointer;
  font-size:12px;
  font-weight: bold;
  /*position:relative;
  left:25%*/
}
.errorMessage{
  color:red;
  margin-left:1%;
  font-style: bold;
}
</style>
