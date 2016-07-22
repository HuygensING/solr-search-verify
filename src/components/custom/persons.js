import React from "react";
import { defaultComponentPack } from "solr-faceted-search-react";

const personComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: (props) => (
			<li className="list-group-item">
				<a href={`http://test.repository.huygens.knaw.nl/v2.1/domain/wwpersons/${props.doc.id}`} target="_blank">
					<span style={{marginLeft: "20px", color: "#aaa", float: "right"}}>
						({new Date(props.doc.modified_l).toString()})
					</span>

					{props.doc.displayName_s}
					<span style={{marginLeft: "20px", color: "#666"}}>
						{props.doc.birthDate_i}
						&nbsp;-&nbsp;
						{props.doc.deathDate_i}
					</span>
				</a>
			</li>
		)
	}
};

personComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default personComponents;