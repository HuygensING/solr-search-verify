import React from "react";
import SaveFooter from "../save-footer";
import BasicInfo from "./tabs/basic-info";
import PersonalSituation from "./tabs/personal-situation";
import ProfessionalSituation from "./tabs/professional-situation";
import Publications from "./tabs/publications";
import Receptions from "./tabs/receptions";
import Links from "./tabs/links";

const components = {
	"basic-info": BasicInfo,
	"personal-situation": PersonalSituation,
	"professional-situation": ProfessionalSituation,
	"publications": Publications,
	"receptions": Receptions,
	"links": Links
};

class AuthorEditTabs extends React.Component {

	render() {
		const { params: { id, tab }, user } = this.props;

		const componentId = tab || "basic-info";
		const ChildComponent = components[componentId] || null;

		return ChildComponent ? (<div>
				<ChildComponent
					entity={this.props.entity}
					editable={true}
					onChange={this.props.onChange}
					onSelectAuthor={this.props.onSelectAuthor}
					onSelectPublication={this.props.onSelectPublication}
					onSelectCollective={user && user.token ? this.props.onSelectCollective : null}
					metadata={this.props.vre.collections.wwpersons}
				/>
				<SaveFooter onSave={() => this.props.onSaveAuthor(id, componentId)}
							onDelete={() => this.props.onDeleteAuthor(id)}
							onCancel={() => this.props.onSelectAuthor(id, componentId)} />
			</div>
		) : null;
	}
}

export default AuthorEditTabs;
