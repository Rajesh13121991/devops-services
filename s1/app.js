const express = require('express');
const axios = require('axios');

const app = express();
const port = 3003;

app.use(express.json());

app.get('/calculate', async (req, res) => {
  const { a, b } = req.query;

  try {
    // Make a request to S1 to get the sum
    const sumResponse = await axios.get(`http://s1:3001/sum?a=${a}&b=${b}`);
    const sum = sumResponse.data.result;

    // Make a request to S2 to get the difference
    const diffResponse = await axios.get(`http://s2:3002/difference?a=${a}&b=${b}`);
    const diff = diffResponse.data.result;

    res.json({ sum, difference: diff });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`S3 listening at http://localhost:${port}`);
});
