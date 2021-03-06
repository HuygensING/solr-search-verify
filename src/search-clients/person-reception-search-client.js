import { SolrClient } from "solr-faceted-search-react";
import store from "../reducers/store";
import clone from "../util/clone";
import filtersAreEqual from "../util/filters-are-equal";

const documentFilters = [
	{field: "type_s", value: "person_reception"}
];

const documentSortFields = [
	{label: "Author", field: "authorNameSort_s"},
	{label: "Title", field: "displayName_s"},
	{label: "Date", field: "date_i"},
	{label: "Modified", field: "modified_l"}
];

const documentFields = [
	{label: "Title", field: "title_t", type: "text"},
	{label: "Reception type", field: "relationType_s", type: "list-facet"},
	{label: "Reception gender", field: "authorGender_ss", type: "list-facet"},
	{label: "Date", field: "date_i", type: "range-facet"},
	{label: "Country of first publication", field: "publishLocation_ss", type: "list-facet"},
	{label: "Language", field: "language_ss", type: "list-facet"},
	{label: "Genre", field: "genre_ss", type: "list-facet"},
	{label: "Sources", field: "source_ss", type: "list-facet"},
	{label: "Document type", field: "documentType_s", type: "list-facet"},
	{label: "Provisional notes", field: "notes_t", type: "text"}
];


const searchClient = new SolrClient({
	url: "/repositorysolr/wwpersonreceptions",
	searchFields: documentFields,
	sortFields: documentSortFields,
	rows: 25,
	pageStrategy: "paginate",
	facetSort: "count",
	filters: documentFilters,
	onChange: (state) => store.dispatch({type: "SET_PERSON_RECEPTION_SEARCH_STATE", state: state})
});



let lastFilters = clone(documentFilters);

const setPersonReceptionsFiltersFromPersonQuery = (personState) => {
	const filters = personState.query.searchFields
		.filter((searchField) => searchField.value && searchField.value.length > 0)
		.map((searchField) => ({
			field: `person_${searchField.field}`,
			value: searchField.value,
			type: searchField.type,
			label: searchField.label
		}));

	if (!filtersAreEqual(lastFilters, filters)) {
		lastFilters = clone(filters);
		searchClient.setFilters(filters.concat(documentFilters));
	}
}

export { setPersonReceptionsFiltersFromPersonQuery };
export default searchClient;