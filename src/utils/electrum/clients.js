class Clients {
	constructor() {
		this.coin = "canadaecoin";
		this.mainClient = {
			canadaecoin: false,
			auroracoin: false,
			egulden: false,
			bitcoin: false,
			litecoin: false

		};
		this.peer = {
			canadaecoin: { port: 0, host: "", protocol: "" },
			auroracoin: { port: 0, host: "", protocol: "" },
			egulden: { port: 0, host: "", protocol: "" },
			bitcoin: { port: 0, host: "", protocol: "" },
			litecoin: { port: 0, host: "", protocol: "" }
		};
		this.peers = {
			canadaecoin: [],
			auroracoin: [],
			egulden: [],
			bitcoin: [],
			litecoin: []
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
