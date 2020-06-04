import io from 'socket.io-client'
const socket = io.connect(process.env.VUE_APP_WS_URL)

export default socket
