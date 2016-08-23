import React from "react";
import { urls } from "../../../router";
import { Link } from "react-router";

class AuthorReceptionPageLinks extends React.Component {


	render() {
		const { entity, authorReceptionPages } = this.props;

		const pageIndex = authorReceptionPages.indexOf(entity.data._id);
		const nextPublication = pageIndex > -1 && pageIndex < authorReceptionPages.length - 1 ?
			<Link className="btn btn-default pull-right" to={urls.authorReceptionIndex(authorReceptionPages[pageIndex + 1])}>Next ▸</Link> : null;

		const prevPublication = pageIndex > -1 && pageIndex > 0 ?
			<Link className="btn btn-default pull-right" to={urls.authorReceptionIndex(authorReceptionPages[pageIndex - 1])}>◂ Previous</Link> : null;


		return (
			<div className="col-md-3">
				{nextPublication}
				{prevPublication}
			</div>
		);
	}
}

export default AuthorReceptionPageLinks;