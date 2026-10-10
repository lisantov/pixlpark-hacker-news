import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, UNSAFE_withHydrateFallbackProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
var Loader_module_default = {
	barLoader: "_barLoader_17zq5_1",
	slide: "_slide_17zq5_1"
};
//#endregion
//#region app/shared/ui/loader/ui/Loader.tsx
function Loader() {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-2 items-center",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-xl font-medium text-orange-400",
			children: "Hacker News"
		}), /* @__PURE__ */ jsx("div", { className: Loader_module_default.barLoader })]
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	HydrateFallback: () => HydrateFallback,
	Layout: () => Layout,
	default: () => root_default
});
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "ru",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-col justify-between min-h-screen",
				children
			}),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		staleTime: 6e4,
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
		retry: 3
	} } });
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(Outlet, {})
	});
});
var HydrateFallback = UNSAFE_withHydrateFallbackProps(function HydrateFallback() {
	return /* @__PURE__ */ jsx("div", {
		className: "absolute inset-0 flex justify-center items-center",
		children: /* @__PURE__ */ jsx(Loader, {})
	});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/pixlpark-hacker-news/assets/entry.client-Bg1JKRiA.js",
		"imports": ["/pixlpark-hacker-news/assets/jsx-runtime-CvqIMni6.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/pixlpark-hacker-news/assets/root-nkiC6TVt.js",
			"imports": [
				"/pixlpark-hacker-news/assets/jsx-runtime-CvqIMni6.js",
				"/pixlpark-hacker-news/assets/ui-C6yk8gnM.js",
				"/pixlpark-hacker-news/assets/query-CkUMw8we.js"
			],
			"css": ["/pixlpark-hacker-news/assets/root-C66jYaWS.css", "/pixlpark-hacker-news/assets/ui-upHa5HvT.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"widgets/layouts/ui/DefaultLayout": {
			"id": "widgets/layouts/ui/DefaultLayout",
			"parentId": "root",
			"path": void 0,
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/pixlpark-hacker-news/assets/DefaultLayout-CANNEN0H.js",
			"imports": [
				"/pixlpark-hacker-news/assets/jsx-runtime-CvqIMni6.js",
				"/pixlpark-hacker-news/assets/ui-C6yk8gnM.js",
				"/pixlpark-hacker-news/assets/assets-vqT8oCxw.js"
			],
			"css": ["/pixlpark-hacker-news/assets/ui-upHa5HvT.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"pages/home": {
			"id": "pages/home",
			"parentId": "widgets/layouts/ui/DefaultLayout",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/pixlpark-hacker-news/assets/home-D3OkIQEO.js",
			"imports": [
				"/pixlpark-hacker-news/assets/jsx-runtime-CvqIMni6.js",
				"/pixlpark-hacker-news/assets/ui-C6yk8gnM.js",
				"/pixlpark-hacker-news/assets/query-CkUMw8we.js",
				"/pixlpark-hacker-news/assets/assets-vqT8oCxw.js"
			],
			"css": ["/pixlpark-hacker-news/assets/home-grzH6U4y.css", "/pixlpark-hacker-news/assets/ui-upHa5HvT.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/pixlpark-hacker-news/assets/manifest-dfe2dab2.js",
	"version": "dfe2dab2",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var route1 = { default: () => null };
var route2 = { default: () => null };
var assetsBuildDirectory = "build/client";
var basename = "/pixlpark-hacker-news/";
var future = {
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = false;
var isSpaMode = true;
var prerender = [];
var routeDiscovery = { "mode": "initial" };
var publicPath = "/pixlpark-hacker-news/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"widgets/layouts/ui/DefaultLayout": {
		id: "widgets/layouts/ui/DefaultLayout",
		parentId: "root",
		path: void 0,
		index: void 0,
		caseSensitive: void 0,
		module: route1
	},
	"pages/home": {
		id: "pages/home",
		parentId: "widgets/layouts/ui/DefaultLayout",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: route2
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
