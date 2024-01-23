
const cors = require('cors');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(cors()); 



function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0'); 

  return `${year}-${month}-${day}`;
}

const currentDate = getTodayDate();

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://www.umweltbundesamt.de/api/air_data/v3/stations/json?use=airquality&lang=de&date_from=2023-01-01&date_to=null&time_from=0&time_to=24');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});

app.get('/api/data2', async (req, res) => {
  const argument = req.query.argument; 

  if (!argument) {
    return res.status(400).json({ error: 'Kein Argument übergeben' });
  }

  try {
    const response = await axios.get(`https://www.umweltbundesamt.de/api/air_data/v3/airquality/json?date_from=${currentDate}&time_from=3&date_to=null&time_to=3&station=${argument}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
}); 

app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});

