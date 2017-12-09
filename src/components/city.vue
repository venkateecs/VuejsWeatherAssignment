<template>
  <div class="city">
  <button type="button" class="btn btn-primary active" @click="back">Back</button>
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
      <tr v-for="(data,index) in dataValues.list" v-if="index%8 === 0">
        <td>{{formatDate(data.dt_txt)}}</td>
        <td>{{data.weather[0].description}}</td>
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
export default {
  name: 'city',
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
    }
  }
}
</script>
<style scoped>
.btn btn-primary active{
  float:right
}
</style>