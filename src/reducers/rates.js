// @flow weak
import * as actions from "../actions"
let counter = 0;

module.exports = (state = {}, action) => {
	if (action.type === actions.EXCHANGE_RATES_UPDATED) {
		return {
			...state,
			[action.payload.call]: action.payload
		};

	// } else if (action.type === "ExchangeRatesAdded") {
	// 	return [
	// 		...state,
	// 		{


	// 		}
	// 	];

	} else return state;
}

