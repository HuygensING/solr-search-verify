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

const grabQuery = (search) => ({
	searchFields: search.query.searchFields,
	sortFields: search.query.sortFields
});

const seralizeSearch = () => {
	const { personSearch, documentSearch, personReceptionSearch, documentReceptionSearch } = store.getState();

	console.log(
		grabQuery(personSearch)
	);
	return "test";
};


const urls = {
	root: (useBase = false) => useBase ?
		"/womenwriters/vre" :
		`/womenwriters/vre?q=${seralizeSearch()}`,

	authorSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/persons" :
		`/womenwriters/vre/persons?q=${seralizeSearch()}`,

	publicationSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/documents" :
		`/womenwriters/vre/documents?q=${seralizeSearch()}`,

	authorReceptionSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/receptions/authors" :
		`/womenwriters/vre/receptions/authors?q=${seralizeSearch()}`,

	publicationReceptionSearch: (useBase = false) => useBase ?
		"/womenwriters/vre/receptions/publications" :
		`/womenwriters/vre/receptions/publications?q=${seralizeSearch()}`
};

export { urls };

export function navigateTo(key, args) {
	browserHistory.push(urls[key].apply(null, args));
}

const makeContainerComponent = connect(state => state, dispatch => actions(navigateTo, dispatch));

const router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path={urls.root(true)} component={makeContainerComponent(App)}>
				<Route path={urls.authorSearch(true)} component={makeContainerComponent(AuthorSearch)} />
				<Route path={urls.publicationSearch(true)} component={makeContainerComponent(PublicationSearch)} />
				<Route path={urls.authorReceptionSearch(true)} component={makeContainerComponent(AuthorReceptionSearch)} />
				<Route path={urls.publicationReceptionSearch(true)} component={makeContainerComponent(PublicationReceptionSearch)} />
			</Route>
		</Router>
	</Provider>
);

export default router;