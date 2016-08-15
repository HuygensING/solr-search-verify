import React from "react";
import ReactDOM from "react-dom";
import store from "./reducers/store";
import personComponents from "./components/custom/persons";
import documentComponents from "./components/custom/documents";
import documentReceptionComponents from "./components/custom/document-receptions";
import personReceptionComponents from "./components/custom/person-receptions";
import App from "./components/app";
import documentSearchClient from "./search-clients/document-search-client";
import personSearchClient from "./search-clients/person-search-client";
import documentReceptionSearchClient from "./search-clients/document-reception-search-client";
import personReceptionSearchClient from "./search-clients/person-reception-search-client";

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


document.addEventListener("DOMContentLoaded", () => {
	personSearchClient.initialize();
	documentSearchClient.initialize();
	documentReceptionSearchClient.initialize();
	personReceptionSearchClient.initialize();
});