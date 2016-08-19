import React from "react";

import StringComponent from "../../values/string";
import Relation from "../../values/relation";
// import PersonRelation from "../../values/relation-person";

class Personal extends React.Component {
	render() {
		let model = this.props.author;
		return (
			<ul className="record list-group">
				<li className="list-group-item">
					<label>Marital status</label>
					<Relation values={model["@relations"].hasMaritalStatus} />
				</li>
				<li className="list-group-item">
					<label>Sibling of</label>
{/*					<PersonRelation onNavigate={this.props.onNavigate} values={model["@relations"].isSiblingOf} />*/}
					<Relation values={model["@relations"].isSiblingOf} />
				</li>
				<li className="list-group-item">
					<label>Children</label>
					<StringComponent value={model.children} />
				</li>
				<li className="list-group-item">
					<label>Social class</label>
					<Relation values={model["@relations"].hasSocialClass} />
				</li>
				<li className="list-group-item">
					<label>Education</label>
					<Relation values={model["@relations"].hasEducation} />
				</li>
				<li className="list-group-item">
					<label>Religion / ideology</label>
					<Relation values={model["@relations"].hasReligion} />
				</li>
			</ul>
		);
	}
}

Personal.propTypes = {
	author: React.PropTypes.object,
	onNavigate: React.PropTypes.func
};

export default Personal;