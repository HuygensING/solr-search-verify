import React from "react";

class Relation extends React.Component {
	render() {
		let values = (this.props.values.length) ?
			<ul className="relation">{this.props.values.map((v, index) => this.props.onSelect ? (
				<li key={index}><a onClick={() => this.props.onSelect(v.id)}>{v.displayName}</a></li>
			)
				: (
				<li key={index}>{v.displayName}</li>
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