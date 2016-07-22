import React from "react";
import { SolrFacetedSearch } from "solr-faceted-search-react";
import { setPersonQueryFromDocumentFilters } from "../search-clients/person-search-client";


const WIDTH = 50;


class App extends React.Component {
	render() {
		const { personSearch, documentSearch, personSearchClient, personComponents, documentSearchClient, documentComponents } = this.props;

		return (
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
						onPersonQueryChange={setPersonQueryFromDocumentFilters}
						onSelectDoc={(doc) => console.log(doc)}
					/>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	documentComponents: React.PropTypes.object,
	documentSearch: React.PropTypes.object,
	documentSearchClient: React.PropTypes.object,
	personComponents: React.PropTypes.object,
	personSearch: React.PropTypes.object,
	personSearchClient: React.PropTypes.object
};

export default App;
