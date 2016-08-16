import React from "react";
import store from "./reducers/store";
import { Router, Route, browserHistory } from "react-router";
import { Provider, connect } from "react-redux";
import App from "./components/app1";
import actions from "./actions";
import AuthorSearch from "./components/search/authors";
import PublicationSearch from "./components/search/publications";
import AuthorReceptionSearch from "./components/search/author-receptions";
import PublicationReceptionSearch from "./components/search/publication-receptions";

const urls = {
	root: () => "/womenwriters/vre",
	authorSearch: () => "/womenwriters/vre/persons",
	publicationSearch: () => "/womenwriters/vre/documents",
	authorReceptionSearch: () => "/womenwriters/vre/receptions/authors",
	publicationReceptionSearch: () => "/womenwriters/vre/receptions/publications"
};

export function navigateTo(key, args) {
	browserHistory.push(urls[key].apply(null, args));
}

const makeContainerComponent = connect(state => state, dispatch => actions(navigateTo, dispatch));

const router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path={urls.root()} component={makeContainerComponent(App)}>
				<Route path={urls.authorSearch()} component={makeContainerComponent(AuthorSearch)} />
				<Route path={urls.publicationSearch()} component={makeContainerComponent(PublicationSearch)} />
				<Route path={urls.authorReceptionSearch()} component={makeContainerComponent(AuthorReceptionSearch)} />
				<Route path={urls.publicationReceptionSearch()} component={makeContainerComponent(PublicationReceptionSearch)} />
			</Route>
		</Router>
	</Provider>
);

export default router;