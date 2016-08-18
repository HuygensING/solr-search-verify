import React from "react";
import { Link } from "react-router";
import { urls } from "../router";
import cx from "classnames";

class App extends React.Component {


	render() {
		const { location: { pathname } } = this.props;
		const authorsIsActive = pathname.match(/^\/womenwriters\/vre\/persons/);
		const publicationsIsActive = pathname === urls.publicationSearch(true);

		const receptionsIsActive = pathname.match(/\/receptions\//);
		const authorReceptionsIsActive = pathname === urls.authorReceptionSearch(true);
		const publicationReceptionsIsActive = pathname === urls.publicationReceptionSearch(true);

		const receptionToggle = receptionsIsActive ? (
			<div className="btn-group">
				<Link className={cx("btn", "btn-default", {active: authorReceptionsIsActive})} to={urls.authorReceptionSearch()}>Authors</Link>
				<Link className={cx("btn", "btn-default", {active: publicationReceptionsIsActive})} to={urls.publicationReceptionSearch()}>Publications</Link>
			</div>) : null;

		const receptionLink = receptionsIsActive ?
			<Link to={pathname}>Receptions</Link> :
			<Link to={urls.publicationReceptionSearch()}>Receptions</Link>;

		return (
			<div>
				<header>
					<nav className="navbar navbar-default">
						<ul className="nav navbar-nav">
							<li className={cx({active: authorsIsActive})}>
								<Link to={urls.authorSearch()}>Authors</Link>
							</li>
							<li className={cx({active: publicationsIsActive})}>
								<Link to={urls.publicationSearch()}>Publications</Link>
							</li>
							<li className={cx({active: receptionsIsActive})}>
								{receptionLink}
							</li>
						</ul>
					</nav>
				</header>
				<main>
					{receptionToggle}
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default App;
