import personSearchClient from "./search-clients/person-search-client";
import documentSearchClient from "./search-clients/document-search-client";
import personReceptionSearchClient from "./search-clients/person-reception-search-client";
import documentReceptionSearchClient from "./search-clients/document-reception-search-client";
import { setVre } from "./actions/vre";
import store from "./reducers/store";
import ReactDOM from "react-dom";
import router from "./router";
import { serializeSearch, urls } from "./router";
import { browserHistory } from "react-router";

document.addEventListener("DOMContentLoaded", () => {

	const unsubscribe = store.subscribe(() => {
		if(store.getState().vre.vreId) {
			ReactDOM.render(router, document.getElementById("app"), () => {
				// Response will trigger all searches
				if (location.hash.length > 0) {
					try {
						const initialSearchState = JSON.parse(decodeURIComponent(location.hash.replace(/^#q=/, "")));
						personSearchClient.setInitialQuery(initialSearchState.authors || {});
						documentSearchClient.setInitialQuery(initialSearchState.publications || {});
						personReceptionSearchClient.setInitialQuery(initialSearchState.authorReceptions || {})
						documentReceptionSearchClient.setInitialQuery(initialSearchState.publicationReceptions || {});
					} catch (e) {
						console.log(e);
					}
				}
				store.subscribe(() => {
					if (location.pathname !== urls.authorSearch(true) &&
						location.pathname !== urls.publicationSearch(true) &&
						location.pathname !== urls.authorReceptionSearch(true) &&
						location.pathname !== urls.publicationReceptionSearch(true)) {
						return;
					}

					const serialized = `${location.pathname}?#q=${serializeSearch()}`;
					if (location.pathname + "#" + location.hash !== serialized) {
						browserHistory.replace(`${location.pathname}#q=${serializeSearch()}`);
					}
				});
				personSearchClient.initialize();
			});


			unsubscribe();
		}
	});

	store.dispatch(setVre("WomenWriters"));

});
