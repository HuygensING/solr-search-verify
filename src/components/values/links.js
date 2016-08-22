import React from "react";

class Links extends React.Component {
	render() {
		let links;

		if (this.props.values.length) {

			links = this.props.values.map((link, index) =>
				<li key={link.url + index} className="list-group-item">
					<a href={link.url}>{link.label}</a>
				</li>
			);

			links = <ul className="list-group">{links}</ul>;
		} else {
			links = <ul className="list-group"><li className="list-group-item"> The list of links is empty.</li></ul>;
		}

		return links;
	}
}

Links.propTypes = {
	values: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			url: React.PropTypes.string,
			label: React.PropTypes.string
		})
	)
};

Links.defaultProps = {
	values: []
};

export default Links;