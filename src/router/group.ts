import * as Router from '@koa/router';
import {FireCatController} from "../controller";
import {isStartRouter, joinRoutePaths} from "../utils/common";
import {FireDocumentStoreInterFace, KoaMiddleware} from '../types';

export default class FireRouterGroup {
	public router: Router
	public path: string
	private registerDocument?: (entry: FireDocumentStoreInterFace) => void

	constructor(router: Router, path: string, registerDocument?: (entry: FireDocumentStoreInterFace) => void) {
		this.router = router
		this.path = isStartRouter(path) ? '' : path
		this.registerDocument = registerDocument
	}

	concat(path: string, action: Router.Middleware<any, any>, methods: string) {
		if (typeof path == "string") {
			return this.router[methods](joinRoutePaths(this.path, path), action)
		}
		return this.router[methods](path, action)
	}

	concatCallback(path: string, callback: (router: FireRouterGroup)=> void) {
		if (typeof path == 'string') {
			callback(new FireRouterGroup(this.router, joinRoutePaths(this.path, path), this.registerDocument))
		} else {
			callback(new FireRouterGroup(this.router, path, this.registerDocument))
		}
	}

	get(path: string, action: Router.Middleware<any, any>) {
		return this.concat(path, action, 'get')
	}

	post(path: string, action: Router.Middleware<any, any>) {
		return this.concat(path, action, 'post')
	}

	del(path: string, action: Router.Middleware<any, any>) {
		return this.concat(path, action, 'del')
	}

	put(path: string, action: Router.Middleware<any, any>) {
		return this.concat(path, action, 'put')
	}

	update(path: string, action: Router.Middleware<any, any>) {
		return this.concat(path, action, 'patch')
	}

	head(path: string, action: Router.Middleware<any, any>) {
		return this.concat(path, action, 'head')
	}

	all(path: string, action: Router.Middleware<any, any>) {
		return this.concat(path, action, 'all')
	}

	controller(path: string, control: FireCatController, middlewares?: KoaMiddleware[]) {
		const basePath = joinRoutePaths(this.path, path.toString())
		const routes = control.decoratorBindRouter(this.router, basePath, control, middlewares)
		if (this.registerDocument) {
			this.registerDocument({
				path: basePath,
				routes
			})
		}
	}

	group(path: string, callback: (router: FireRouterGroup)=> void) {
		this.concatCallback(path, callback)
	}
}
