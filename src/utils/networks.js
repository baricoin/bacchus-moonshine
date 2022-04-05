// https://en.bitcoin.it/wiki/List_of_address_prefixes
const networks = {
	baricoin: {
		messagePrefix: '\x19BariCoin Signed Message:\n',
		bech32: 'bari',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x1a,
		scriptHash: 0x15,
		wif: 0x9a
	},
	bitcoin: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80
	},
	litecoin: {
		messagePrefix: '\x19Litecoin Signed Message:\n',
		bech32: 'ltc',
		bip32: {
			public: 0x019da462,
			private: 0x019d9cfe
		},
		pubKeyHash: 0x30,
		scriptHash: 0x32,
		wif: 0xb0
	},
	fujicoin: {
		messagePrefix: '\x19FujiCoin Signed Message:\n',
		bech32: 'fc',
		bip32: {
			public: 0x019da462,
			private: 0x019d9cfe
		},
		pubKeyHash: 0x24,
		scriptHash: 0x10,
		wif: 0xa4
	},
	monacoin: {
		messagePrefix: '\x19Monacoin Signed Message:\n',
		bech32: 'mona',
		bip32: {
			public: 0x019da462,
			private: 0x019d9cfe
		},
		pubKeyHash: 0x32,
		scriptHash: 0x37,
		wif: 0xB0
	}
};

//Max amount of BTC/LTC. often be total amount +00000000
const maxCoins = {
	baricoin: 1000000000000000000,
	bitcoin: 2100000000000000,
	litecoin: 8400000000000000,
	fujicoin: 1000000000000000000,
	monacoin: 10512000000000000,
};

//Returns an array of all available coins from the networks object.
const availableCoins = Object.keys(networks).map(coin => coin);

const supportsRbf = {
	bitcoin: true,
	litecoin: false,
	baricoin: true,
	fujicoin: true,
	monacoin: true,
};

const zeroValueItems = {
	bitcoin: 0,
	litecoin: 0,
	baricoin: 0,
	fujicoin: 0,
	monacoin: 0,
	timestamp: null
};

const arrayTypeItems = {
	bitcoin: [],
	litecoin: [],
	baricoin: [],
	fujicoin: [],
	monacoin: [],
	timestamp: null
};

const objectTypeItems = {
	bitcoin: {},
	litecoin: {},
	baricoin: {},
	fujicoin: {},
	monacoin: {},
	timestamp: null
};

const defaultWalletShape = {
	id: "",
	name: "",
	type: "default",
	addresses: arrayTypeItems,
	addressIndex: zeroValueItems,
	changeAddresses: arrayTypeItems,
	changeAddressIndex: zeroValueItems,
	utxos: arrayTypeItems,
	transactions: arrayTypeItems,
	blacklistedUtxos: arrayTypeItems,
	confirmedBalance: zeroValueItems,
	unconfirmedBalance: zeroValueItems,
	lastUpdated: zeroValueItems,
	hasBackedUpWallet: false,
	walletBackupTimestamp: "",
	keyDerivationPath: {
		bitcoin: "84",
		bitcoinTestnet: "84",
		litecoin: "44",
		litecoinTestnet: "44",
		baricoin: "44",
		fujicoin: "44",
		monacoin: "44"
	},
	coinTypePath: {
		bitcoin: "0",
		bitcoinTestnet: "1",
		litecoin: "2",
		litecoinTestnet: "1",
		baricoin: "810",
		fujicoin: "75",
		monacoin: "22",
	},
	addressType: { //Accepts bech32, segwit, legacy
		bitcoin: "bech32",
		bitcoinTestnet: "bech32",
		litecoin: "legacy",
		litecoinTestnet: "legacy",
		baricoin: "legacy",
		fujicoin: "legacy",
		monacoin: "legacy",
	},
	rbfData: objectTypeItems
};

const getCoinImage = (coin = "bitcoin") => {
	try {
		coin = coin.toLowerCase();
		coin = coin.replace("testnet", "");

		switch (coin) {
			case "bitcoin":
				return require(`../assets/ecoins/bitcoin.png`);
			case "litecoin":
				return require(`../assets/ecoins/litecoin.png`);
			case "baricoin":
				return require(`../assets/ecoins/baricoin.png`);
			case "fujicoin":
				return require(`../assets/ecoins/fujicoin.png`);
			case "monacoin":
				return require(`../assets/ecoins/monacoin.png`);
			default:
				return require(`../assets/ecoins/baricoin.png`);
		}
	} catch (e) {
		return require(`../assets/ecoins/baricoin.png`);
	}
};

const getCoinData = ({ selectedCrypto = "baricoin", cryptoUnit = "BARI" }) => {
	try {
		let acronym = "BARI";
		let satoshi = "satoshi";
		let oshi = "sats";
		let blockTime = 1; //min
		switch (selectedCrypto) {
			case "bitcoin":
				satoshi = "satoshi";
				acronym = cryptoUnit === "satoshi" ? "sats" : "BTC";
				oshi = "sats";
				blockTime = 10;
				color = "#f7931a";
				return { acronym, label: "Bitcoin", crypto: "BTC", satoshi, oshi, blockTime, color };
			case "litecoin":
				satoshi = "litoshi";
				oshi = "lits";
				acronym = cryptoUnit === "satoshi" ? "lits" : "LTC";
				blockTime = 2.5;
				color = "#444444";
				return { acronym, label: "Litecoin", crypto: "LTC", satoshi, oshi, blockTime, color };
			case "baricoin":
				return {
					acronym: cryptoUnit === "satoshi" ? "sats" : "BARI",
					label: "Bari Coin",
					crypto: "BARI",
					satoshi: "satoshi",
					oshi: "sats",
					blockTime: 1,
					color: "#99ff33"
				};
			case "fujicoin":
				return {
					acronym: cryptoUnit === "satoshi" ? "sats" : "FJC",
					label: "Fuji Coin",
					crypto: "FJC",
					satoshi: "satoshi",
					oshi: "sats",
					blockTime: 1,
					color: "#3399ff"
				};
			case "monacoin":
				return {
					acronym: cryptoUnit === "watanabe" ? "sats" : "MONA",
					label: "Mona Coin",
					crypto: "Mona",
					satoshi: "satoshi",
					oshi: "sats",
					blockTime: 1.5,
					color: "#f7931a"
				};
			default:
				return {
					acronym: cryptoUnit === "satoshi" ? "sats" : "BARI",
					label: "Bari Coin",
					crypto: "BARI",
					satoshi: "satoshi",
					oshi: "sats",
					blockTime: 1,
					color: "#99ff33"
				};
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	networks,
	availableCoins,
	defaultWalletShape,
	maxCoins,
	supportsRbf,
	zeroValueItems,
	arrayTypeItems,
	getCoinImage,
	getCoinData
};
