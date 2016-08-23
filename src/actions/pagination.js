import server from "./server";

import solrPaginationQuery from "../util/solr-pagination-query";

const setAuthorPages = (state) => (redispatch, getState) => {
	const { query } = state;
	const newQuery = solrPaginationQuery(query);
	const lastQuery = solrPaginationQuery(getState().personSearch.query);
	if (newQuery === lastQuery && getState().pagination.authorPages.length > 0) { return; }

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

export { setAuthorPages };