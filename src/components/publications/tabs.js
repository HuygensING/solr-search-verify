import React from "react";
import SaveFooter from "../save-footer";


const components = {
/*
	"basic-info": BasicInfo,
	"personal-situation": PersonalSituation,
	"professional-situation": ProfessionalSituation,
	"publications": Publications,
	"receptions": Receptions,
	"links": Links
*/
};

class PublicationTabs extends React.Component {

	render() {
		if (this.props.children) { return (<div>{this.props.children}</div>); }

		const { params: { id, tab }, user } = this.props;
		const componentId = tab || "basic-info";
		const ChildComponent = components[componentId] || null;

		const saveFooter = this.props.editable
			? (<SaveFooter
					onSave={this.props.onSaveNewPublication}
					onDelete={() => this.props.onCancelPublication()}
					onCancel={() => this.props.onCancelPublication()}
		/>) : null;

		if (ChildComponent) {
			return (
				<div>
					<ChildComponent
						authorized={user && user.token}
						entity={this.props.entity}
						editable={this.props.editable}
						onChange={this.props.onChange}
						metadata={this.props.vre.collections.wwdocuments}
					/>
					{saveFooter}
				</div>
			);
		}

		return (<div>{componentId} for {id || "new"} {}</div>);
	}
}

export default PublicationTabs;