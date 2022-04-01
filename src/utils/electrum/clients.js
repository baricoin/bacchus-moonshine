class Clients {
	constructor() {
		this.coin = "baricoin";
		this.mainClient = {
			baricoin: false,
			bitcoin: false,
			litecoin: false,
			litecoin: false,

		};
		this.peer = {
			baricoin: { port: 0, host: "", protocol: "" },
			bitcoin: { port: 0, host: "", protocol: "" },
			litecoin: { port: 0, host: "", protocol: "" },
			fujicoin: { port: 0, host: "", protocol: "" },
		};
		this.peers = {
			baricoin: [],
			bitcoin: [],
			litecoin: [],
			fujicoin: [],
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
