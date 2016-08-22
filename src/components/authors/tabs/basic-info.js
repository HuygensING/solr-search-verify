import React from "react";

import StringComponent from "../../values/string";
import TextComponent from "../../values/text";
import Relation from "../../values/relation";

import DatableField from "../../form-fields/datable";
import SelectField from "../../form-fields/select";
import MultiSelectField from "../../form-fields/multi-select";
import RelationField from "../../form-fields/relation";
import NamesField from "../../form-fields/names";
import TextField from "../../form-fields/text";

class BasicInfo extends React.Component {
	render() {
		const model = this.props.entity.data;

		const names = (model.names.length) ?
			model.names.map((name, index) => <li key={index}>{name.components.map((c) => c.value).join(" ")}</li>) :
			<li>-</li>;

		const pid = model["^pid"] ? <a className="link" href={model["^pid"]} target="_blank">{model["^pid"]}</a> : "-";

		const { editable, onChange, metadata } = this.props;

		return (
			<ul className="record list-group">
				<li className="list-group-item">
					<label>Name variations / spellings</label>
					{ editable
						? <NamesField
							name="names" options={metadata.properties.find((p) => p.name === "names").options}
							onChange={onChange} entity={this.props.entity}/>
						: <span><ul>{names}</ul></span>
					}
				</li>
				<li className="list-group-item">
					<label>Pseudonyms</label>
					{ editable
						? <RelationField
							name="hasPseudonym" path={metadata.properties.find((p) => p.name === "hasPseudonym").quicksearch}
							onChange={onChange} entity={this.props.entity}/>
						: <Relation values={model["@relations"].hasPseudonym} onSelect={this.props.onSelectAuthor} />
					}
				</li>
				<li className="list-group-item">
					<label>Person type</label>
					{ editable
						? <MultiSelectField
							name="types" options={metadata.properties.find((p) => p.name === "types").options}
							onChange={onChange} entity={this.props.entity}/>
						: <StringComponent value={model.types.join(", ")}/>
					}
				</li>
				<li className="list-group-item">
					<label>Gender</label>
					{ editable
						? <SelectField
							name="gender" options={metadata.properties.find((p) => p.name === "gender").options}
							onChange={onChange} entity={this.props.entity} />
						: <StringComponent value={model.gender} />
					}
				</li>
				<li className="list-group-item">
					<label>Birth date</label>
					{ editable
						? <DatableField name="birthDate" onChange={onChange} entity={this.props.entity} />
						: <StringComponent value={model.birthDate}/>
					}
				</li>
				<li className="list-group-item">
					<label>Birth place</label>
					{ editable
						? <RelationField
						name="hasBirthPlace" path={metadata.properties.find((p) => p.name === "hasBirthPlace").quicksearch}
						onChange={onChange} entity={this.props.entity}/>
						: <Relation values={model["@relations"].hasBirthPlace}/>
					}
				</li>
				<li className="list-group-item">
					<label>Lived in</label>
					{ editable
						? <RelationField
							name="hasResidenceLocation" path={metadata.properties.find((p) => p.name === "hasResidenceLocation").quicksearch}
							onChange={onChange} entity={this.props.entity}/>
						: <Relation values={model["@relations"].hasResidenceLocation}/>
					}
				</li>
				<li className="list-group-item">
					<label>Death date</label>
					{ editable
						? <DatableField name="deathDate" onChange={onChange} entity={this.props.entity} />
						: <StringComponent value={model.deathDate}/>
					}
				</li>
				<li className="list-group-item">

					<label>Death place</label>
					{ editable
						? <RelationField name="hasDeathPlace" path={metadata.properties.find((p) => p.name === "hasDeathPlace").quicksearch}
							onChange={onChange} entity={this.props.entity} />
						: <Relation values={model["@relations"].hasDeathPlace}/>
					}
				</li>
				<li className="list-group-item">
					<label>Related to</label>
					{ editable
						? <RelationField name="isRelatedTo" path={metadata.properties.find((p) => p.name === "isRelatedTo").quicksearch}
							onChange={onChange} entity={this.props.entity} />
						: <Relation values={model["@relations"].isRelatedTo} onSelect={this.props.onSelectAuthor}/>
					}
				</li>
				<li className="list-group-item">
					<label>Bibliography</label>
					{ editable
						? <TextField name="bibliography" onChange={onChange} entity={this.props.entity} />
						: <TextComponent value={model.bibliography}/>
					}
				</li>
				<li className="list-group-item">
					<label>Provisional Notes</label>
					{ editable
						? <TextField name="notes" onChange={onChange} entity={this.props.entity} />
						: <TextComponent value={model.notes}/>
					}
				</li>
				<li className="list-group-item">
					<label>Persistent ID</label>
					{pid}
				</li>
			</ul>
		);
	}
}

BasicInfo.propTypes = {
	author: React.PropTypes.object,
	genderMap: React.PropTypes.object,
	onNavigate: React.PropTypes.func
};

export default BasicInfo;