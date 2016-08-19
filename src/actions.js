import { setDocumentFiltersFromPersonQuery } from "./search-clients/document-search-client";
import { setDocumentReceptionsFiltersFromDocumentQuery } from "./search-clients/document-reception-search-client";
import { setPersonReceptionsFiltersFromPersonQuery } from "./search-clients/person-reception-search-client";
import { selectEntity, makeNewEntity, saveEntity } from "./actions/entity";

const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

/*

 import store from "../reducers/store";
 import { saveEntity, selectEntity, makeNewEntity, deleteEntity, fetchEntityList, paginateLeft, paginateRight, sendQuickSearch } from "./entity";
 import { setVre } from "./vre";

 const setUser = (response) => {
 return {
 type: "SET_USER",
 user: response
 };
 };




 export default {
 onNew: (domain) => store.dispatch(makeNewEntity(domain)),
 onSelect: (record) => store.dispatch(selectEntity(record.domain, record.id)),
 onSave: () => store.dispatch(saveEntity()),
 onDelete: () => store.dispatch(deleteEntity()),
 onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
 onLoginChange: (response) => store.dispatch(setUser(response)),
 onSelectVre: (vreId) => store.dispatch(setVre(vreId)),
 onDismissMessage: (messageIndex) => store.dispatch({type: "DISMISS_MESSAGE", messageIndex: messageIndex}),
 onSelectDomain: (domain) => { store.dispatch({type: "SET_DOMAIN", domain}); store.dispatch(fetchEntityList(domain)); store.dispatch({type: "SET_QUICKSEARCH_QUERY", value: ""}); },
 onPaginateLeft: () => store.dispatch(paginateLeft()),
 onPaginateRight: () => store.dispatch(paginateRight()),
 onQuickSearchQueryChange: (value) => store.dispatch({type: "SET_QUICKSEARCH_QUERY", value: value}),
 onQuickSearch: () => store.dispatch(sendQuickSearch())
 };
 */

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
		},

		onSelectAuthor: (id, tab = null) => {
			dispatch(selectEntity("wwpersons", id));
			if (tab) {
				navigateTo("authorTab", [id, tab]);
			} else {
				navigateTo("authorIndex", [id]);
			}
		},

		onNewAuthor: () => {
			dispatch(makeNewEntity("wwpersons"));
			navigateTo("authorNew");
		},

		onLoginChange: (response) => dispatch(setUser(response)),

		onSelectPublication: (id, tab = null) => {
			console.log("onSelectPublication: ", id);
		},

		onSelectCollective: (id) => {
			console.log("onSelectCollective: ", id);
		},

		onChange: (fieldPath, value) => {
			dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value});
		},

		onSave: (urlKey, id, tab) => {
			dispatch(saveEntity());
			navigateTo(urlKey, [id, tab]);
		}

	};
	return actions;
}