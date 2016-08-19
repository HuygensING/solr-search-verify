import React from "react";

class AuthorTabs extends React.Component {


	render() {
		const { params: { id, tab } } = this.props;

		return (<div>{tab} for {id}</div>);
	}
}

export default AuthorTabs;