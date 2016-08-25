const initialState = {
	id: null,
	collection: null,
	nodes: [],
	links: [],
	table: { }
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_GRAPH":
			return {
				...state,
				id: action.id,
				collection: action.collection,
				data: action.response
			};
		case "RECEIVE_GRAPH_TABLE":
		/*
		 type: "RECEIVE_GRAPH_TABLE",
		 response: JSON.parse(body),
		 id: id,
		 collection: collection
		 */
			return {
				...state,
				table: {
					id: action.id,
					data: action.response,
					collection: action.collection
				}
			};
		default:
			return state;
	}
}