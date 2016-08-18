import personSearchClient from "./search-clients/person-search-client";
import documentSearchClient from "./search-clients/document-search-client";
import personReceptionSearchClient from "./search-clients/person-reception-search-client";
import documentReceptionSearchClient from "./search-clients/document-reception-search-client";

import ReactDOM from "react-dom";
import router from "./router";

document.addEventListener("DOMContentLoaded", () => {
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
		personSearchClient.initialize();

	});
});
