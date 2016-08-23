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
		const { params: { id, tab }, user, location: { pathname } } = this.props;

		const componentId = tab || "basic-info";
		const ChildComponent = components[componentId] || null;

		const inPublicationReceptions = pathname.match(/\/receptions\/publications\//);

		const { onSave, onDelete, onCancel } = {
			onSave: inPublicationReceptions
				? () => this.props.onSavePublication(id, componentId, "publicationReception")
				: () => this.props.onSavePublication(id, componentId),
			onDelete: inPublicationReceptions
				? () => this.props.onDeletePublication(id, componentId, "publicationReception")
				: () => this.props.onDeletePublication(id, componentId),
			onCancel: inPublicationReceptions
				? () => this.props.onCancelPublication(id, componentId, "publicationReception")
				: () => this.props.onCancelPublication(id, componentId)
		};

		return ChildComponent ? (<div>
				<ChildComponent
					authorized={user && user.token}
					entity={this.props.entity}
					editable={true}
					linkToView={inPublicationReceptions ? "publicationReceptionIndex" : "publicationIndex"}
					onChange={this.props.onChange}
					metadata={this.props.vre.collections.wwdocuments}
				/>
				<SaveFooter onSave={onSave} onDelete={onDelete} onCancel={onCancel} />
			</div>
		) : null;
	}
}

export default PublicationEditTabs;
