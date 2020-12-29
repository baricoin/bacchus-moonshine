// CDN TODO: AsyncStorage has been extracted from react-native core and will be removed in a 
// future release. It can now be installed and imported from '@react-native-community/async-storage' 
// instead of 'react-native'. 
// See https://github.com/react-native-community/async-storage

import DDP from "react-ddp";
import minimongo from "minimongo-cache";

process.nextTick = setImmediate; //react-native polyfill

Marsha = new DDP({
	SocketConstructor: WebSocket,
	endpoint:"wss://marsha.ourcoin.ca/websocket",
	debug:true,
	autoConnect: true,
	autoReconnect: true,
	reconnectInterval: 10000
});

Marsha.collections=new minimongo();

Marsha.subscribe({
	data: { rates: ["USD", "CAD", "CDN", "BTC", "LTC"]},
	name: "ExchangeRates"
});

Marsha.on('added', function(data){
	if (!Marsha.collections[data.collection]) Marsha.collections.addCollection(data.collection);
	Marsha.collections[data.collection].upsert({_id: data.id, ...data.fields})
});

Marsha.on('changed', function(data){
	Marsha.collections[data.collection].upsert({_id: data.id, ...data.fields});
});

Marsha.on('removed', function(data){
	Marsha.collections[data.collection].remove({_id:data.id});
});

ExchangeRates = Marsha.collections['exchangeRates'];
module.exports = {
	Marsha,
	ExchangeRates
};

