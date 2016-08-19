import React from "react";
import BasicInfo from "./tabs/basic-info";
import PersonalSituation from "./tabs/personal-situation";
import ProfessionalSituation from "./tabs/professional-situation";
import Publications from "./tabs/publications";
import Receptions from "./tabs/receptions";

const components = {
	"basic-info": BasicInfo,
	"personal-situation": PersonalSituation,
	"professional-situation": ProfessionalSituation,
	"publications": Publications,
	"receptions": Receptions
};

class AuthorTabs extends React.Component {

	render() {
		if (this.props.children) { return (<div>{this.props.children}</div>); }

		const { params: { id, tab }, user } = this.props;
		const componentId = tab || "basic-info";
		const ChildComponent = components[componentId] || null;

		if (ChildComponent) {
			return (<ChildComponent
				author={this.props.entity.data}
				entity={this.props.entity}
				onSelectAuthor={this.props.onSelectAuthor}
				onSelectPublication={this.props.onSelectPublication}
				onSelectCollective={user && user.token ? this.props.onSelectCollective : null}
			/>);
		}
		return (<div>{componentId} for {id || "new"} {}</div>);
	}
}

export default AuthorTabs;