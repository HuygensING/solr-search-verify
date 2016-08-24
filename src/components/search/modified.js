import React from "react";
import SolrFacetedSearch from "solr-faceted-search-react";
import CustomRangeFacet from "./custom/range-facet/modified";
import personModifiedClient from "../../search-clients/person-modified-client";
import { defaultComponentPack } from "solr-faceted-search-react";
import { makeLabel, makeDate } from "../../util/date";
import { Link } from "react-router";
import { urls } from "../../router";

const customComponents = {
	...defaultComponentPack,
	searchFields: {
		...defaultComponentPack.searchFields,
		container: (props) => (
			<div className="col-md-12">
				{props.children}
			</div>
		),
		currentQuery: () => (<div></div>),
		"range-facet": CustomRangeFacet
	},
	results: {
		...defaultComponentPack.results,
		container: (props) => (
			<div className="col-md-12">
				{props.children}
			</div>
		)
	},
	sortFields: {
		menu: () => (<span></span>)
	}
};

const authorCustomComponents = {
	...customComponents,
	results: {
		...customComponents.results,
		result: (props) => {
			return (
				<li className="list-group-item">
					<Link to={urls.authorIndex(props.doc.id)}>
						{props.doc.displayName_s}
					</Link>
					<span className="pull-right">
								{props.doc.modifiedBy_s}{" "}
						({makeLabel(makeDate(new Date(props.doc.modified_l)))})
					</span>
				</li>
			);
		}
	}
};

class ModifiedSearch extends React.Component {

	componentDidMount() {
		const { modifiedSearch: { authors } } = this.props;
		if (authors.query.searchFields.length === 0) {
			personModifiedClient.initialize();
		}
	}

	render() {
		const { modifiedSearch: { authors } } = this.props;
		return (
			<div className="col-md-6">
				<SolrFacetedSearch
					{...authors}
					{...personModifiedClient.getHandlers()}
					customComponents={authorCustomComponents}
					bootstrapCss={true}
					onSelectDoc={() => {}}
				/>
			</div>
		);
	}
}

export default ModifiedSearch;