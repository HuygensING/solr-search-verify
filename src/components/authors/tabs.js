import React from "react";

class AuthorTabs extends React.Component {


	render() {
		const { params: { id, tab } } = this.props;

		return (<div>{tab || "Basic info"} for {id || "new"}</div>);
	}
}

export default AuthorTabs;