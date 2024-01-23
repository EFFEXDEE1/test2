<template>
  
   
  <p v-if="airQualityID === 0"> Luftqualität ist sehr gut</p>
  <p v-if="airQualityID === 1"> Luftqualität ist gut</p>
  <p v-if="airQualityID === 2"> Luftqualität ist mittelmäßig</p>
  <p v-if="airQualityID === 3"> Luftqualität ist schlecht</p>
  <p v-if="airQualityID === 4"> Luftqualität sehr schlecht</p>
  <p v-if="airQualityID === null"> Keine Luftqualitätsdaten vorhanden</p>

</template>

<script>
import axios from 'axios';

export default {
 props: {
   StationIDProp: {
     
     
   },
 },
 data() {
   return {
     stationData: [], // Aktualisierter Name für Luftqualitätsdaten
     
     airQualityID: null
   };
 },
 watch: {
  
 StationIDProp(newVal, oldVal) {
   this.getDataFromAPI();
   console.log('verändert');
 }

 },
 mounted() {
   
   this.getDataFromAPI();
 },
 methods: {
  async getDataFromAPI() {
  try {
    if (this.StationIDProp !== null) {
      const response = await axios.get(`http://localhost:3000/api/data2?argument=${this.StationIDProp}`);
      if (response.status === 200) {
        this.stationData = response.data;
        console.log('Luftqualität:', this.stationData);

        const stationID = this.StationIDProp;
        const currentDate = this.getTodaysDate();
        console.log(currentDate);

        if (this.stationData.data && this.stationData.data[stationID] && this.stationData.data[stationID][currentDate]) {
             this.airQualityID = this.stationData.data[stationID][currentDate][1];
          } else {
           
            this.airQualityID = null; 
            
                  } 

        console.log('Einzeln: Luftqualität:', this.airQualityID);
      } else {
        console.error('Fehler beim Abrufen der Daten:', response.statusText);
      }
    } else {
      this.airQualityID = null;
      return;
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
},
   getTodaysDate() {
     const today = new Date();
     const year = today.getFullYear();
     const month = String(today.getMonth() + 1).padStart(2, '0');
     const day = String(today.getDate()).padStart(2, '0');
     return `${year}-${month}-${day} 02:00:00`;
   },
 }
};
</script>
