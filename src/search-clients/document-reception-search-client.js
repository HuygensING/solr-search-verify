import { SolrClient } from "solr-faceted-search-react";
import store from "../reducers/store";
import clone from "../util/clone";
import filtersAreEqual from "../util/filters-are-equal";

const documentFilters = [
	{field: "type_s", value: "document_reception"}
];

const documentSortFields = [
	{label: "Title", field: "displayName_s"},
	{label: "Date", field: "date_i"},
	{label: "Modified", field: "modified_l"}
];

const documentFields = [
	{label: "Title", field: "title_t", type: "text"},
	{label: "Reception type", field: "relationType_s", type: "list-facet"},
	{label: "Date", field: "date_i", type: "range-facet"},
	{label: "Country of first publication", field: "publishLocation_ss", type: "list-facet"},
	{label: "Language", field: "language_ss", type: "list-facet"},
	{label: "Genre", field: "genre_ss", type: "list-facet"},
	{label: "Sources", field: "source_ss", type: "list-facet"},
	{label: "Document type", field: "documentType_s", type: "list-facet"},
	{label: "Provisional notes", field: "notes_t", type: "text"}
];


const searchClient = new SolrClient({
	url: "http://10.152.32.51:3000/solr/wwdocumentreceptions/select",
	searchFields: documentFields,
	sortFields: documentSortFields,
	rows: 25,
	pageStrategy: "paginate",
	facetSort: "count",
	filters: documentFilters,
	onChange: (state) => store.dispatch({type: "SET_DOCUMENT_RECEPTION_SEARCH_STATE", state: state})
});


let lastFilters = clone(documentFilters);

const setDocumentReceptionsFiltersFromDocumentQuery = (documentState) => {
	const personFilters = documentState.query.filters
		.filter((filter) => filter.field.match(/^\{/) || filter.field === "language_ss");

	const filters = documentState.query.searchFields.concat(personFilters)
		.filter((searchField) => searchField.value && searchField.value.length > 0)
		.map((searchField) => ({
			field: searchField.field.match(/^\{/)
				? searchField.field.replace("type_s:document", "type_s:document_reception")
				: `document_${searchField.field}`,
			value: searchField.value,
			type: searchField.type,
			label: searchField.label
		}));

	if (!filtersAreEqual(lastFilters, filters)) {
		lastFilters = clone(filters);
		searchClient.setFilters(filters.concat(documentFilters));
	}
}

export { setDocumentReceptionsFiltersFromDocumentQuery };
export default searchClient;