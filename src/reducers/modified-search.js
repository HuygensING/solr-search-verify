const initialState = {
	authors: {
		query: {
			searchFields: [],
			sortFields: []
		},
		results: {
			docs: [],
			facets: [],
			numFound: 0
		}
	}
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_PERSON_MODIFIED_SEARCH_STATE":
			return {...state, authors: action.state};
	}
	return state;
}