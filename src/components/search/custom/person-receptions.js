import React from "react";
import PersonReceptionCurrentQuery from "./current-query/person-receptions";
import {defaultComponentPack} from "solr-faceted-search-react";
import { Link } from "react-router";
import { urls } from "../../../router";


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
					<div style={{width: "42%", display: "inline-block", verticalAlign: "top", paddingRight: "1em"}}>
						{authorName}
						<Link to={urls.publicationIndex(props.doc.reception_id_s)}>
							{props.doc.displayName_s}
						</Link>
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
						<Link to={urls.authorIndex(props.doc.person_id_s)}>
							{props.doc.person_displayName_s}
						</Link>
						<br />
						<span style={{color: "#666"}}>
							{props.doc.person_birthDate_i} - {props.doc.person_deathDate_i}
						</span>
						<br />
						<span style={{color: "#888"}}>
							<span style={{float: "right"}}>{(props.doc.person_relatedLocations_ss || []).join("; ")}</span>
							{props.doc.person_gender_s}
						</span>
					</div>
				</li>
			);
		}
	},
	searchFields: {
		...defaultComponentPack.searchFields,
		currentQuery: PersonReceptionCurrentQuery
	}
};

documentComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default documentComponents;
