const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

async function fetchDataFromExternalAPI(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// POST - Create a new item (Endpoint: /add-item)
app.post('/add-item', async (req, res) => {
  const { pantryId, basketKey } = req.body;
  const apiUrl = `https://getpantry.cloud/apiv1/pantry/f5b91c7d-266c-468d-82c6-7d9ac235ad2c/basket/${basketKey}`;
  
  try {
    const data = await fetchDataFromExternalAPI(apiUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});


app.get('/get-item', async (req, res) => {
  

  const apiUrl = `https://getpantry.cloud/apiv1/pantry/f5b91c7d-266c-468d-82c6-7d9ac235ad2c/basket/newbasket`;

  try {
    const data = await fetchDataFromExternalAPI(apiUrl);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.get('/list-buckets', async (req, res) => {
  const pantryId = req.params.pantryId;

  const apiUrl = `https://getpantry.cloud/apiv1/pantry/f5b91c7d-266c-468d-82c6-7d9ac235ad2c`;

  try {
    const data = await fetchDataFromExternalAPI(apiUrl);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: 'Items not found' });
  }
});

app.put('/update-item/:id', async (req, res) => {
  const id = req.params.id;
  const {  basketKey, payload } = req.body;

  const apiUrl = `https://getpantry.cloud/apiv1/pantry/f5b91c7d-266c-468d-82c6-7d9ac235ad2c/basket/newbasket`;

  try {
   
    const data = await axios.put(apiUrl, payload);
    res.json(data.data);
  } catch (error) {
    res.status(404).json({ message: 'Item not found' });
  }
});


app.delete('/delete-item/:id', async (req, res) => {
  const id = req.params.id;

  const apiUrl = `https://getpantry.cloud/apiv1/pantry/f5b91c7d-266c-468d-82c6-7d9ac235ad2c/basket/newbasket`;

  try {
    const data = await axios.delete(apiUrl);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
