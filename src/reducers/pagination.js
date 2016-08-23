const initialState = {
	authorPages: []
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_AUTHOR_PAGES":
			return {...state, authorPages: action.ids};
	}
	return state;
}