import React from "react";
import { Link } from "react-router";
import { urls } from "../../router";

class RelationList extends React.Component {
	render() {
		return (
			<li className="list-group-item">
				<label>{this.props.label}</label>
				<span>
					<ul>
						{this.props.relations.map((relation, i) => (
							<li className="list-group-item" key={i}>
								<Link to={urls[this.props.linkTo](relation.id)}>{i + 1}. {relation.displayName}</Link>
							</li>
						))}
					</ul>
				</span>
			</li>
		);
	}
}

export default RelationList;