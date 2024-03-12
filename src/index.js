const axios = require('axios')
const express = require('express')
const app = express()
const port = 3000

const apiKey = 'sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912'
const formId = 'cLZojxk94ous'
const endpoint = `https://api.fillout.com/v1/api/forms/${formId}/submissions`

app.get('/', async (req, res) => {
  try {
    const filloutResponse = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
    console.log(filloutResponse.data)
    res.send('Hello World!')
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})