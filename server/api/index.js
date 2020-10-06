const express = require('express');
const api = express.Router();
const {HOST, API_KEY} = process.env;
const {Miniflux, logger} = require('../lib');
const mini = new Miniflux(HOST, API_KEY);



api.get('/unread', (req, res) => {
	logger.info('GET /unread');
	mini.getUnreadEntries()
		.then(items => {
			if (Array.isArray(items) && items.length > 10) items = items.slice(0, 10);
			items.forEach(i => {
				i.rssUrl = `${HOST}/unread/entry/${i.id}`;
			});
			res.status(200).json(items);
		});
});

api.put('/read/:id', (req, res) => {
	if (!req.params.id) res.status(400).json({ message: 'parameter missing' });
	mini
		.markAsRead([+req.params.id])
		.then(done => res.status(200).json({ result: done ? 'success' : 'error' }))
		.catch(e => logger.error(e));
});

api.put('/unread/:id', (req, res) => {
	if (!req.params.id) res.status(400).json({ message: 'parameter missing' });
	mini
		.markAsUnread([+req.params.id])
		.then(done => res.status(200).json({ result: done ? 'success' : 'error' }))
		.catch(e => logger.error(e));
});

api.get('/', (req, res) => res.send('Hello from API!'));

module.exports = api;
