import { setDocumentFiltersFromPersonQuery } from "./search-clients/document-search-client";
import { setDocumentReceptionsFiltersFromDocumentQuery } from "./search-clients/document-reception-search-client";
import { setPersonReceptionsFiltersFromPersonQuery } from "./search-clients/person-reception-search-client";


export default function actionsMaker(navigateTo, dispatch) {
	const actions = {
		onAuthorSearchChange: (state) => {
			setDocumentFiltersFromPersonQuery(state);
			setPersonReceptionsFiltersFromPersonQuery(state);
			dispatch({type: "SET_PERSON_SEARCH_STATE", state: state});
		},

		onPublicationSearchChange: (state) => {
			setDocumentReceptionsFiltersFromDocumentQuery(state);
			dispatch({type: "SET_DOCUMENT_SEARCH_STATE", state: state});
		},

		onAuthorReceptionSearchChange: (state) => {
			dispatch({type: "SET_PERSON_RECEPTION_SEARCH_STATE", state: state});
		},

		onPublicationReceptionSearchChange: (state) => {
			dispatch({type: "SET_DOCUMENT_RECEPTION_SEARCH_STATE", state: state});
		}
	};
	return actions;
}