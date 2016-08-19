import React from "react";

class AuthorTabs extends React.Component {

	render() {
		const { params: { id, tab } } = this.props;

		const componentId = tab || "basic-info";

		if (this.props.children) {
			return (<div>{this.props.children}</div>);
		} else {
			return (<div>{componentId} for {id || "new"} {}</div>);
		}
	}
}

export default AuthorTabs;