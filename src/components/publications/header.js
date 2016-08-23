import React from "react";
import { Link } from "react-router";
import { urls } from "../../router";
import publicationReceptionDefinitions from "../../definitions/publication-receptions";

const receptionOfRelations = publicationReceptionDefinitions.inBound;


class PublicationHeader extends React.Component {
	render() {
		const { linkToView } = this.props;
		const receptionOf = Object.keys(this.props.publication["@relations"]).filter((relName) => receptionOfRelations.indexOf(relName) > -1);
		const receptions = receptionOf.length ? receptionOf
			.map((relName) => this.props.publication["@relations"][relName])
			.reduce((a, b) => a.concat(b), []) :
			null;

		const receptionTag = receptions ?
			<small className="receptions">
				<span>Reception on</span>
				{ receptions.map((reception, i) => (
					<Link key={i} to={urls[linkToView](reception.id)}>
						{reception.displayName}
					</Link>
				))}
			</small> :
			null;

		return (
			<header className="page">
				<h2 title={this.props.publication.title}>
					<span>{this.props.publication.title}</span>
					{receptionTag}
				</h2>
			</header>
		);
	}
}

PublicationHeader.propTypes = {
	publication: React.PropTypes.object
};

export default PublicationHeader;