import * as Router from 'koa-router';
import {FireCatController} from "../controller";
import {isStartRouter} from "../utils/common";
import { KoaMiddleware } from '../../src/types';

export default class FireRouterGroup {
	public router: Router
	public path: string

	constructor(router: Router, path: string) {
		this.router = router
		this.path = isStartRouter(path) ? '' : path
	}

	concat(path: string, action: Router.IMiddleware<any, any>, methods: string) {
		if (typeof path == "string") {
			return this.router[methods](this.path + path, action)
		}
		return this.router[methods](path, action)
	}

	concatCallback(path: string, callback: (router: FireRouterGroup)=> void) {
		if (typeof path == 'string') {
			callback(new FireRouterGroup(this.router, this.path + path))
		} else {
			callback(new FireRouterGroup(this.router, path))
		}
	}

	get(path: string, action: Router.IMiddleware<any, any>) {
		return this.concat(path, action, 'get')
	}

	post(path: string, action: Router.IMiddleware<any, any>) {
		return this.concat(path, action, 'post')
	}

	del(path: string, action: Router.IMiddleware<any, any>) {
		return this.concat(path, action, 'del')
	}

	put(path: string, action: Router.IMiddleware<any, any>) {
		return this.concat(path, action, 'put')
	}

	update(path: string, action: Router.IMiddleware<any, any>) {
		return this.concat(path, action, 'update')
	}

	head(path: string, action: Router.IMiddleware<any, any>) {
		return this.concat(path, action, 'head')
	}

	all(path: string, action: Router.IMiddleware<any, any>) {
		return this.concat(path, action, 'all')
	}

	controller(path: string, control: FireCatController, middlewares?: KoaMiddleware[]) {
		control.decoratorBindRouter(this.router, this.path + path.toString(), control, middlewares)
	}

	group(path: string, callback: (router: FireRouterGroup)=> void) {
		this.concatCallback(path, callback)
	}
}