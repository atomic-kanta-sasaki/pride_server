import express from 'express'
import router from './router'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const allowedOrigins = ['http://localhost:3000']

const options: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors(options))
app.use('/api', router)

app.listen(5000, () => {
  console.log('listening on port 5000')
})

export default app