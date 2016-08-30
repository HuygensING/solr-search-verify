import React from "react";
import { defaultComponentPack } from "solr-faceted-search-react";
import AuthorResult from "./result/author";

const personComponents = {
	...defaultComponentPack,
	results: {
		...defaultComponentPack.results,
		result: AuthorResult
	}
};

personComponents.results.result.propTypes = {
	doc: React.PropTypes.object
};

export default personComponents;
