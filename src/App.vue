<template>
  <article class="app">
    <article class="header container h-100 p-5">
      <h1 class="mb-5">Wetter Webseite</h1>
      <article class="d-flex justify-content-center h-100">
        <article class="searchbar w-50 mx-2">
          <input class ="input form-control" v-model="city" type="text" placeholder="Stadt eingeben">
        </article>
        <button class="btn-search btn btn-primary" @click="handleMultipleFunctions">Suchen</button>
      </article>
        <p>Du hast eingegeben: {{ city }}</p>
 
    </article>        
        <Koordinaten/>
        <airQuality/>  
     Hier steht das Wetter: <hr>
    <WetterDaten :city="city" v-if="showWeather"/>
    <luftDaten :StationIDProp="stationID" />
  </article>
</template>

<script>
import airQuality from "./components/airquality.vue";
import luftDaten from "./components/BerechneLuftDaten.vue";
import WetterDaten from "./components/WetterDaten.vue";
import Koordinaten from "./components/Map.vue"

export default {
  name: 'App',
  components: {
    airQuality,
    luftDaten,
    WetterDaten,
    Koordinaten,
  },
  data() {
    return {
      receivedData: [], 
      city: '',
      stationID: null, 
      showWeather: false,
      locationData: '',
    };
  },
  methods: {
    receiveData(data) {

      if(data.length>300) {
      this.receivedData = data;
      console.log('Empfangene Daten von der Kindkomponente:', this.receivedData);
      }
      else{
        this.city = data;

      console.log("app: ", this.receivedData)
      this.handleMultipleFunctions();
      }
     
    },
    submitInput() {
      const name = this.city;
      const tempID = this.lookForNameID(name);
      console.log('Name:', name, 'Station ID:', this.stationID); 
    },
    lookForNameID(name) {
      let id = null;
      for (let i = 0; i < this.receivedData.length; i++) {
        const currentName = this.receivedData[i].name;
        if (currentName === name) {
          id = this.receivedData[i].station;
          this.stationID = id; 
          console.log("ID:", id, "Name:", currentName);
          break;
        } else {
          this.stationID = null;
        }
      }
      return null;
    },
    async searchWeather(){
      this.showWeather = false;
      console.log('Searchweather')
      await this.$nextTick();
      this.showWeather = true;
    },
    handleMultipleFunctions() {
      this.searchWeather();
      this.submitInput();
  },
}
};
</script>

<style>
/*
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
 /*
kp für was man das oben braucht

ab hier neues Styling
*/

body {
  background-color: #121212 !important;
}
.app{
  background-color: aqua;

}

.header{
  background-color: #212730;
  border-radius: 20px;
  color: #fff;
  text-align: center;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-top: 5rem;
}
</style>

