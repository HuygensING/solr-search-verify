const initialState = {
	id: null,
	collection: null,
	nodes: [],
	links: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_GRAPH":
			return {
				id: action.id,
				collection: action.collection,
				data: action.response
			};
		default:
			return state;
	}
}