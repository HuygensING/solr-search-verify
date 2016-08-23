import server from "./server";

import solrPaginationQuery from "../util/solr-pagination-query";


const setAuthorPages = (state) => (redispatch, getState) => {
	const { query } = state;
	const newQuery = solrPaginationQuery(query);
	const lastQuery = solrPaginationQuery(getState().personSearch.query);
	if (query.searchFields.length === 0) { return; }
	if (newQuery === lastQuery) { return; }

	server.fastXhr({
		url: "/repositorysolr/wwpersons",
		method: "POST",
		data: newQuery,
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		}
	}, (err, resp, body) => {
		redispatch({type: "SET_AUTHOR_PAGES", ids: JSON.parse(body).response.docs.map((doc) => doc.id)});
	});
};

const setPublicationPages = (state) => (redispatch, getState) => {
	const { query } = state;
	const newQuery = solrPaginationQuery(query);
	const lastQuery = solrPaginationQuery(getState().documentSearch.query);
	if (newQuery === lastQuery) { return; }

	server.fastXhr({
		url: "/repositorysolr/wwdocuments",
		method: "POST",
		data: newQuery,
		headers: {
			"Content-type": "application/x-www-form-urlencoded"
		}
	}, (err, resp, body) => {
		redispatch({type: "SET_PUBLICATION_PAGES", ids: JSON.parse(body).response.docs.map((doc) => doc.id)});
	});
};

export { setAuthorPages, setPublicationPages };