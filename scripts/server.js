#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var debounce = require("lodash.debounce");
var modRewrite = require("connect-modrewrite");
var proxy = require("proxy-middleware");
var url = require("url");

var baseDir = "./build/development";
var watchFiles = [
	baseDir + "/js/*.js",
	baseDir + "/css/*.css",
	baseDir + "/index.html"
];

function onFilesChanged(event, file) {
	if (event === "change") {
		browserSync.reload(file);
	}
}

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));

var localSolr = process.env.SOLR || "http://localhost:8983/solr";
var wwdocumentsOptions = url.parse(localSolr + "/wwdocuments/select");
wwdocumentsOptions .route = "/repositorysolr/wwdocuments";

var wwpersonsOptions = url.parse(localSolr + "/wwpersons/select");
wwpersonsOptions.route = "/repositorysolr/wwpersons";

var wwdocumentreceptionsOptions = url.parse(localSolr + "/wwdocumentreceptions/select");
wwdocumentreceptionsOptions.route = "/repositorysolr/wwdocumentreceptions";

browserSync.init({
	server: {
		baseDir: baseDir,
		middleware: [
			proxy(wwdocumentsOptions),
			proxy(wwpersonsOptions),
			proxy(wwdocumentreceptionsOptions),
			modRewrite([
				"^/css/(.*)$ /css/$1 [L]",
				"^/js/(.*)$ /js/$1 [L]",
				"^[^\\.]*$ /index.html [L]"
			])
		]
	}
});
