const initialState = {
	authorPages: [],
	publicationPages: [],
	authorReceptionPages: [],
	publicationReceptionPages: {
		documentIds: [],
		receptionIds: []
	},
	collectivePages: []
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_AUTHOR_PAGES":
			return {...state, authorPages: action.ids};
		case "SET_PUBLICATION_PAGES":
			return {...state, publicationPages: action.ids};
		case "SET_AUTHOR_RECEPTION_PAGES":
			return {...state, authorReceptionPages: action.ids};
		case "SET_PUBLICATION_RECEPTION_PAGES":
			return {
				...state,
				publicationReceptionPages: {
					documentIds: action.documentIds,
					receptionIds: action.receptionIds
				}
			};
		case "SET_COLLECTIVE_PAGES":
			return {...state, collectivePages: action.ids};
	}
	return state;
}