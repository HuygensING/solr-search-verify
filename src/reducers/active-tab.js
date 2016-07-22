const initialState = "persons";

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_ACTIVE_TAB":
			return action.tab;
	}
	return state;
}