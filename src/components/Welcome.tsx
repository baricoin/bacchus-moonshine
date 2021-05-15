import React, {useEffect, memo} from "react";
import {StyleSheet, View, LayoutAnimation, Platform, Image, Linking} from "react-native";
import {systemWeights} from "react-native-typography";
import XButton from "./XButton";
import { Text } from "../styles/components";

const updates = [
	"Cloned github://coreyphillips/moonshine",
	"Added support for Canada eCoin.",
	"Themed with Canada eCoin colours.",
];

const _Welcome = ({ onClose = () => null, children = <View /> } = {}) => {

	if (Platform.OS === "ios") useEffect(() => LayoutAnimation.easeInEaseOut());
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Canada eCoin - Mobile Multiwallet</Text>
			<View style={{ width: "100%" }}>
				{children}
				<Text style={[styles.subHeader, { textAlign: "center" }]}>Updates in this build include:</Text>
				{updates.map((update, i) => <Text key={update} style={styles.text}><Text style={styles.semiBoldText}>{i+1}. </Text>{update}</Text>)}

				<Text style={styles.subHeader}>Will you join us?</Text>

				<Text style={styles.text}>Find us in our community social channels:</Text>
				<Text
					onPress={() => Linking.openURL("https://twitter.com/CanadaeCoin").catch((e) => console.log(e))}
					style={[styles.text, { marginTop: 5 }]}
				>
					<Text style={styles.semiBoldText}>Twitter: </Text>@CanadaeCoin
				</Text>
				<Text
					onPress={() => Linking.openURL("https://discord.gg/Z8DufnQ").catch((e) => console.log(e))}
					style={[styles.text, { marginTop: 5 }]}
				>
					<Text style={styles.semiBoldText}>Discord:</Text>discord.gg/Z8DufnQ
				</Text>
				<Text
					onPress={() => Linking.openURL("http://keybase.io/team/CanadaeCoin").catch((e) => console.log(e))}
					style={[styles.text, { marginTop: 5 }]}
				>
					<Text style={styles.semiBoldText}>Keybase: </Text>keybase.io/team/CanadaeCoin
				</Text>
				<Text
					onPress={() => Linking.openURL("mailto:support@canadaecoin.foundation?subject=Requesting some help RE: the moonshine wallet.").catch((e) => console.log(e))}
					style={[styles.text, { marginTop: 5 }]}
				>
					<Text style={styles.semiBoldText}>Email: </Text>support@canadaecoin.foundation
				</Text>
			</View>
			<XButton style={{marginVertical: 30}} onPress={onClose} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		marginVertical: 10,
		paddingBottom: 20
	},
	icon: {
		width: 80, height: 80, marginBottom: 20
	},
	header: {
		...systemWeights.semibold,
		textAlign: "center",
		fontSize: 24
	},
	text: {
		...systemWeights.regular,
		fontSize: 15,
		alignSelf: "flex-start",
		textAlign: "left",
		marginTop: 10
	},
	semiBoldText: {
		...systemWeights.semibold,
		fontSize: 13,
		alignSelf: "flex-start",
		textAlign: "left",
		marginTop: 10
	},
	subHeader: {
		...systemWeights.light,
		fontSize: 15,
		alignSelf: "flex-start",
		textAlign: "left",
		marginTop: 20,
		...systemWeights.semibold
	}
});

//ComponentShouldNotUpdate
const Welcome = memo(
	_Welcome,
	(prevProps, nextProps) => {
		if (!prevProps || !nextProps) return true;
		return prevProps === nextProps;
	}
);

export default Welcome;
