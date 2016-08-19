import React from "react";

import Relation from "../../values/relation";

class Public extends React.Component {
	render() {
		let model = this.props.author;

		return (
			<ul className="record list-group">
				<li className="list-group-item">
					<label>Profession(s) and other activities</label>
					<Relation values={model["@relations"].hasProfession} />
				</li>
				<li className="list-group-item">
					<label>Financial aspects</label>
					<Relation values={model["@relations"].hasFinancialSituation} />
				</li>
				<li className="list-group-item">
					<label>Collaborations</label>
					<Relation values={model["@relations"].isCollaboratorOf} />
				</li>
				<li className="list-group-item">
					<label>Memberships</label>
					<Relation values={model["@relations"].isMemberOf} onSelect={this.props.onSelectCollective} />
				</li>
			</ul>
		);
	}
}

Public.propTypes = {
	author: React.PropTypes.object,
	onNavigate: React.PropTypes.func
};

export default Public;