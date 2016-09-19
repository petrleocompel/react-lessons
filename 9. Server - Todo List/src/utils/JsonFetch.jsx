import Fetch from './Fetch';

export default class JsonFetch extends Fetch {
    static defaultHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    static get(url, customProps = Fetch.defaultProps, customHeaders = JsonFetch.defaultHeaders()) {
        return Fetch.get(url, customProps, customHeaders);
    }

    static post(url, data, customProps = Fetch.defaultProps, customHeaders = JsonFetch.defaultHeaders()) {
        return Fetch.post(url, JSON.stringify(data), customProps, customHeaders);
    }

    static put(url, data, customProps = Fetch.defaultProps, customHeaders = JsonFetch.defaultHeaders()) {
        return Fetch.put(url, JSON.stringify(data), customProps, customHeaders);
    }

    static delete(url, data, customProps = Fetch.defaultProps, customHeaders = JsonFetch.defaultHeaders()) {
        return Fetch.delete(url, JSON.stringify(data), customProps, customHeaders);
    }
}
