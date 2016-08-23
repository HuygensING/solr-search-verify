import React from "react";
import { urls } from "../../router";
import cx from "classnames";
import { Link } from "react-router";
import PublicationTabs from "./tabs";
import PublicationHeader from "./header";
import ModifiedBy from "../values/modified-by";


class PublicationIndex extends React.Component {

	componentDidMount() {
		const {entity, onFetchPublication, onNewPublication, params: { id }} = this.props;
		// If the requested id from the route does not match the data, or if there is no data
		if ((!entity.data && id) || (id && entity.data && entity.data._id !== id) ) {
			// Fetch the correct author based on the id.
			onFetchPublication(id);
		} else if (!id) {
			onNewPublication();
		}
	}

	componentWillReceiveProps(nextProps) {
		const { onFetchPublication } = this.props;
		// Triggers fetch data from server based on id from route.
		if (this.props.params.id !== nextProps.params.id) {
			onFetchPublication(nextProps.params.id);
		}
	}


	render() {
		const {entity, location: { pathname }, params: { tab }, user} = this.props;


		if (!entity.data) { return null; }

		const loggedIn = user && user.token;
		const id = entity.data._id || null;

		const editing = !entity.transactionPending && loggedIn && (pathname.match(/\/edit$/) || pathname.match(/\/new$/));

		const editButton = loggedIn && id && !editing ?
			<Link className="btn btn-default" to={urls.publicationEdit(id, tab || "basic-info")}>
				Edit
			</Link> : null;

		const tabRoute = (toTab) => editing ? urls.publicationEdit(id, toTab) : urls.publicationTab(id, toTab);

		const tabLinks = id ? (
			<div className="list-group">
				<Link className={cx("list-group-item", {active: !tab || tab === "basic-info"})} to={tabRoute("basic-info")}>
					Basic info
				</Link>
			</div>
		) : loggedIn ? (
			<div className="list-group">
				<Link className={cx("list-group-item", {active: !tab || tab === "basic-info"})} to={urls.publicationNew()}>
					Basic info
				</Link>
			</div>
		) : null;

		return (
			<div className={cx("publication", "overview", {"transaction-pending": entity.transactionPending})}>

				<div className="col-md-12 row m-b-1">
					<div className="col-md-3">
						<Link className="btn btn-default" to={urls.publicationSearch()}>◂ Results</Link>
					</div>
					<div className="col-md-6">
						<PublicationHeader publication={entity.data} />
					</div>
					<div className="col-md-3">
					</div>
				</div>

				<div className="col-md-12 row">
					<div className="col-md-3">
						{tabLinks}
						<ModifiedBy label="Created by" {...entity.data["^created"]} />
						<ModifiedBy label="Modified by" {...entity.data["^modified"]} />
						{editButton}
					</div>
					<div className="col-md-9">
						{!tab ? <PublicationTabs {...this.props} editable={editing ? true : false} /> : this.props.children}
					</div>
				</div>


			</div>
		);
	}
}

export default PublicationIndex;