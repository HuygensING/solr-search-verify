import React from "react";

import StringComponent from "../../values/string";
import TextComponent from "../../values/text";
import Relation from "../../values/relation";

// import PersonRelation from "../../../values/relation-person";

class BasicInfo extends React.Component {
	render() {
		let model = this.props.author;

		let names = (model.names.length) ?
			model.names.map((name, index) => <li key={index}>{name.components.map((c) => c.value).join(" ")}</li>) :
			<li>-</li>;

		let pid = model["^pid"] ? <a className="link" href={model["^pid"]} target="_blank">{model["^pid"]}</a> : "-";
		return (
			<ul className="record list-group">
				<li className="list-group-item">
					<label>Name variations / spellings</label>
					<span><ul>{names}</ul></span>
				</li>
				<li className="list-group-item">
					<label>Pseudonyms</label>
					<Relation values={model["@relations"].hasPseudonym} />
				</li>
				<li className="list-group-item">
					<label>Person type</label>
					<StringComponent value={model.types.join(", ")} />
				</li>
				<li className="list-group-item">
					<label>Gender</label>
					<StringComponent value={model.gender} />
				</li>
				<li className="list-group-item">
					<label>Birth date</label>
					<StringComponent value={model.birthDate} />
				</li>
				<li className="list-group-item">
					<label>Birth place</label>
					<Relation values={model["@relations"].hasBirthPlace} />
				</li>
				<li className="list-group-item">
					<label>Lived in</label>
					<Relation values={model["@relations"].hasResidenceLocation} />
				</li>
				<li className="list-group-item">
					<label>Death date</label>
					<StringComponent value={model.deathDate} />
				</li>
				<li className="list-group-item">
					<label>Death place</label>
					<Relation values={model["@relations"].hasDeathPlace} />
				</li>
				<li className="list-group-item">
					<label>Related to</label>
{/*					<PersonRelation genderMap={this.props.genderMap} onNavigate={this.props.onNavigate} values={model["@relations"].isRelatedTo} />*/}
					<Relation values={model["@relations"].isRelatedTo} />
				</li>
				<li className="list-group-item">
					<label>Bibliography</label>
					<TextComponent value={model.bibliography} />
				</li>
				<li className="list-group-item">
					<label>Provisional Notes</label>
					<TextComponent value={model.notes} />
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