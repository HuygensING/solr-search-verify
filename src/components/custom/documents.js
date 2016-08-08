import React from "react";
import DocumentCurrentQuery from "./current-query/document";
import { defaultComponentPack } from "solr-faceted-search-react";


const documentComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<a href={`http://test.resources.huygens.knaw.nl/womenwriters/vre/documents/${props.doc.id}`} style={{display: "flex"}}>
					<span style={{flexGrow: 1}}>{props.doc.displayName_s}</span>
					<span style={{color: "#666"}}>
						{props.doc.date_i}
					</span>
				</a>
			</li>
		)
	},
	searchFields: {
		...defaultComponentPack.searchFields,
		currentQuery: DocumentCurrentQuery
	}
};

documentComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default documentComponents;
