import React from "react";
import SaveFooter from "../save-footer";

const components = {
/*	"basic-info": BasicInfo,
	"personal-situation": PersonalSituation,
	"professional-situation": ProfessionalSituation,
	"publications": Publications,
	"receptions": Receptions,
	"links": Links*/
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
