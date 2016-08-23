import React from "react";
import SaveFooter from "../save-footer";
import BasicInfo from "./tabs/basic-info";
import Receptions from "./tabs/receptions";
import Links from "./tabs/links";

const components = {
	"basic-info": BasicInfo,
	"receptions": Receptions,
	"links": Links
};

class PublicationEditTabs extends React.Component {

	render() {
		const { params: { id, tab }, user } = this.props;

		const componentId = tab || "basic-info";
		const ChildComponent = components[componentId] || null;

		return ChildComponent ? (<div>
				<ChildComponent
					authorized={user && user.token}
					entity={this.props.entity}
					editable={true}
					onChange={this.props.onChange}
					metadata={this.props.vre.collections.wwdocuments}
				/>
				<SaveFooter onSave={() => this.props.onSavePublication(id, componentId)}
							onDelete={() => this.props.onDeletePublication(id, componentId)}
							onCancel={() => this.props.onCancelPublication(id, componentId)} />
			</div>
		) : null;
	}
}

export default PublicationEditTabs;
