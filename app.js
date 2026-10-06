const app_id = 1089;
const api_token = 'YOUR_DERIV_API_TOKEN';

const ws = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

ws.onopen = () => {
  console.log('Connected to Deriv WebSocket API');
  ws.send(JSON.stringify({ authorize: api_token }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.msg_type === 'authorize') {
    console.log('Authorized successfully!');
    ws.send(JSON.stringify({ ticks: 'R_100' }));
  }

  if (data.msg_type === 'tick') {
    const priceElement = document.getElementById('price');
    if (priceElement) {
      priceElement.innerText = data.tick.quote;
    }
  }
};
