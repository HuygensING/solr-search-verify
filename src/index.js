import React from "react";
import ReactDOM from "react-dom";
import store from "./reducers/store";
import personComponents from "./components/custom/persons";
import documentComponents from "./components/custom/documents";
import documentReceptionComponents from "./components/custom/document-receptions";
import App from "./components/app";
import documentSearchClient from "./search-clients/document-search-client";
import personSearchClient from "./search-clients/person-search-client";
import documentReceptionSearchClient from "./search-clients/document-reception-search-client";

store.subscribe(() => ReactDOM.render(
	<App
		{...store.getState()}
		documentComponents={documentComponents}
		documentReceptionComponents={documentReceptionComponents}
		documentReceptionSearchClient={documentReceptionSearchClient}
		documentSearchClient={documentSearchClient}
		personComponents={personComponents}
		personSearchClient={personSearchClient}
	/>,
	document.getElementById("app"))
);


document.addEventListener("DOMContentLoaded", () => {
	personSearchClient.initialize();
	documentSearchClient.initialize();
	documentReceptionSearchClient.initialize();
});