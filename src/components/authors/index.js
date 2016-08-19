import React from "react";
import AuthorHeader from "./header";
import cx from "classnames";
import { Link } from "react-router";
import AuthorTabs from "./tabs";
import { urls } from "../../router";

class AuthorIndex extends React.Component {

	componentDidMount() {
		const { entity, onSelectAuthor } = this.props;
		if (!entity.data) {
			onSelectAuthor(this.props.params.id);
		}
	}

	render() {
		const {entity, onSelectAuthor, params: { id, tab }} = this.props;

		if (!entity.data) { return null; }

		const authorIndexIsActive = !tab;
		const authorPersonalIsActive = tab === "personal-situation";
		const authorProfessionalIsActive = tab === "professional-situation";
		const authorPublicationsIsActive = tab === "publications";
		const authorReceptionsIsActive = tab === "receptions";
		const authorLinksIsActive = tab === "links";

		return (
			<div className="author overview">
				<div className="row m-b-1">
					<div className="col-md-2">
					</div>
					<div className="col-md-8">
						<AuthorHeader author={entity.data} onSelectAuthor={onSelectAuthor} />
					</div>
					<div className="col-md-2">
					</div>
				</div>
				<div className="row">
					<div className="col-md-2 list-group">
						<Link className={cx("list-group-item", {active: authorIndexIsActive})} to={urls.authorIndex(id)}>
							Basic info
						</Link>
						<Link className={cx("list-group-item", {active: authorPersonalIsActive})} to={urls.authorTab(id, "personal-situation")}>
							Personal situation
						</Link>
						<Link className={cx("list-group-item", {active: authorProfessionalIsActive})} to={urls.authorTab(id, "professional-situation")}>
							Professional situation
						</Link>
						<Link className={cx("list-group-item", {active: authorPublicationsIsActive})} to={urls.authorTab(id, "publications")}>
							Publications of this author
						</Link>
						<Link className={cx("list-group-item", {active: authorReceptionsIsActive})} to={urls.authorTab(id, "receptions")}>
							Receptions
						</Link>
						<Link className={cx("list-group-item", {active: authorLinksIsActive})} to={urls.authorTab(id, "links")}>
							Links to relevant projects and sites
						</Link>
					</div>
					<div className="col-md-10">
						{!tab ? <AuthorTabs {...this.props} /> : this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default AuthorIndex;