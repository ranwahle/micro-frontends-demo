import {ApplicationRoute} from './model/application-route';


export class FrontendRouter {

    _lastRouteResolved: any = null;
    routes: ApplicationRoute[] = [];
    private _paused: boolean;
    private static router: FrontendRouter;
    _useHash: boolean = false;
    _hash: any = null;
    root: string;
    _notFoundHandler: any;
    _callLeave: any;

    _genericHooks: any;
    PARAMETER_REGEXP = /([:*])(\w+)/g;
    WILDCARD_REGEXP = /\*/g;
    REPLACE_VARIABLE_REGEXP = '([^\/]+)';
    REPLACE_WILDCARD = '(?:.*)';
    FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
    MATCH_REGEXP_FLAGS = '';
    _defaultHandler: any;
    static getRouter() {
        FrontendRouter.router = FrontendRouter.router || new FrontendRouter();

        return FrontendRouter.router;

    }

    isHashedRoot(url, useHash, hash): boolean{
        if (this.isPushStateAvailable() && !useHash) {
            return false;
        }
        if (!url.match(hash)) {
            return false;
        }
        let split = url.split(hash);
        return split.length < 2 || split[1] === '';
    }


    getAppRoot(url, routes) {
        var matched = routes.map(
            route => route.route === '' || route.route === '*' ? url : url.split(new RegExp(route.route + '($|\/)'))[0]
        )
        var fallbackURL = this.clean(url);

        if (matched.length > 1) {
            return matched.reduce((result, url) => {
                if (result.length > url.length) result = url;
                return result;
            }, matched[0]);
        } else if (matched.length === 1) {
            return matched[0];
        }
        return fallbackURL;
    }

    config(options: any) {
        this.root = options.root;
    }

    add(url: string, handler: () => void) {
        this.routes.push({url, handler})
    }

    listen() {
       // if (this.usePushState) {
            window.addEventListener('popstate', this._onLocationChange);
       // } else if (this.isHashChangeAPIAvailable()) {
       //     window.addEventListener('hashchange', this._onLocationChange);
       //  } else {
       //      let cached = this._cLoc(), current, check;
       //
       //      check = () => {
       //          current = this._cLoc();
       //          if (cached !== current) {
       //              cached = current;
       //              this.resolve();
       //          }
       //          this._listeningInterval = setTimeout(check, 200);
       //      };
       //      check();
       //  }
    }


    _cLoc() {
        if (typeof window !== 'undefined') {
            if (typeof (window as any).__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
                return (window as any).__NAVIGO_WINDOW_LOCATION_MOCK__;
            }
            return this.clean(window.location.href);
        }
        return '';
    }

    clean(s) {
        if (s instanceof RegExp) return s;
        return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
    }

    _findLinks () {
        return [].slice.call(document.querySelectorAll('[data-navigo]'));
    }
    _onLocationChange () {
        this.resolve();
    }

    extractGETParameters(url) {
        return url.split(/\?(.*)?$/).slice(1).join('');
    }

    isPushStateAvailable() {
        return !!(
            typeof window !== 'undefined' &&
            window.history &&
            window.history.pushState
        );
    }

    getOnlyURL(url, useHash, hash) {
        let onlyURL = url, split;
        let cleanGETParam = str => str.split(/\?(.*)?$/)[0];

        if (typeof hash === 'undefined') {
            // To preserve BC
            hash = '#';
        }

        if (this.isPushStateAvailable() && !useHash) {
            onlyURL = cleanGETParam(url).split(hash)[0];
        } else {
            split = url.split(hash);
            onlyURL = split.length > 1 ? cleanGETParam(split[1]) : cleanGETParam(split[0]);
        }

        return onlyURL;
    }

    _getRoot() {
        if (this.root !== null) return this.root;
        this.root = this.getAppRoot(this._cLoc().split('?')[0], this.routes);
        return this.root;
    }



    manageHooks(handler, hooks?, params?) {
        if (hooks && typeof hooks === 'object') {
            if (hooks.before) {
                hooks.before((shouldRoute = true) => {
                    if (!shouldRoute) return;
                    handler();
                    hooks.after && hooks.after(params);
                }, params);
                return;
            } else if (hooks.after) {
                handler();
                hooks.after && hooks.after(params);
                return;
            }
        }
        handler();
    }

    replaceDynamicURLParts(route) {
        var paramNames = [], regexp;
        if (route instanceof RegExp) {
            regexp = route;
        } else {
            regexp = new RegExp(
                route.replace(this.PARAMETER_REGEXP, function (full, dots, name) {
                    paramNames.push(name);
                    return this.REPLACE_VARIABLE_REGEXP;
                })
                    .replace(this.WILDCARD_REGEXP, this.REPLACE_WILDCARD) + this.FOLLOWED_BY_SLASH_REGEXP
                , this.MATCH_REGEXP_FLAGS);
        }
        return { regexp, paramNames };
    }

    regExpResultToParams(match, names) {
        if (names.length === 0) return null;
        if (!match) return null;
        return match
            .slice(1, match.length)
            .reduce((params, value, index) => {
                if (params === null) params = {};
                params[names[index]] = decodeURIComponent(value);
                return params;
            }, null);
    }


    findMatchedRoutes(url, routes = []) {
        return routes
            .map(route => {
                var { regexp, paramNames } = this.replaceDynamicURLParts(this.clean(route.route));
                var match = url.replace(/^\/+/, '/').match(regexp);
                var params = this.regExpResultToParams(match, paramNames);
                return match ? { match, route, params } : false;
            })
            .filter(m => m);
    }

    match(url, routes) {
        return this.findMatchedRoutes(url, routes)[0] || false;
    }


    resolve(current?) {
        var handler, m;
        var url = (current || this._cLoc()).replace(this._getRoot(), '');



        let GETParameters = this.extractGETParameters(current || this._cLoc());
        let onlyURL = this.getOnlyURL(url, this._useHash, this._hash);

        if (this._paused) return false;

        if (
            this._lastRouteResolved &&
            onlyURL === this._lastRouteResolved.url &&
            GETParameters === this._lastRouteResolved.query
        ) {
            if (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already) {
                this._lastRouteResolved.hooks.already(this._lastRouteResolved.params);
            }
            return false;
        }

        m = this.match(onlyURL, this.routes);

        if (m) {
            this._callLeave();
            this._lastRouteResolved = {
                url: onlyURL,
                query: GETParameters,
                hooks: m.route.hooks,
                params: m.params,
                name: m.route.name
            };
            handler = m.route.handler;
            this.manageHooks(() => {
                this.manageHooks(() => {
                    m.route.route instanceof RegExp ?
                        handler(...(m.match.slice(1, m.match.length))) :
                        handler(m.params, GETParameters);
                }, m.route.hooks, m.params);
            }, this._genericHooks, m.params);
            return m;
        } else if (this._defaultHandler && (
            onlyURL === '' ||
            onlyURL === '/' ||
            onlyURL === this._hash ||
            this.isHashedRoot(onlyURL, this._useHash, this._hash)
        )) {
           this.manageHooks(() => {
              this. manageHooks(() => {
                    this._callLeave();
                    this._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: this._defaultHandler.hooks };
                    this._defaultHandler.handler(GETParameters);
                }, this._defaultHandler.hooks);
            }, this._genericHooks);
            return true;
        } else if (this._notFoundHandler) {
            this.manageHooks(() => {
                this.manageHooks(() => {
                    this._callLeave();
                    this._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: this._notFoundHandler.hooks };
                    this._notFoundHandler.handler(GETParameters);
                }, this._notFoundHandler.hooks);
            }, this._genericHooks);
        }
        return false;
    }

}