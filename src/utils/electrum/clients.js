class Clients {
	constructor() {
		this.coin = "canadaecoin";
		this.mainClient = {
			canadaecoin: false,
			bitcoin: false,
			litecoin: false,
			bitcoinTestnet: false,
			litecoinTestnet: false
		};
		this.peer = {
			canadaecoin: { port: 0, host: "", protocol: "" },
			bitcoin: { port: 0, host: "", protocol: "" },
			litecoin: { port: 0, host: "", protocol: "" },
			bitcoinTestnet: { port: 0, host: "", protocol: "" },
			litecoinTestnet: { port: 0, host: "", protocol: "" }
		};
		this.peers = {
			canadaecoin: [],
			bitcoin: [],
			litecoin: [],
			bitcoinTestnet: [],
			litecoinTestnet: []
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
