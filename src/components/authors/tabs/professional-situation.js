import React from "react";

import Relation from "../../values/relation";
import KeywordField from "../../form-fields/keyword";
import RelationField from "../../form-fields/relation";

class Public extends React.Component {
	render() {
		let model = this.props.entity.data;

		const { editable, onChange, metadata } = this.props;

		return (
			<div>
				<ul className="record list-group">
					<li className="list-group-item">
						<label>Profession(s) and other activities</label>
						{ editable
							? <KeywordField name="hasProfession" onChange={onChange}
											options={metadata.properties.find((p) => p.name === "hasProfession").options}
											entity={this.props.entity} />
							: <Relation values={model["@relations"].hasProfession}/>
						}
					</li>
					<li className="list-group-item">
						<label>Financial aspects</label>
						{ editable
							? <KeywordField name="hasFinancialSituation" onChange={onChange}
											options={metadata.properties.find((p) => p.name === "hasFinancialSituation").options}
											entity={this.props.entity} />
							: <Relation values={model["@relations"].hasFinancialSituation}/>
						}
					</li>
					<li className="list-group-item">
						<label>Collaborations</label>
						{ editable
							? <RelationField name="isCollaboratorOf"
								path={metadata.properties.find((p) => p.name === "isCollaboratorOf").quicksearch}
								onChange={onChange} entity={this.props.entity} />
							: <Relation values={model["@relations"].isCollaboratorOf} onSelect={this.props.onSelectAuthor} />
						}
					</li>
					<li className="list-group-item">
						<label>Memberships</label>
						{ editable
							? <RelationField name="isMemberOf"
								path={metadata.properties.find((p) => p.name === "isMemberOf").quicksearch}
								onChange={onChange} entity={this.props.entity} />
							: <Relation values={model["@relations"].isMemberOf} onSelect={this.props.onSelectCollective}/>
						}
					</li>
				</ul>
				<div className="temp-data panel panel-default">
					<h2 className="panel-heading">Temporary data</h2>
					<ul className="list-group">
						<li className="list-group-item">
							<label>Financial situation</label>
							<span>{model.tempFinancialSituation}</span>
						</li>
						<li className="list-group-item">
							<label>Collaborations</label>
							<span>{model.tempCollaborations}</span>
						</li>
						<li className="list-group-item">
							<label>Memberships</label>
							<span>{model.tempMemberships}</span>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

Public.propTypes = {
	entity: React.PropTypes.object
};

export default Public;