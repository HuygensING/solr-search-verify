import React from "react";

class Publications extends React.Component {
	render() {
		const publications = (this.props.author["@relations"].isCreatorOf || [])
			.sort((a, b) => a.displayName.localeCompare(b.displayName));

		return publications.length ? (
			<ul className="list-group">
				<li className="list-group-item">
					<label>Author of</label>
					<span>
						<ul className="record list-group">
							{publications.map((relation, i) => (
								<li className="list-group-item" key={i}>
									<a>{i + 1}. {relation.displayName}</a>
								</li>
							))}
						</ul>
					</span>
				</li>
			</ul>
		) : <div>The list is empty</div>;
	}
}

export default Publications;