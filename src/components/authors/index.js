import React from "react";
import AuthorHeader from "./header";

class AuthorIndex extends React.Component {

	componentDidMount() {
		const { entity, onSelectAuthor } = this.props;
		if (!entity.data) {
			onSelectAuthor(this.props.params.id);
		}
	}

	render() {
		const {entity, vre, onSelectAuthor} = this.props;

		if (!entity.data) { return null; }

		return (
			<div>
				<AuthorHeader author={entity.data} onSelectAuthor={onSelectAuthor} />
			</div>
		);
	}
}

export default AuthorIndex;