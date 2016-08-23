const initialState = {
	authorPages: [],
	publicationPages: []
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_AUTHOR_PAGES":
			return {...state, authorPages: action.ids};
		case "SET_PUBLICATION_PAGES":
			return {...state, publicationPages: action.ids};
	}
	return state;
}