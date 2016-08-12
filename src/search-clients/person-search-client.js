import { SolrClient } from "solr-faceted-search-react";
import { setDocumentFiltersFromPersonQuery } from "./document-search-client";
import store from "../reducers/store";

const personFields = [
	{label: "Name", field: "name_t", type: "text"},
	{label: "Person Type", field: "types_ss", type: "list-facet"},
	{label: "Gender", field: "gender_s", type: "list-facet"},
	{label: "Country", field: "relatedLocations_ss", type: "list-facet"},
	{label: "Language", field: "language_ss", type: "list-facet"},
	{label: "Year of birth", field: "birthDate_i", type: "range-facet"},
	{label: "Year of death", field: "deathDate_i", type: "range-facet"},
	{label: "Place of birth", field: "birthPlace_ss", type: "list-facet"},
	{label: "Place of death", field: "deathPlace_ss", type: "list-facet"},
	{label: "Marital status", field: "maritalStatus_ss", type: "list-facet"},
	{label: "Children", field: "children_s", type: "list-facet"},
	{label: "Social class", field: "socialClass_ss", type: "list-facet"},
	{label: "Education", field: "education_ss", type: "list-facet"},
	{label: "Religion/ideology", field: "religion_ss", type: "list-facet"},
	{label: "Profession and other activities", field: "profession_ss", type: "list-facet"},
	{label: "Financial aspects", field: "financialSituation_ss", type: "list-facet"},
	{label: "Memberships", field: "memberships_ss", type: "list-facet"},
	{label: "Provisional notes", field: "notes_t", type: "text"}
];

const personSortFields = [
	{label: "Name", field: "displayName_s"},
	{label: "Date of birth", field: "birthDate_i"},
	{label: "Modified", field: "modified_l"},
	{label: "Date of death", field: "deathDate_i"}
];

const personFilters = [
	{field: "type_s", value: "person"}
];

const personSearchClient = new SolrClient({
	url: "/solr/wwpersons/select",
	searchFields: personFields,
	sortFields: personSortFields,
	rows: 25,
	pageStrategy: "paginate",
	facetSort: "count",
	filters: personFilters,
	onChange: (state) => {
		setDocumentFiltersFromPersonQuery(state);
		store.dispatch({type: "SET_PERSON_SEARCH_STATE", state: state});
	}
});

const setPersonQueryFromDocumentFilters = (field, value) =>
	personSearchClient.setSearchFieldValue(field.replace(/\{.+\}person_/, ""), value);

export { setPersonQueryFromDocumentFilters };

export default personSearchClient;