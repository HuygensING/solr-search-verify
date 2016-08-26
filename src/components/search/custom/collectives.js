import React from "react";
import { defaultComponentPack } from "solr-faceted-search-react";
import { urls } from "../../../router";
import { Link } from "react-router";

const collectiveComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<Link to={urls.collectiveIndex(props.doc.id)}>
					{props.doc.displayName_s}
				</Link>
			</li>
		)
	}
};


export default collectiveComponents;
