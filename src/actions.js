import { setDocumentFiltersFromPersonQuery } from "./search-clients/document-search-client";
import { setDocumentReceptionsFiltersFromDocumentQuery } from "./search-clients/document-reception-search-client";
import { setPersonReceptionsFiltersFromPersonQuery } from "./search-clients/person-reception-search-client";
import { selectEntity, makeNewEntity, saveEntity, deleteEntity } from "./actions/entity";
import { setAuthorPages, setPublicationPages, setPublicationReceptionPages, setAuthorReceptionPages } from "./actions/pagination";
import { fetchGraph, fetchGraphTable } from "./actions/graph";

const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

export default function actionsMaker(navigateTo, dispatch) {
	const actions = {

		/** GENERAL **/
		onLoginChange: (response) => dispatch(setUser(response)),

		// Sets the value of a field in a wwdocument, wwperson, or wwcollective
		onChange: (fieldPath, value) => {
			dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value});
		},

		onDismissMessage: (messageIndex) => dispatch({type: "DISMISS_MESSAGE", messageIndex: messageIndex}),


		/** SEARCHES **/
		onAuthorSearchChange: (state) => {
			setDocumentFiltersFromPersonQuery(state);
			setPersonReceptionsFiltersFromPersonQuery(state);
			dispatch(setAuthorPages(state));
			dispatch({type: "SET_PERSON_SEARCH_STATE", state: state});
		},

		onPublicationSearchChange: (state) => {
			setDocumentReceptionsFiltersFromDocumentQuery(state);
			dispatch(setPublicationPages(state));
			dispatch({type: "SET_DOCUMENT_SEARCH_STATE", state: state});
		},

		onAuthorReceptionSearchChange: (state) => {
			dispatch(setAuthorReceptionPages(state));
			dispatch({type: "SET_PERSON_RECEPTION_SEARCH_STATE", state: state});
		},

		onPublicationReceptionSearchChange: (state) => {
			dispatch(setPublicationReceptionPages(state));
			dispatch({type: "SET_DOCUMENT_RECEPTION_SEARCH_STATE", state: state});
		},

		/** AUTHORS **/
		onFetchAuthor: (id) => {
			dispatch(selectEntity("wwpersons", id));
		},

		onNewAuthor: () => {
			dispatch(makeNewEntity("wwpersons", null, () => navigateTo("authorNew")));
		},

		onSaveAuthor: (id, tab) => {
			dispatch(saveEntity((savedId) =>
				navigateTo("authorTab", [savedId, tab])
			), (savedId) =>
				navigateTo("authorTab", [savedId, tab])
			);
		},

		onSaveNewAuthor: () => {
			dispatch(saveEntity((savedId) =>
					navigateTo("authorIndex", [savedId])
				), () =>
					navigateTo("authorNew")
			);
		},

		onCancelAuthor: (id, tab) => {
			if (id) {
				dispatch(selectEntity("wwpersons", id));
				navigateTo("authorTab", [id, tab]);
			} else {
				navigateTo("authorSearch");
			}
		},

		onDeleteAuthor: (id, tab) => {
			dispatch(deleteEntity(
				() => { navigateTo("authorSearch"); },
				() => { navigateTo("authorTab", [id, tab]); }
			));
		},

		/** PUBLICATIONS **/
		onFetchPublication: (id) => {
			dispatch(selectEntity("wwdocuments", id));
		},

		onNewPublication: () => {
			dispatch(makeNewEntity("wwdocuments", null, () => navigateTo("publicationNew")));
		},

		onSaveNewPublication: () => {
			dispatch(saveEntity((savedId) =>
					navigateTo("publicationIndex", [savedId])
				), () =>
					navigateTo("publicationNew")
			);
		},

		onSavePublication: (id, tab, urlKeyPrefix = "publication") => {
			dispatch(saveEntity((savedId) =>
					navigateTo(`${urlKeyPrefix}Tab`, [savedId, tab])
				), (savedId) =>
					navigateTo(`${urlKeyPrefix}Tab`, [savedId, tab])
			);
		},

		onCancelPublication: (id, tab, urlKeyPrefix = "publication") => {
			if (id) {
				dispatch(selectEntity("wwdocuments", id));
				navigateTo(`${urlKeyPrefix}Tab`, [id, tab]);
			} else {
				navigateTo(`${urlKeyPrefix}Search`);
			}
		},

		onDeletePublication: (id, tab, urlKeyPrefix = "publication") => {
			dispatch(deleteEntity(
				() => { navigateTo(`${urlKeyPrefix}Search`); },
				() => { navigateTo(`${urlKeyPrefix}Tab`, [id, tab]); }
			));
		},

		/** D3 graph **/
		onFetchGraph: (collection, id) => {
			dispatch(fetchGraph(collection, id));
		},

		onSelectGraph: (collection, id) => {
			navigateTo("graph", [collection, id]);
		},

		onFetchGraphTable: (collection, id) => {
			fetchGraphTable(collection, id, dispatch);
		}
	};
	return actions;
}