import React from "react";
import { defaultComponentPack } from "solr-faceted-search-react";
import { urls } from "../../../router";
import { Link } from "react-router";

const personComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<Link to={urls.authorIndex(props.doc.id)} style={{display: "flex"}}>
					<span style={{"flexGrow": "1", whiteSpace: "nowrap", paddingRight: "1em"}}>{props.doc.displayName_s}</span>
					{props.doc.birthDate_i || props.doc.deathDate_i
						? <span style={{color: "#666", whiteSpace: "nowrap", paddingRight: "1em"}}>
								{props.doc.birthDate_i || "?"}
								&mdash;
								{props.doc.deathDate_i || "?"}
							</span>
						: null}
					<span title={props.doc.relatedLocations_ss ? props.doc.relatedLocations_ss.join(", ") : null} style={{"flexShrink": 1, color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
						{props.doc.relatedLocations_ss ? props.doc.relatedLocations_ss.join(", ") : null}
					</span>
				</Link>
			</li>
		)
	}
};

personComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default personComponents;
