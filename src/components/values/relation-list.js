import React from "react";

class RelationList extends React.Component {
	render() {
		return (
			<li className="list-group-item">
				<label>{this.props.label}</label>
				<span>
					<ul>
						{this.props.relations.map((relation, i) => (
							<li className="list-group-item" key={i}>
								<a onClick={() => this.props.onSelect(relation.id)}>{i + 1}. {relation.displayName}</a>
							</li>
						))}
					</ul>
				</span>
			</li>
		);
	}
}

export default RelationList;