import {ApplicationRoute} from './model/application-route';


/**
 *  this class is taken from http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
 */
export class FrontendRouter {

    mode: 'history';
    root: string = '/';
    routes: any[] = [];
    listenInterval: any;

    constructor() {

    }

    clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    }

    getFragment() {
        let fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(`${window.location.pathname}${ window.location.search}`));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    }

    add(url, handler) {
        if (typeof url == 'function') {
            handler = url;
            url = '';
        }
        this.routes.push({url: url, handler: handler});
        return this;
    }

    remove(param) {
        for (let i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.url.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    }

    flush() {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    }

    check(currentPath) {
        const fragment = currentPath || this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].url);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    }

    listen() {
        let current = this.getFragment();
        const fn = () => {
            if (current !== this.getFragment()) {
                current = this.getFragment();
                this.check(current);
            }
        }
        clearInterval(this.listenInterval);
        this.listenInterval = setInterval(fn, 50);
        return this;
    }

    navigate(path) {
        path = path ? path : '';
        if (this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}