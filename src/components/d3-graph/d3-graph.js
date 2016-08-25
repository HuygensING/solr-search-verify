import React from "react";
import ForceDirectedGraph from "hire-force-directed-graph";
import GraphTable from "./table"


class D3Graph extends React.Component {
	componentDidMount() {
		const {graph, params: { id, collection }, onFetchGraph} = this.props;

		// If the requested id from the route does not match the data, or if there is no data
		if ((!graph.id && id) || (id && graph.id !== id) ) {
			// Fetch the correct author based on the id.
			onFetchGraph(collection, id);
		}
	}

	componentWillReceiveProps(nextProps) {
		const { onFetchGraph} = this.props;
		// Triggers fetch data from server based on id from route.
		if (this.props.params.id !== nextProps.params.id) {
			onFetchGraph(nextProps.params.collection, nextProps.params.id);
		}
	}

	render() {
		const { graph: { data, table }, onSelectGraph } = this.props;

		console.log(data);

		if (!data) { return null; }

		return (
			<div style={{height: window.innerHeight}}>
				<GraphTable data={table} />
				<ForceDirectedGraph data={data}
									onEntityClick={(...args) => console.log("ENT", args)}
									onNodeClick={(node) => onSelectGraph(node.type + "s", node.key.replace(/.*\//, ""))}/>
			</div>
		);
	}
}

export default D3Graph;