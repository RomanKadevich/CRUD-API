import dotenv from 'dotenv'
import { server } from './server.js'

dotenv.config()

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(
    `Server is running on port %c${PORT}`,
    'color: blue; text-decoration: underline;',
  )
  console.log(`http://localhost:${PORT}/api/users/`)
})
