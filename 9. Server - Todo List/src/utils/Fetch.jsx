/* global __DEVTOOLS__ */

export default class Fetch {

    static defaultHeaders() {
        return new Headers();
    };

    static getRequest(url) {
        const req = new Request(url);
        //req.mode = 'no-cors';
        return req;
    }

    static defaultProps = {
        credentials: __DEVTOOLS__ ? 'include' : 'same-origin',
        mode: 'no-cors'
    };

    static get(url, customProps = Fetch.defaultProps, customHeaders = Fetch.defaultHeaders()) {
        return fetch(Fetch.getRequest(url), {...Fetch.defaultProps, ...customProps, headers: customHeaders, method: 'GET'})
    }

    static post(url, data, customProps = Fetch.defaultProps, customHeaders = Fetch.defaultHeaders()) {
        return fetch(Fetch.getRequest(url), {...Fetch.defaultProps, ...customProps, headers: customHeaders, body: data, method: 'POST'})
    }

    static put(url, data, customProps = Fetch.defaultProps, customHeaders = Fetch.defaultHeaders()) {
        return fetch(Fetch.getRequest(url), {...Fetch.defaultProps, ...customProps, headers: customHeaders, body: data, method: 'PUT'})
    }

    static delete(url, data, customProps = Fetch.defaultProps, customHeaders = Fetch.defaultHeaders()) {
        return fetch(Fetch.getRequest(url), {...Fetch.defaultProps, ...customProps, headers: customHeaders, body: data, method: 'DELETE'})
    }
}
