<template>
    <h1>Your Coordinates:</h1>
   
    

</template>
<script>
    import deCities from './de.json'
    export default {
        data() {
            return {
                customCoordinates: {
                    lat: '0',
                    lng: '0',
                    location: ''
                },
                currentCoordinates: {
                    lat: '0',
                    lng: '0',
                },
                dataVue: deCities,
                currentPostion: false
            }
        },
        methods: {
            getYourLocation() {
                const success = (position) => {
                    this.currentCoordinates.lat = position.coords.latitude;
                    this.currentCoordinates.lng = position.coords.longitude;
                    this.getClosestCity();
                    this.sendDataToParent();
                };
                const error = (err) => {
                    console.log(error)
                };
                navigator.geolocation.getCurrentPosition(success, error);


            },
            getClosestCity() {
                let leastDistance, currentDistance, currentLatDiff, currentLngDiff, city, index;
                for(const i in deCities) {
                    currentLatDiff = this.currentCoordinates.lat-deCities[i].lat;
                    currentLngDiff = this.currentCoordinates.lng-deCities[i].lng;;
                    if(currentLatDiff < 0) {
                        currentLatDiff = currentLatDiff+(-2*currentLatDiff);
                    }
                    if(currentLngDiff < 0) {
                        currentLngDiff = currentLngDiff+(-2*currentLngDiff);
                    }
                    currentDistance = currentLatDiff+currentLngDiff;
                    if(i == 0) {
                        leastDistance = currentDistance

                    } 
                    if(currentDistance < leastDistance) {
                        leastDistance = currentDistance;
                        index = i;
                    }
                }
                this.customCoordinates.location = deCities[index].city;
                this.customCoordinates.lat = deCities[index].lat;
                this.customCoordinates.lng = deCities[index].lng;
            },
             sendDataToParent() {
                 const locationData = this.customCoordinates.location;

                 console.log("test: " ,locationData)
               this.$parent.receiveData(locationData);
             },
        },
        created() {
            this.getYourLocation();
        }
    }
</script>
<style>
</style>
<!-- data.data[i].city == "stuttgart" -->
<!-- JSON.parse() "zum versenden" -->   
<!-- JSON.stringfy() "zum lokal Ã¼bersetzen" -->