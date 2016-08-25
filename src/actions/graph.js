import config from "../config";
import server from "./server";

import authorReceptionDefinitions from "../definitions/author-receptions";
import publicationReceptionDefinitions from "../definitions/publication-receptions";

const allTypes = authorReceptionDefinitions.outBound.concat(publicationReceptionDefinitions.outBound).concat("isCreatedBy");



const fetchDomainMetadata = (collection, id, dispatch) => {
	server.fastXhr(`${config.apiUrl["v2.1"]}/domain/ww${collection}/${id}`, (err, resp, body) => {
			dispatch({
				type: "RECEIVE_GRAPH_TABLE",
				response: JSON.parse(body),
				id: id,
				collection: collection
			});
	});
};


const parseIncomingGraph = function(data) {
	for(let i in data.links) {
		data.links[i].source = data.nodes[data.links[i].source];
		data.links[i].target = data.nodes[data.links[i].target];
	}
	return data;
};

const fetchGraph = (collection, id, types = null) => (dispatch) => {
	server.fastXhr(`${config.graphUrl}/ww${collection}/${id}?depth=2&types=${(types || allTypes).join("&types=")}`, (err, resp, body) =>
		dispatch({
			type: "RECEIVE_GRAPH",
			response: parseIncomingGraph(JSON.parse(body)),
			collection: collection,
			id: id
		})
	);
	fetchDomainMetadata(collection, id, dispatch);
};


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