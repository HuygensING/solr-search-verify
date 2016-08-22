import React from "react";
import SaveFooter from "../save-footer";
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

class AuthorEditTabs extends React.Component {

	render() {
		const { params: { id, tab }, user } = this.props;

		const componentId = tab || "basic-info";
		const ChildComponent = components[componentId] || null;

		return ChildComponent ? (<div>
				<ChildComponent
					author={this.props.entity.data}
					entity={this.props.entity}
					editable={true}
					onChange={this.props.onChange}
					onSelectAuthor={this.props.onSelectAuthor}
					onSelectPublication={this.props.onSelectPublication}
					onSelectCollective={user && user.token ? this.props.onSelectCollective : null}
					metadata={this.props.vre.collections.wwpersons}
				/>
				<SaveFooter onSave={() => this.props.onSave("authorTab", id, componentId)}
							onCancel={() => this.props.onSelectAuthor(id, componentId)} />
			</div>
		) : null;
	}
}

export default AuthorEditTabs;
