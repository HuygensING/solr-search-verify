import React from "react";
import { SolrFacetedSearch } from "solr-faceted-search-react";
import { setPersonQueryFromDocumentFilters } from "../search-clients/person-search-client";
import store from "../reducers/store";

const tabStyle = {
	marginLeft: "20px",
	marginBottom: "-1px",
	display: "inline-block",
	width: "200px",
	height: "24px",
	lineHeight: "24px",
	textAlign: "center",
	border: "1px solid #aaa"
};

class App extends React.Component {

	render() {
		const {
			activeTab,
			personSearch,
			documentSearch,
			personSearchClient,
			personComponents,
			documentReceptionSearch,
			documentReceptionSearchClient,
			documentReceptionComponents,
			documentSearchClient,
			documentComponents
		} = this.props;

		return (
			<div>
				<div className="col-md-12" style={{marginTop: "20px"}}>
					<a onClick={() => store.dispatch({type: "SET_ACTIVE_TAB", tab: "persons"})}
						style={{...tabStyle,
							border: activeTab === "persons" ? "1px solid #666" : tabStyle.border,
							fontWeight: activeTab === "persons" ? "bold" : "normal"
						}}>
							Persons
					</a>
					<a onClick={() => store.dispatch({type: "SET_ACTIVE_TAB", tab: "documents"})}
						style={{...tabStyle,
							marginLeft: "0",
							border: activeTab === "documents" ? "1px solid #666" : tabStyle.border,
							fontWeight: activeTab === "documents" ? "bold" : "normal"
						}}>
							Documents
					</a>
					<a onClick={() => store.dispatch({type: "SET_ACTIVE_TAB", tab: "document-receptions"})}
						style={{...tabStyle,
							marginLeft: "0",
							border: activeTab === "document-receptions" ? "1px solid #666" : tabStyle.border,
							fontWeight: activeTab === "document-receptions" ? "bold" : "normal"
						}}>
							Document receptions
					</a>
				</div>
				<div>
					<div style={{display: activeTab === "persons" ? "block" : "none"}}>
						<SolrFacetedSearch
							{...personSearch}
							{...personSearchClient.getHandlers()}
							bootstrapCss={true}
							customComponents={personComponents}
							onSelectDoc={(doc) => console.log(doc)}
						/>
					</div>
					<div style={{display: activeTab === "documents" ? "block" : "none"}}>
						<SolrFacetedSearch
							{...documentSearch}
							{...documentSearchClient.getHandlers()}
							bootstrapCss={true}
							customComponents={documentComponents}
							onPersonQueryChange={setPersonQueryFromDocumentFilters}
							onSelectDoc={(doc) => console.log(doc)}
						/>
					</div>
					<div style={{display: activeTab === "document-receptions" ? "block" : "none"}}>
						<SolrFacetedSearch
							{...documentReceptionSearch}
							{...documentReceptionSearchClient.getHandlers()}
							customComponents={documentReceptionComponents}
							bootstrapCss={true}
							onSelectDoc={(doc) => console.log(doc)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	activeTab: React.PropTypes.string,
	documentComponents: React.PropTypes.object,
	documentSearch: React.PropTypes.object,
	documentSearchClient: React.PropTypes.object,
	personComponents: React.PropTypes.object,
	personSearch: React.PropTypes.object,
	personSearchClient: React.PropTypes.object
};

export default App;
