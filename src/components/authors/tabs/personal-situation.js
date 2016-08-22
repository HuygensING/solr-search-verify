import React from "react";

import StringComponent from "../../values/string";
import Relation from "../../values/relation";
import KeywordField from "../../form-fields/keyword";
import SelectField from "../../form-fields/select";

class Personal extends React.Component {
	render() {
		let model = this.props.entity.data;

		const { editable, onChange, metadata } = this.props;

		return (
			<ul className="record list-group">
				<li className="list-group-item">
					<label>Marital status</label>
					{ editable
						? <KeywordField name="hasMaritalStatus" onChange={onChange}
							options={metadata.properties.find((p) => p.name === "hasMaritalStatus").options}
							entity={this.props.entity} />
						: <Relation values={model["@relations"].hasMaritalStatus}/>
					}
				</li>
				<li className="list-group-item">
					<label>Children</label>
					{ editable
						? <SelectField
							name="children" options={metadata.properties.find((p) => p.name === "children").options}
							onChange={onChange} entity={this.props.entity} />
						: <StringComponent value={model.children}/>
					}
				</li>
				<li className="list-group-item">
					<label>Social class</label>
					{ editable
						? <KeywordField name="hasSocialClass" onChange={onChange}
										options={metadata.properties.find((p) => p.name === "hasSocialClass").options}
										entity={this.props.entity} />
						: <Relation values={model["@relations"].hasSocialClass}/>
					}
				</li>
				<li className="list-group-item">
					<label>Education</label>
					{ editable
						? <KeywordField name="hasEducation" onChange={onChange}
										options={metadata.properties.find((p) => p.name === "hasEducation").options}
										entity={this.props.entity} />
						: <Relation values={model["@relations"].hasEducation}/>
					}
				</li>
				<li className="list-group-item">
					<label>Religion / ideology</label>
					{editable
						? <KeywordField name="hasReligion" onChange={onChange}
										options={metadata.properties.find((p) => p.name === "hasReligion").options}
										entity={this.props.entity} />
						: <Relation values={model["@relations"].hasReligion}/>
					}
				</li>
			</ul>
		);
	}
}

Personal.propTypes = {
	entity: React.PropTypes.object,
	onNavigate: React.PropTypes.func
};

export default Personal;