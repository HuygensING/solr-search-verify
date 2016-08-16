import personSearchClient from "./search-clients/person-search-client";
import ReactDOM from "react-dom";
import router from "./router";

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(router, document.getElementById("app"), () => {
		// Response will trigger all searches
		personSearchClient.initialize();
	});
});