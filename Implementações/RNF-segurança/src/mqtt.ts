import mqtt from "mqtt"

// Não sei se vai querer fazer com mosquito aqui ?
// mqtt://test.mosquitto.org
const client = mqtt.connect("")

client.on("connect",()=>{
    client.subscribe('presence')
    client.publish('presence', 'Hello mqtt')
})