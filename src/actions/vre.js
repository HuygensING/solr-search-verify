import server from "./server";
import config from "../config";

const setVre = (vreId) => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${config.apiUrl.v4}/metadata/${vreId}?withCollectionInfo=true`
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			var body = JSON.parse(resp.body);
			dispatch({type: "SET_VRE", vreId: vreId, collections: body});
		}
	}, () => dispatch({type: "SET_VRE", vreId: vreId, collections: {}}), `Fetch VRE description for ${vreId}`);


export {setVre};
