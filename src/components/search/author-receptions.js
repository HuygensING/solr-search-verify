import React from "react";
import SolrFacetedSearch from "solr-faceted-search-react";
import customComponents from "../custom/person-receptions";
import searchClient from "../../search-clients/person-reception-search-client";

import { setPersonQueryFromPersonReceptionFilters } from "../../search-clients/person-search-client";

class AuthorReceptionSearch extends React.Component {

	render() {
		const { personReceptionSearch } = this.props;
		return (
			<SolrFacetedSearch
				{...personReceptionSearch}
				{...searchClient.getHandlers()}
				bootstrapCss={true}
				customComponents={customComponents}
				truncateFacetListsAt={20}
				onPersonQueryChange={setPersonQueryFromPersonReceptionFilters}
				onSelectDoc={() => {}}
			/>
		);
	}
}

export default AuthorReceptionSearch;
