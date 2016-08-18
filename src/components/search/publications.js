import React from "react";
import SolrFacetedSearch from "solr-faceted-search-react";
import searchClient from "../../search-clients/document-search-client";
import customComponents from "../custom/documents";
import { setPersonQueryFromDocumentFilters } from "../../search-clients/person-search-client";

class PublicationSearch extends React.Component {

	constructor(props) {
		super(props);
		searchClient.onChange = props.onPublicationSearchChange;
	}

	render() {
		const { documentSearch } = this.props;
		return (
			<SolrFacetedSearch
				{...documentSearch}
				{...searchClient.getHandlers()}
				bootstrapCss={true}
				customComponents={customComponents}
				truncateFacetListsAt={20}
				onPersonQueryChange={setPersonQueryFromDocumentFilters}
				onSelectDoc={() => {}}
			/>
		);
	}
}

export default PublicationSearch;
