import React from "react";
import store from "./reducers/store";
import { Router, Route, browserHistory } from "react-router";
import { Provider, connect } from "react-redux";
import App from "./components/app";
import actions from "./actions";
import AuthorSearch from "./components/search/authors";
import PublicationSearch from "./components/search/publications";
import AuthorReceptionSearch from "./components/search/author-receptions";
import PublicationReceptionSearch from "./components/search/publication-receptions";
import AuthorIndex from "./components/authors";
import AuthorTabs from "./components/authors/tabs";
import AuthorEditTabs from "./components/authors/edit-tabs";

const grabQuery = (search) => ({
	searchFields: search.query.searchFields.filter((sf) => sf.value && sf.value.length),
	sortFields: search.query.sortFields.filter((sf) => sf.value && sf.value.length)
});

export function serializeSearch() {
	const { personSearch, documentSearch, personReceptionSearch, documentReceptionSearch } = store.getState();

	return encodeURIComponent(JSON.stringify({
		authors: grabQuery(personSearch),
		publications: grabQuery(documentSearch),
		authorReceptions: grabQuery(personReceptionSearch),
		publicationReceptions: grabQuery(documentReceptionSearch)
	}));
}


const urls = {
	root: (useBase = false) => useBase ?
		"/womenwriters/vre" :
		`/womenwriters/vre#q=${serializeSearch()}`,

	authorSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/persons" :
		`/womenwriters/vre/persons#q=${serializeSearch()}`,

	publicationSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/documents" :
		`/womenwriters/vre/documents#q=${serializeSearch()}`,

	authorReceptionSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/receptions/authors" :
		`/womenwriters/vre/receptions/authors#q=${serializeSearch()}`,

	publicationReceptionSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/receptions/publications" :
		`/womenwriters/vre/receptions/publications#q=${serializeSearch()}`,

	authorIndex: (id = null) => id ?
		`/womenwriters/vre/persons/${id}`
		: "/womenwriters/vre/persons/:id",

	authorTab: (id = null, tab = null) => id && tab ?
		`/womenwriters/vre/persons/${id}/${tab}`
		: "/womenwriters/vre/persons/:id/:tab",

	authorEdit: (id = null, tab = null) => id && tab ?
		`/womenwriters/vre/persons/${id}/${tab}/edit`
		: "/womenwriters/vre/persons/:id/:tab/edit",

	authorNew: () => "/womenwriters/vre/persons/new"
};



export { urls };

function navigateTo(key, args) {
	browserHistory.push(urls[key].apply(null, args));
}

const makeContainerComponent = connect((state) => state, (dispatch) => actions(navigateTo, dispatch));

const router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path={urls.root(true)} component={makeContainerComponent(App)}>
				<Route path={urls.authorSearch(true)} component={makeContainerComponent(AuthorSearch)} />
				<Route path={urls.publicationSearch(true)} component={makeContainerComponent(PublicationSearch)} />
				<Route path={urls.authorReceptionSearch(true)} component={makeContainerComponent(AuthorReceptionSearch)} />
				<Route path={urls.publicationReceptionSearch(true)} component={makeContainerComponent(PublicationReceptionSearch)} />
				<Route path={urls.authorNew()} component={makeContainerComponent(AuthorIndex)} />

				<Route path={urls.authorIndex()} component={makeContainerComponent(AuthorIndex)}>
					<Route path={urls.authorTab()} component={makeContainerComponent(AuthorTabs)}>
						<Route path={urls.authorEdit()} component={makeContainerComponent(AuthorEditTabs)} />
					</Route>
				</Route>

			</Route>
		</Router>
	</Provider>
);

export default router;