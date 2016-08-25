import config from "../config";
import server from "./server";

import authorReceptionDefinitions from "../definitions/author-receptions";
import publicationReceptionDefinitions from "../definitions/publication-receptions";

const allTypes = authorReceptionDefinitions.outBound.concat(publicationReceptionDefinitions.outBound).concat("isCreatedBy")

/*
let fetchDomainMetadata = function(domain, id, dispatch) {
	fetch(`${config.domainUrl}/${domain}/${id}`, (response) => {
		if(domain === "persons" && response["@variationRefs"].map((v) => v.type).indexOf("wwperson") > -1) {
			fetchDomainMetadata("wwpersons", id, dispatch);
		} else {
			dispatch({
				type: "RECEIVE_GRAPH_TABLE",
				response: response,
				id: `${domain}/${id}`
			});
		}
	});
};
*/

const parseIncomingGraph = function(data) {
	for(let i in data.links) {
		data.links[i].source = data.nodes[data.links[i].source];
		data.links[i].target = data.nodes[data.links[i].target];
	}
	return data;
};

const fetchGraph = (collection, id, types = null) => (dispatch) =>
	server.fastXhr(`${config.graphUrl}/ww${collection}/${id}?depth=1&types=${(types || allTypes).join("&types=")}`,(err, resp, body) =>
		dispatch({
			type: "RECEIVE_GRAPH",
			response: parseIncomingGraph(JSON.parse(body)),
			collection: collection,
			id: id
		})
	);
/*		fetchDomainMetadata(collection, id, dispatch);*/


/*

export function setGraphRelationTypes(types) {
	return function(dispatch, getState) {
		let [domain, id] = getState().graphs.current.id.split("/");
		dispatch(fetchGraph(domain, id, types));
	};
}

export function fetchGraphTable(domain, id) {
	return function (dispatch) {
		fetchDomainMetadata(domain, id, dispatch);
	};
}*/

export { fetchGraph }