import React from "react";
import SolrFacetedSearch from "solr-faceted-search-react";
import searchClient from "../../search-clients/person-search-client";
import customComponents from "../custom/persons";


class AuthorSearch extends React.Component {

	constructor(props) {
		super(props);
		searchClient.onChange = props.onAuthorSearchChange;
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.personSearch !== this.props.personSearch;
	}

	render() {
		const { personSearch, onSelectAuthor } = this.props;
		return (
			<SolrFacetedSearch
				{...personSearch}
				{...searchClient.getHandlers()}
				bootstrapCss={true}
				customComponents={customComponents}
				truncateFacetListsAt={20}
				onSelectDoc={(id) => onSelectAuthor(id)}
			/>
		);
	}
}

export default AuthorSearch;
