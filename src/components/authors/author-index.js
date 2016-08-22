import React from "react";
import { urls } from "../../router";
import cx from "classnames";
import { Link } from "react-router";
import AuthorTabs from "./tabs";
import AuthorHeader from "./header";
import ModifiedBy from "../values/modified-by";


class AuthorIndex extends React.Component {

	componentDidMount() {
		const {entity, onFetchAuthorFromRoute, onNewAuthor, params: { id }} = this.props;

		// If the requested id from the route does not match the data, or if there is no data
		if ((!entity.data && id) || (id && entity.data && entity.data._id !== id) ) {
			// Fetch the correct author based on the id.
			onFetchAuthorFromRoute(id);
		} else if (!id) {
			onNewAuthor();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { onFetchAuthorFromRoute } = this.props;

		// Handles back- and forward button navigation when no remount happened
		if (this.props.params.id !== nextProps.params.id) {
			onFetchAuthorFromRoute(nextProps.params.id);
		}
	}


	render() {
		const {entity, onSelectAuthor, location: { pathname }, params: { tab }, user} = this.props;

		if (!entity.data) { return null; }

		const loggedIn = user && user.token;
		const id = entity.data._id || null;

		const editing = !entity.transactionPending && loggedIn && (pathname.match(/\/edit$/) || pathname.match(/\/new$/));

		const editButton = loggedIn && id && !editing ?
			<Link className="btn btn-default" to={urls.authorEdit(id, tab || "basic-info")}>
				Edit
			</Link> : null;

		const tabRoute = (toTab) => editing ? urls.authorEdit(id, toTab) : urls.authorTab(id, toTab);

		const tabLinks = id ? (
			<div className="list-group">
				<Link className={cx("list-group-item", {active: !tab || tab === "basic-info"})} to={tabRoute("basic-info")}>
					Basic info
				</Link>
				<Link className={cx("list-group-item", {active: tab === "personal-situation"})} to={tabRoute("personal-situation")}>
					Personal situation
				</Link>
				<Link className={cx("list-group-item", {active: tab === "professional-situation"})} to={tabRoute("professional-situation")}>
					Professional situation
				</Link>
				<Link className={cx("list-group-item", {active: tab === "publications"})} to={tabRoute("publications")}>
					Publications of this author
				</Link>
				<Link className={cx("list-group-item", {active: tab === "receptions"})} to={tabRoute("receptions")}>
					Receptions
				</Link>
				<Link className={cx("list-group-item", {active: tab === "links"})} to={tabRoute("links")}>
					Links to relevant projects and sites
				</Link>
			</div>
		) : loggedIn ? (
			<div className="list-group">
				<Link className={cx("list-group-item", {active: !tab || tab === "basic-info"})} to={urls.authorNew()}>
					Basic info
				</Link>
			</div>
		) : null;

		return (
			<div className={cx("author", "overview", {"transaction-pending": entity.transactionPending})}>
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
						{tabLinks}
						<ModifiedBy label="Created by" {...entity.data["^created"]} />
						<ModifiedBy label="Modified by" {...entity.data["^modified"]} />
						{editButton}
					</div>
					<div className="col-md-10">
						{!tab ? <AuthorTabs {...this.props} editable={editing ? true : false} /> : this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default AuthorIndex;