const axios = require('axios')
const express = require('express')
const app = express()
const port = 3000

const apiKey = process.env.API_KEY

const baseEndpoint = `https://api.fillout.com/v1/api/forms`
const options = {
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
}

app.get('/:formId/filteredResponses', async (req, res) => {
  const formId = req.params['formId']
  console.log(req.query)
  try {
    const filloutResponse = await axios.get(`${baseEndpoint}/${formId}/submissions`, options)
    // console.log(filloutResponse.data)
    res.send('Hello World!')
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})