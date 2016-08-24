import React from "react";
import { urls } from "../../router";
import { Link } from "react-router";

const genderMap = {
	"FEMALE": " ♀",
	"MALE": " ♂"
};


class Relation extends React.Component {
	render() {
		let values = (this.props.values.length) ?
			<ul className="relation">{this.props.values
				.sort((a, b) => a.displayName.localeCompare(b.displayName))
				.map((v, index) => this.props.linkTo ? (
				<li key={index}><Link to={urls[this.props.linkTo](v.id)}>{v.displayName}{v.gender ? genderMap[v.gender] : ""}</Link></li>
			)
				: (
				<li key={index}>{v.displayName}{v.gender ? genderMap[v.gender] : ""}</li>
			))}</ul> :
			"-";

		return (
			<span>{values}</span>
		);
	}
}

Relation.propTypes = {
	values: React.PropTypes.array
};

Relation.defaultProps = {
	values: []
};

export default Relation;