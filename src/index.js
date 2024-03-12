const axios = require('axios')
const express = require('express')
const app = express()
const port = 3000

const apiKey = process.env.API_KEY

const baseEndpoint = `https://api.fillout.com/v1/api/forms`
const headers = {
  Authorization: `Bearer ${apiKey}`
}

app.get('/:formId/filteredResponses', async (req, res) => {
  const formId = req.params['formId']
  try {
    let filloutResponse = await axios.get(`${baseEndpoint}/${formId}/submissions`, {
      params: req.query,
      headers
    })

    let responseData = filloutResponse.data
    let filteredResponses = responseData.responses
    
    if (req.query['filters']?.length > 0) {
      let parsedFilters = JSON.parse(req.query['filters'])
      parsedFilters.forEach((filter) => {
        let responsesToRemove = []
        switch (filter.condition) {
          case 'equals':
            filteredResponses.forEach((response, responseIdx) => {
              let question = response.questions.find((question) => question.id === filter.id)
              if (question.value !== filter.value) {
                responsesToRemove.push(responseIdx)
              }
            })
            filteredResponses = filteredResponses.filter((response, index) => !responsesToRemove.includes(index))
            break;
          case 'does_not_equal':
            console.log(filter)
            filteredResponses.forEach((response, responseIdx) => {
              let question = response.questions.find((question) => question.id === filter.id)
              if (question.value === filter.value) {
                responsesToRemove.push(responseIdx)
              }
            })
            filteredResponses = filteredResponses.filter((response, index) => !responsesToRemove.includes(index))
            break;
        }
      })
    } else {
      res.send('No responses to display')
    }
    responseData = {
      ...responseData,
      responses: filteredResponses
    }
    res.send(responseData)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})