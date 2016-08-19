import React from "react";
import SaveFooter from "../save-footer";

class AuthorEditTabs extends React.Component {

	render() {
		const { params: { id, tab }, onSelectAuthor } = this.props;

		const componentId = tab || "basic-info";

		return (<div>
				EDIT {componentId} for {id}
				<SaveFooter onCancel={() => onSelectAuthor(id)} />
			</div>
		);
	}
}

export default AuthorEditTabs;
