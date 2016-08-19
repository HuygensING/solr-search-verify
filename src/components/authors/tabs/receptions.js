import authorReceptionDefinitions from "../../../definitions/author-receptions";
import React from "react";
import RelationList from "../../values/relation-list";

class Receptions extends React.Component {
	render() {

		const listIsEmpty = authorReceptionDefinitions.outBound
			.map((receptionType) => (this.props.author["@relations"][receptionType] || []))
			.filter((receptions) => receptions.length > 0)
			.length === 0;

		return listIsEmpty ? (<div>The list is empty</div>) : (
			<ul className="list-group">
				{authorReceptionDefinitions.outBound.map((receptionType, j) => {
					const receptions = (this.props.author["@relations"][receptionType] || [])
						.sort((a, b) => a.displayName.localeCompare(b.displayName));

					return receptions.length ? (
						<RelationList
							key={j}
							label={authorReceptionDefinitions.overviewLabels[receptionType]}
							relations={receptions}
							onSelect={this.props.onSelectPublication}
						/>
					) : null;
				})}
			</ul>
		);
	}
}

export default Receptions;