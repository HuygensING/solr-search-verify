import publicationReceptionDefinitions from "../../../definitions/publication-receptions";
import React from "react";
import RelationList from "../../values/relation-list";
import RelationField from "../../form-fields/relation";

class Receptions extends React.Component {

	renderReceptionList(inboundOrOutboundReceptions) {
		const { linkToView } = this.props;

		return inboundOrOutboundReceptions.map((receptionType, j) => {
			const receptions = (this.props.entity.data["@relations"][receptionType] || [])
				.sort((a, b) => a.displayName.localeCompare(b.displayName));
			return receptions.length ? (
				<RelationList
					key={j}
					label={publicationReceptionDefinitions.overviewLabels[receptionType]}
					relations={receptions}
					linkTo={linkToView}
				/>
			) : null;
		});
	}

	renderReceptionEdit(inboundOrOutboundReceptions) {
		const { onChange, metadata } = this.props;

		return inboundOrOutboundReceptions.map((receptionType, i) => (
			<li className="list-group-item" key={i}>
				<label>{publicationReceptionDefinitions.overviewLabels[receptionType]}</label>
				<RelationField name={receptionType}
							   path={metadata.properties.find((p) => p.name === receptionType).quicksearch}
							   onChange={onChange} entity={this.props.entity}
				/>
			</li>
		));
	}

	render() {

		const listIsEmpty = publicationReceptionDefinitions.outBound.concat(publicationReceptionDefinitions.inBound)
				.map((receptionType) => (this.props.entity.data["@relations"][receptionType] || []))
				.filter((receptions) => receptions.length > 0)
				.length === 0;

		const { editable } = this.props;

		if (editable) {
			return (
				<ul className="list-group">
					<li className="list-group-item">
						<h3>Publication has receptions</h3>
					</li>
					{this.renderReceptionEdit(publicationReceptionDefinitions.outBound)}
					<li className="list-group-item">
						<h3>Publication is a reception of</h3>
					</li>
					{this.renderReceptionEdit(publicationReceptionDefinitions.inBound)}
				</ul>
			);
		} else {
			return listIsEmpty ? (
				<ul className="list-group">
					<li className="list-group-item">The list is empty</li>
				</ul>
			) : (
				<ul className="list-group">
					{this.renderReceptionList(publicationReceptionDefinitions.outBound)}
					{this.renderReceptionList(publicationReceptionDefinitions.inBound)}
				</ul>
			);
		}
	}
}


export default Receptions;
