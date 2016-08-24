import { SolrClient } from "solr-faceted-search-react";

import store from "../reducers/store";

const personFields = [
	{label: "Modified", field: "modified_l", type: "range"}
];

const personSortFields = [
	{label: "Modified", field: "modified_l"},
];

const personFilters = [
	{field: "type_s", value: "person"}
];

const personSearchClient = new SolrClient({
	url: "/repositorysolr/wwpersons",
	searchFields: personFields,
	sortFields: personSortFields,
	rows: 25,
	pageStrategy: "paginate",
	facetSort: "count",
	filters: personFilters,
	onChange: (state) => {
		store.dispatch({type: "SET_PERSON_MODIFIED_SEARCH_STATE", state: state});
	}
});

export default personSearchClient;