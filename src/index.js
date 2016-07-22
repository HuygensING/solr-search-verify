import React from "react";
import ReactDOM from "react-dom";
import store from "./reducers/store";
import personComponents from "./components/custom/persons";
import documentComponents from "./components/custom/documents";
import App from "./components/app";
import documentSearchClient from "./search-clients/document-search-client";
import personSearchClient from "./search-clients/person-search-client";

store.subscribe(() => ReactDOM.render(
	<App
		{...store.getState()}
		documentComponents={documentComponents}
		documentSearchClient={documentSearchClient}
		personComponents={personComponents}
		personSearchClient={personSearchClient}
	/>,
	document.getElementById("app"))
);


document.addEventListener("DOMContentLoaded", () => {
	personSearchClient.initialize();
	documentSearchClient.initialize();
});