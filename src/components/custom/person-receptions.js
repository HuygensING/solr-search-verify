import React from "react";
import {defaultComponentPack} from "solr-faceted-search-react";


const documentComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<a href={`http://resources.huygens.knaw.nl/womenwriters/vre/documents/${props.doc.reception_id_s}`} style={{width: "33%", display: "inline-block"}}>
					{props.doc.displayName_s}
				</a>
				<span style={{width: "33%", display: "inline-block"}}>
					{props.doc.relationType_s}
				</span>
				<a href={`http://resources.huygens.knaw.nl/womenwriters/vre/persons/${props.doc.person_id_s}`} style={{width: "33%", display: "inline-block"}}>
					{props.doc.person_displayName_s}
				</a>
			</li>
		)
	},
	searchFields: {
		...defaultComponentPack.searchFields/*,
		currentQuery: PersonReceptionCurrentQuery*/
	}
};

documentComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default documentComponents;
