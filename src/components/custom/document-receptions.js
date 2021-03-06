import React from "react";
import DocumentReceptionCurrentQuery from "./current-query/document-receptions";
import {defaultComponentPack} from "solr-faceted-search-react";


const documentComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => {
			const authorName = props.doc.authorName_ss ?
				(<span style={{color: "#888"}}>{props.doc.authorName_ss.join("; ")}<br /></span>) :
				null;
			const authorName1 = props.doc.document_authorName_ss ?
				(<span style={{color: "#888"}}>{props.doc.document_authorName_ss.join("; ")}<br /></span>) :
				null;
			return (
				<li className="list-group-item">
					<div style={{width: "42%", display: "inline-block", verticalAlign: "top", paddingRight: "1em"}}>
						{authorName}
						<a href={`http://resources.huygens.knaw.nl/womenwriters/vre/documents/${props.doc.reception_id_s}`}>
							{props.doc.displayName_s}
						</a>
						<br />
						<span style={{color: "#888"}}>
							<span style={{float: "right"}}>{props.doc.date_i}</span>
							{(props.doc.publishLocation_ss || []).join("; ")}
						</span>
					</div>
					<div style={{width: "16%", display: "inline-block", verticalAlign: "top", color: "#666"}}>
						{props.doc.relationType_s}
					</div>
					<div style={{width: "42%", display: "inline-block", verticalAlign: "top"}}>
						{authorName1}
						<a href={`http://resources.huygens.knaw.nl/womenwriters/vre/documents/${props.doc.document_id_s}`}>
							{props.doc.document_displayName_s}
						</a>
						<br />
						<span style={{color: "#888"}}>
							<span style={{float: "right"}}>{props.doc.document_date_i}</span>
							{(props.doc.document_publishLocation_ss || []).join("; ")}
						</span>
					</div>
				</li>
			);
		}
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
