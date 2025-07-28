import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://nec-ocelot-gateway.necmettincimen.xyz',
})
export default instance
