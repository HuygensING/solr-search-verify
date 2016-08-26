import personSearch from "./person-search";
import documentSearch from "./document-search";
import documentReceptionSearch from "./document-reception-search";
import personReceptionSearch from "./person-reception-search";
import entity from "./entity";
import vre from "./vre";
import user from "./user";
import messages from "./messages";
import pagination from "./pagination";
import modifiedSearch from "./modified-search";
import graph from "./graph";
import collectiveSearch from "./collective-search";

export default {
	personSearch: personSearch,
	documentSearch: documentSearch,
	documentReceptionSearch: documentReceptionSearch,
	personReceptionSearch: personReceptionSearch,
	collectiveSearch: collectiveSearch,
	messages: messages,
	pagination: pagination,
	entity: entity,
	modifiedSearch: modifiedSearch,
	graph: graph,
	user: user,
	vre: vre
};
