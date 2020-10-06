const axios = require('axios');

class Miniflux {

	constructor (host, key) {
		this.req = axios.create({
			baseURL: host + '/v1',
			timeout: 1000,
			headers: { 'X-Auth-Token': key }
		});
	}

	async getUnreadEntries () {
		return this.req
			.get('/entries?status=unread')
			.then(res => res.data.entries);
	}

	async markAsRead (entry_ids = []) {
		return this.req
			.put('/entries', { entry_ids, status: 'read' })
			.then(res => res.status === 204);

	}

	async markAsUnread (entry_ids = []) {
		return this.req
			.put('/entries', { entry_ids, status: 'unread' })
			.then(res => res.status === 204);
	}
}


module.exports = Miniflux;
