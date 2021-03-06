import React from "react";
import DocumentCurrentQuery from "./current-query/document";
import { defaultComponentPack } from "solr-faceted-search-react";


const documentComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => {
			const authorName = props.doc.authorName_ss ?
				(<span style={{color: "#888"}}>{props.doc.authorName_ss.join("; ")}<br /></span>) :
				null;

			return (
				<li className="list-group-item">
					<span style={{display: "flex"}}>
					<span style={{flexGrow: 1}}>
						{authorName}
						<a href={`http://resources.huygens.knaw.nl/womenwriters/vre/documents/${props.doc.id}`} >
							{props.doc.displayName_s}
						</a>
					</span>
						<span style={{"flexShrink": 1, color: "#888", whiteSpace: "nowrap"}}>
						{(props.doc.publishLocation_ss || []).join()}{" "}
						{props.doc.date_i}
					</span>
					</span>
				</li>
			);
		}
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
