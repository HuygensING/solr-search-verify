import React from "react";
import { urls } from "../../router";
import cx from "classnames";
import { Link } from "react-router";
import AuthorTabs from "./tabs";
import AuthorHeader from "./header";
import ModifiedBy from "../values/modified-by";


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

		return (
			<div className="author overview">
				<div className="row m-b-1">
					<div className="col-md-2">
						<Link className="btn btn-default" to={urls.authorSearch()}>◂ Results</Link>
					</div>
					<div className="col-md-8">
						<AuthorHeader author={entity.data} onSelectAuthor={onSelectAuthor} />
					</div>
					<div className="col-md-2">
					</div>
				</div>
				<div className="row">
					<div className="col-md-2">
						<div className="list-group">
							<Link className={cx("list-group-item", {active: !tab})} to={urls.authorIndex(id)}>
								Basic info
							</Link>
							<Link className={cx("list-group-item", {active: tab === "personal-situation"})} to={urls.authorTab(id, "personal-situation")}>
								Personal situation
							</Link>
							<Link className={cx("list-group-item", {active: tab === "professional-situation"})} to={urls.authorTab(id, "professional-situation")}>
								Professional situation
							</Link>
							<Link className={cx("list-group-item", {active: tab === "publications"})} to={urls.authorTab(id, "publications")}>
								Publications of this author
							</Link>
							<Link className={cx("list-group-item", {active: tab === "receptions"})} to={urls.authorTab(id, "receptions")}>
								Receptions
							</Link>
							<Link className={cx("list-group-item", {active: tab === "links"})} to={urls.authorTab(id, "links")}>
								Links to relevant projects and sites
							</Link>
						</div>
						<ModifiedBy label="Created by" {...entity.data["^created"]} />
						<ModifiedBy label="Modified by" {...entity.data["^modified"]} />
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