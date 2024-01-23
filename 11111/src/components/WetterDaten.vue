<template>
    Stadt: {{ city }} <br>
    Temp: {{ temperature }} <br>
    Name: {{ name }} <br>
    Beschr: {{ description }}<img :src="iconUrl"> <br>
    Datum: {{ date }} <br>
    Uhrzeit: {{ time }} <br>

</template>
  
<script>
import axios from 'axios';


  export default {
    name: 'WetterDaten',
    props:{
        city: String,
    },
    data(){
        return{
            temperature: null,
            description: null,
            iconUrl: null,
            date: null,
            name: null,
            time: null,
            monthNames: [
            "Januar", "Februar", "MÃ¤rz", "Apri", "Mai", "Juni", "Juli", "August", 
            "September", "Oktober", "November", "Dezember"]
        }
    },
    
    components: {
    },
    async created(){
        console.log('test')
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=af0a2eca014f21d3b56e1a73630d1963`);
        
        const weatherData = response.data;
        this.temperature = weatherData.main.temp;
        this.description = weatherData.weather[0].description;
        this.name = weatherData.name;
        this.iconUrl = `https://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        const d = new Date();
        this.date = d.getDate() +" "+ this.monthNames[d.getMonth()] +" "+ d.getFullYear();
        this.time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        console.log(weatherData);
    }
  }

</script>

<style>


</style>