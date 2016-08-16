import personSearchClient from "./search-clients/person-search-client";
import ReactDOM from "react-dom";
import router from "./router";

/*
store.subscribe(() => ReactDOM.render(
	<App
		{...store.getState()}
		documentComponents={documentComponents}
		documentSearchClient={documentSearchClient}

		personComponents={personComponents}
		personSearchClient={personSearchClient}

		personReceptionComponents={personReceptionComponents}
		personReceptionSearchClient={personReceptionSearchClient}

		documentReceptionComponents={documentReceptionComponents}
		documentReceptionSearchClient={documentReceptionSearchClient}

	/>,
	document.getElementById("app"))
);
*/


document.addEventListener("DOMContentLoaded", () => {
	// Response will trigger all searches
	personSearchClient.initialize();
	ReactDOM.render(router, document.getElementById("app"));
});