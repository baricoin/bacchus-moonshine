// CDN TODO: AsyncStorage has been extracted from react-native core and will be removed in a 
// future release. It can now be installed and imported from '@react-native-community/async-storage' 
// instead of 'react-native'. 
// See https://github.com/react-native-community/async-storage

// We grab a websocket to listen for new exchange rates and available electrum servers
// https://www.npmjs.com/package/react-ddp
import DDP from "react-ddp";

// Using react-ddp with minimongo-cache is relatively easy because of how DDP messages are structured
import minimongo from "minimongo-cache";

const ECC_HOST = 'beta-api.ecoincore.com'
const DEBUG = false;

process.nextTick = setImmediate; //react-native polyfill

// let ECC_HOST = 'ecoincore.com'
let eCoinCore = new DDP({
	SocketConstructor: WebSocket,
	endpoint:`wss://${ECC_HOST}/websocket`,
	debug:false,
	// debug:true, // Uncomment this if you want the ddp traffic messages barfed into the console log
	autoConnect: true,
	autoReconnect: true,
	reconnectInterval: 10000,
	appId: "cdn-moonshine-beta-1",
});

eCoinCore.collections=new minimongo();
eCoinCore.collections.debug = false;

eCoinCore.subscribe({ name: "ExchangeRates", data: { rates: ["USD", "CAD", "CDN", "BTC", "LTC", "UNO"]} });
eCoinCore.subscribe({ name: "Chainpacks" });

eCoinCore.collections.addCollection("ExchangeRates");
eCoinCore.collections.addCollection("Chainpacks");


eCoinCore.on('added', function(data){
	if (!eCoinCore.collections[data.collection]){
		console.log('creating in-memory collection:', data.collection)
		eCoinCore.collections.addCollection(data.collection);
	}
	eCoinCore.collections[data.collection].upsert({_id: data.id, ...data.fields})
});

eCoinCore.on('changed', function(data){
	if(DEBUG) console.log('changed', data.collection)
	eCoinCore.collections[data.collection].upsert({_id: data.id, ...data.fields});
});

eCoinCore.on('removed', function(data){
	if(DEBUG) console.log('removed', data.collection)
	eCoinCore.collections[data.collection].remove({_id:data.id});
});

let Chainpacks = eCoinCore.collections['Chainpacks'];
let ExchangeRates = eCoinCore.collections['ExchangeRates'];

module.exports = {
	eCoinCore,
	ExchangeRates,
	Chainpacks
};
