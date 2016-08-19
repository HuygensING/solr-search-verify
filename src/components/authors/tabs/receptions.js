import authorReceptionDefinitions from "../../../definitions/author-receptions";
import React from "react";

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
						<li className="list-group-item" key={j}>
							<label>{authorReceptionDefinitions.overviewLabels[receptionType]}</label>
							<span>
								<ul>
									{receptions.map((relation, i) => (
										<li className="list-group-item" key={i}>
											<a>{i + 1}. {relation.displayName}</a>
										</li>
									))}
								</ul>
							</span>
						</li>
					) : null;
				})}
			</ul>
		);
	}
}

export default Receptions;