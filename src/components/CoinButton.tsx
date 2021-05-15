import React, { memo } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	Image
} from "react-native";
import PropTypes from "prop-types";
import { systemWeights } from "react-native-typography";
import bitcoinUnits from "bitcoin-units";
import { Text, View } from "../styles/components";

const { eCoinCore } = require("../utils/ecoincore");


const {
	formatNumber,
	getFiatBalance,
	getExchangeRate
} = require("../utils/helpers");

const {
	getCoinImage,
	getCoinData
} = require("../utils/networks");


interface FormatBalance {
	coin: string,
	cryptoUnit: string,
	balance?: number
}

const formatBalance = ({ coin = "", cryptoUnit = "satoshi", balance = 0 }: FormatBalance): string => {
	try {
		let formattedBalance = "0";
		if (balance === 0 && cryptoUnit === "BTC") {
			formattedBalance = "0";
		} else {
			//This prevents the view from displaying 0 for values less than 50000 BTC
			if (balance < 50000 && cryptoUnit === "BTC") {
				formattedBalance = `${(Number(balance) * 0.00000001).toFixed(8)}`;
			} else {
				formattedBalance = bitcoinUnits(balance, "satoshi").to(cryptoUnit).value();
			}
		}
		formattedBalance = formatNumber(formattedBalance);
		return `${formattedBalance} ${getCoinData({ selectedCrypto: coin, cryptoUnit }).acronym}`;
	} catch (e) {
		return "0";
	}
};

interface CoinButtonComponent {
	onCoinPress: Function,
	cryptoUnit: string,
	coin: string,
	label: string,
	walletId: string,
	balance?: number
}

const getCryptoLabel = ({ selectedCrypto = "bitcoin" } = {}) => {
	try {
		return getCoinData({ selectedCrypto }).label;
	} catch (e) {
		console.log(e);
	}
};

const _CoinButton = ({ onCoinPress, cryptoUnit, coin, label, walletId, balance, fiatValue, fiatSymbol = "$"}: CoinButtonComponent) => {
	let acronym = getCoinData({ selectedCrypto: coin, cryptoUnit }).acronym
	let exchangeRate = 0;
	let fiatRate = 0;

	if(eCoinCore.collections && eCoinCore.collections.ExchangeRates){
		exchangeRate = eCoinCore.collections.ExchangeRates.findOne({call: acronym});
		if(!exchangeRate) return '?';
		exchangeRate = exchangeRate.rate

		fiatRate = eCoinCore.collections.ExchangeRates.findOne({call: String("CAD").toUpperCase()})
		if(!fiatRate) return '?';
		fiatRate = fiatRate.rate
	}

	let fiatPrice = Number(exchangeRate / fiatRate)
	let fiatBalance = Number(fiatPrice * (balance/100000000)).toFixed(2);

	if(fiatPrice < .01) { 
		fiatPrice = Number(fiatPrice).toFixed(4);
	} else if(fiatPrice < 0.1) {
		fiatPrice = Number(fiatPrice).toFixed(3);
	} else fiatPrice = Number(fiatPrice).toFixed(2);


	let brandStyle = {
		width: "100%",
		flexDirection: "row",
		backgroundColor: `${getCoinData({selectedCrypto:coin}).color}22`,
		borderColor: `${getCoinData({selectedCrypto:coin}).color}`,
		borderWidth: 1,
		borderRadius: 6,
		marginBottom: 6,
	}

	return (
		<TouchableOpacity key={`${coin}${walletId}`} onPress={() => onCoinPress({coin, walletId})} style={brandStyle}>
			<View type="card" style={styles.buttonContent}>
				<Image
					style={styles.buttonImage}
					source={getCoinImage(coin)}
				/>
				<Text type="text" style={styles.subText}>{getCoinData({selectedCrypto:coin}).label}</Text>
				<Text type="text" style={styles.text}>{fiatSymbol} {formatNumber(fiatBalance)}</Text>
				<Text type="text" style={styles.balanceText}>{formatBalance({ balance, coin, cryptoUnit })} @ {fiatPrice} CAD</Text>
			
			</View>
		</TouchableOpacity>
	);
};

_CoinButton.propTypes = {
	onCoinPress: PropTypes.func.isRequired,
	cryptoUnit: PropTypes.string.isRequired,
	coin: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	walletId: PropTypes.string.isRequired,
	balance: PropTypes.number
};

const styles = StyleSheet.create({
	button: {
		width: "82%",
		minHeight: 60,
		flexDirection: "row",
		backgroundColor: "transparent",
		marginBottom: 15
	},
	buttonContent: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "center",
		padding: 10
	},
	buttonImage: {
		width: 64,
		height: 64,
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		left: 4
	},
	text: {
		...systemWeights.semibold,
		fontSize: 24,
		textAlign: "right"
	},
	subText: {
		...systemWeights.regular,
		fontSize: 12,
		textAlign: "right"
	},
	balanceText: {
		...systemWeights.regular,
		fontSize: 12,
		textAlign: "right"
	}
});


//ComponentShouldNotUpdate
const CoinButton = memo(
	_CoinButton,
	(prevProps, nextProps) => {
		if (!prevProps || !nextProps) return true;
		return prevProps.label === nextProps.label && prevProps.balance === nextProps.balance;
	}
);

export default CoinButton;
