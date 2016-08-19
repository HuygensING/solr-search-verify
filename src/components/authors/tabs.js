import React from "react";
import BasicInfo from "./tabs/basic-info";

const components = {
	"basic-info": BasicInfo
};

class AuthorTabs extends React.Component {

	render() {
		if (this.props.children) { return (<div>{this.props.children}</div>); }

		const { params: { id, tab } } = this.props;
		const componentId = tab || "basic-info";
		const ChildComponent = components[componentId] || null;

		if (ChildComponent) {
			return <ChildComponent author={this.props.entity.data} />;
		}
		return  (<div>{componentId} for {id || "new"} {}</div>);
	}
}

export default AuthorTabs;