import React from "react";
import DocumentReceptionCurrentQuery from "./current-query/document-receptions";
import {defaultComponentPack} from "solr-faceted-search-react";


const documentComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<a href={`http://test.resources.huygens.knaw.nl/womenwriters/vre/documents/${props.doc.id}`} style={{width: "33%", display: "inline-block"}}>
					{props.doc.displayName_s}
				</a>
				<span style={{width: "33%", display: "inline-block"}}>
					{props.doc.relationType_s}
				</span>
				<a href={`http://test.resources.huygens.knaw.nl/womenwriters/vre/documents/${props.doc.document_id_s}`} style={{width: "33%", display: "inline-block"}}>
					{props.doc.document_displayName_s}
				</a>
			</li>
		)
	},
	searchFields: {
		...defaultComponentPack.searchFields,
		currentQuery: DocumentReceptionCurrentQuery
	}
};

documentComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default documentComponents;