import React from "react";
import ReactDOM from "react-dom";
import store from "./reducers/store";
import DocumentCurrentQuery from "./current-query/document";
import {
	SolrFacetedSearch,
	SolrClient,
	defaultComponentPack
} from "solr-faceted-search-react";


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

const documentFilters = [
	{field: "type_s", value: "document"}
];

const documentSortFields = [
	{label: "Title", field: "displayName_s"},
	{label: "Date", field: "date_i"},
	{label: "Modified", field: "modified_l"}
];

const documentFields = [
	{label: "Title", field: "title_t", type: "text"},
	{label: "Date", field: "date_i", type: "range-facet"},
	{label: "Country of first publication", field: "publishLocation_ss", type: "list-facet"},
	{label: "Language", field: "language_ss", type: "list-facet"},
	{label: "Genre", field: "genre_ss", type: "list-facet"},
	{label: "Sources", field: "source_ss", type: "list-facet"},
	{label: "Document type", field: "documentType_s", type: "list-facet"},
	{label: "Provisional notes", field: "notes_t", type: "text"}
];


const documentSearchClient = new SolrClient({
	url: "http://10.152.32.34:3000/solr/wwdocuments/select",
	searchFields: documentFields,
	sortFields: documentSortFields,
	rows: 25,
	pageStrategy: "paginate",
	facetSort: "count",
	filters: documentFilters,
	onChange: (state) => store.dispatch({type: "SET_DOCUMENT_SEARCH_STATE", state: state})
});


const setDocumentFiltersFromPersonQuery = (personState) => {
	const filters = personState.query.searchFields
		.filter((searchField) => searchField.value && searchField.value.length > 0)
		.map((searchField) => ({
			field: searchField.field === "language_ss" ?
				searchField.field :
				`{!parent which=type_s:document}person_${searchField.field}`,
			value: searchField.value,
			type: searchField.type,
			label: searchField.label
		}));

	documentSearchClient.setFilters(filters.concat(documentFilters));
};

const personSearchClient = new SolrClient({
	url: "http://10.152.32.34:3000/solr/wwpersons/select",
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

const setPersonSearchFieldFromDocumentFilter = (field, value) =>
	personSearchClient.setSearchFieldValue(field.replace("{!parent which=type_s:document}person_", ""), value);


const personComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<a href={`http://test.repository.huygens.knaw.nl/v2.1/domain/wwpersons/${props.doc.id}`} target="_blank">
					<span style={{marginLeft: "20px", color: "#aaa", float: "right"}}>
						({new Date(props.doc.modified_l).toString()})
					</span>

					{props.doc.displayName_s}
					<span style={{marginLeft: "20px", color: "#666"}}>
						{props.doc.birthDate_i}
						&nbsp;-&nbsp;
						{props.doc.deathDate_i}
					</span>
				</a>
			</li>
		)
	}
};

personComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

const documentComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<a href={`http://test.repository.huygens.knaw.nl/v2.1/domain/wwdocuments/${props.doc.id}`} target="_blank">
					<span style={{marginLeft: "20px", color: "#aaa", float: "right"}}>
						({new Date(props.doc.modified_l).toString()})
					</span>

					{props.doc.displayName_s}
					<span style={{marginLeft: "20px", color: "#666"}}>
						{props.doc.date_i}
					</span>
				</a>
			</li>
		)
	},
	searchFields: {
		...defaultComponentPack.searchFields,
		currentQuery: DocumentCurrentQuery(setPersonSearchFieldFromDocumentFilter)
	}
};

documentComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

const WIDTH = 50;

store.subscribe(() => {
	const { personSearch, documentSearch } = store.getState();

	ReactDOM.render(
		<div>
			<div style={{width: `${WIDTH}%`, float: "left"}}>
				<SolrFacetedSearch
					{...personSearch}
					{...personSearchClient.getHandlers()}
					bootstrapCss={true}
					customComponents={personComponents}
					onSelectDoc={(doc) => console.log(doc)}
				/>
			</div>
			<div style={{width: `${WIDTH}%`, float: "left"}}>
				<SolrFacetedSearch
					{...documentSearch}
					{...documentSearchClient.getHandlers()}
					bootstrapCss={true}
					customComponents={documentComponents}
					onSelectDoc={(doc) => console.log(doc)}
				/>
			</div>
		</div>, document.getElementById("app"));
});


document.addEventListener("DOMContentLoaded", () => {
	personSearchClient.initialize();
	documentSearchClient.initialize();
});