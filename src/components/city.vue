<template>
  <div class="city">
  <button type="button" class="btn btn-primary active" @click="back">Back</button>
  <select class="cityDropDown" v-model="title" @change="changeCity">
  <option v-for="city in cities" :value="city">
  {{city}}
  </option>
</select> 
  <h1>Welcome to {{title}} Weather Report</h1>
<div class="table-responsive">          
  <table class="table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Minimum Temperature</th>
        <th>Maximum Temperature</th>
        <th>Normal Temperature</th>
        <th>Humidity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data,index) in dataValues.list" v-if="index % 8 === 0">
        <td>{{formatDate(data.dt_txt)}}</td>
        <td>
        {{data.weather[0].description}}
        <img v-if="data.weather[0].description === 'clear sky'" src="http://openweathermap.org/img/w/01d.png">
        <img v-if="data.weather[0].description === 'few clouds'" src="http://openweathermap.org/img/w/02d.png">
        <img v-if="data.weather[0].description === 'scattered clouds'" src="http://openweathermap.org/img/w/03d.png">
        <img v-if="data.weather[0].description === 'broken clouds' " src="http://openweathermap.org/img/w/04d.png">
        <img v-if="data.weather[0].description === 'shower rain'" src="http://openweathermap.org/img/w/09d.png">
        <img v-if="data.weather[0].description === 'rain'" src="http://openweathermap.org/img/w/10d.png">
        <img v-if="data.weather[0].description === 'thunderstorm'" src="http://openweathermap.org/img/w/11d.png">
        <img v-if="data.weather[0].description === 'snow'" src="http://openweathermap.org/img/w/13d.png">
        <img v-if="data.weather[0].description === 'mist' || data.weather[0].description === 'smoke' || data.weather[0].description === 'haze' || data.weather[0].description === 'fog'" src="http://openweathermap.org/img/w/50d.png">
        <img v-if="data.weather[0].description === 'overcast clouds'" src="http://openweathermap.org/img/w/04n.png">
        <img v-if="data.weather[0].description === 'light rain'" src="http://openweathermap.org/img/w/10d.png">
        </td>
        <td>{{tempCalculation(data.main.temp_min)}}</td>
        <td>{{tempCalculation(data.main.temp_max)}}</td>
        <td>{{tempCalculation(data.main.temp)}}</td>
        <td>{{data.main.humidity}}</td>
      </tr>
    </tbody>
  </table>
  </div>
</div>
  </div>
</template>

<script>
import store from '../store/store'
export default {
  name: 'city',
  computed:{
    cities() {
      return store.state.cities;
    }
  },
  data () {
    return {
      msg: 'Welcome to Hyderabad',
      title:this.$route.params.name,
      dataValues:[]
    }
  },
  created() {
    this.$http.get('http://api.openweathermap.org/data/2.5/forecast?q='+this.title+',IN&appid=1c407f68b72190cff18512e643ceac0e')
        .then(function(res){
           this.dataValues=res.body;
        })
  },
  methods:{
    back(){
      this.$router.go(-1);
    },
    tempCalculation(arg) {
      let getData=arg;
      getData=getData-273.15;
      getData=getData.toFixed(1)
      return getData+" degrees"
    },
    formatDate(argDate) {
       let splitdate=argDate.split('-');
       let formTheDate=splitdate[2].substring(-2,3).trim()+"-"+splitdate[1]+"-"+splitdate[0]
        return formTheDate
    },
    changeCity() {
      this.$http.get('http://api.openweathermap.org/data/2.5/forecast?q='+this.title+',IN&appid=1c407f68b72190cff18512e643ceac0e')
        .then(function(res){
           this.dataValues=res.body;
        })
    }
  }
}
</script>
<style scoped>
.btn btn-primary active{
  float:right
}
.cityDropDown{
  position:relative;
  left:5%;
  color:white;
  background-color: #286090;
  height:50%;
  width:10%;
  border-radius:3px;
}
</style>