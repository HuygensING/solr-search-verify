import React from "react";
import RelationList from "../../values/relation-list";

class Publications extends React.Component {
	render() {
		const publications = (this.props.author["@relations"].isCreatorOf || [])
			.sort((a, b) => a.displayName.localeCompare(b.displayName));

		return publications.length ? (
			<ul className="list-group">
				<RelationList
					label="Author of"
					relations={publications}
					onSelect={this.props.onSelectPublication}
				/>
			</ul>
		) : <div>The list is empty</div>;
	}
}

export default Publications;