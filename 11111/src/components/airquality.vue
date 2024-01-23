<template>
  <div>
    <p v-if="stationData.length === 0"> 
      Es gibt keine Stationen
    </p>
      
    <!-- <ul>
      <li v-for="(item, index) in activeStationsProp" :key="index">
        {{ item }}
      </li>
    </ul> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
   props: {
    activeStationsProp: Array, 
  },
  data() {
    return {
      stationData: [],
      allStations: [],
    };
  },
  mounted() {
   
    this.getDataFromAPI();
  },
  methods: {
    async getDataFromAPI() {
      try {
        const response = await axios.get('http://localhost:3000/api/data');
        if (response.status === 200) {
          this.allStations = response.data.data; 
          console.log('Alle Stationen:', this.allStations);
          
          this.putStationData();
          this.sendDataToParent();
        } else {
          console.error('Fehler beim Abrufen der Daten:', response.statusText);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    },

    putStationData() {
  for (let i = 0; i < 10500; i++) {
        

    if(this.allStations[i]) {
        const station = this.returnStationData(i);
        
        this.stationData.push(station);
  }
    
  }
   
},
   
returnStationData(index){
    const station = this.allStations[index][0]
    const name = this.allStations[index][3];
    const stationObj = {
    station: station,
    name: name
  };

  return stationObj;
    
},
sendDataToParent() {
  const dataToSend = this.stationData;
  this.$parent.receiveData(dataToSend);
},
  }
};
</script>


