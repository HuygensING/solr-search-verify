import React from "react";
import DocumentCurrentQuery from "./current-query/document";
import { defaultComponentPack } from "solr-faceted-search-react";


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
		currentQuery: DocumentCurrentQuery
	}
};

documentComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default documentComponents;