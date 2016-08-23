import React from "react";
import { Link } from "react-router";
import { urls } from "../router";
import cx from "classnames";
import { Login, Federated, Basic } from "hire-login";
import config from "../config";
import Messages from "./messages";

class App extends React.Component {


	render() {
		const { location: { pathname }, user } = this.props;

		const loggedIn = user && user.token;
		const authorsIsActive = pathname.match(/^\/womenwriters\/vre\/persons/);
		const publicationsIsActive = pathname.match(/^\/womenwriters\/vre\/documents/);
		const receptionsIsActive = pathname.match(/receptions\/(authors|publications)\/?$/);
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

		const newAuthorButton = loggedIn ? <button onClick={this.props.onNewAuthor}>New author</button> : null;
		const newPublicationButton = loggedIn ? <button onClick={this.props.onNewPublication}>New publication</button> : null;
		return (
			<div>
				<header>
					<div>
						<Login
							appId="WomenWriters"
							headers={{VRE_ID: "WomenWriters"}}
							onChange={(this.props.onLoginChange)}
							userUrl={config.userUrl}>
							<Federated url={config.federatedAuthenticateUrl} />
							<Basic url={config.basicAuthenticateUrl} />
						</Login>
						{newAuthorButton}
						{newPublicationButton}
					</div>
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
				<Messages types={["SUCCESS_MESSAGE", "ERROR_MESSAGE"]} messages={this.props.messages} onDismissMessage={this.props.onDismissMessage} />
				<main>
					{receptionToggle}
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default App;
