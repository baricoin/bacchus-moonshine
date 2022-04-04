class Clients {
	constructor() {
		this.coin = "baricoin";
		this.mainClient = {
			baricoin: false,
			bitcoin: false,
			litecoin: false,
			fujicoin: false,
			monacoin: false
		};
		this.peer = {
			baricoin: { port: 0, host: "", protocol: "" },
			bitcoin: { port: 0, host: "", protocol: "" },
			litecoin: { port: 0, host: "", protocol: "" },
			fujicoin: { port: 0, host: "", protocol: "" },
			monacoin: { port: 0, host: "", protocol: "" }
		};
		this.peers = {
			baricoin: [],
			bitcoin: [],
			litecoin: [],
			fujicoin: [],
			monacoin: []
		};
	}
	
	updateCoin(coin) {
		this.coin = coin;
	}
	
	updateMainClient(mainClient) {
		this.mainClient = mainClient;
	}
	
	updatePeer(peer) {
		this.peer = peer;
	}
	
}

module.exports = new Clients();
