import {derived, writable} from 'svelte/store';
import {dateFormat} from './utils';

function itemsStore () {
	const { subscribe, set } = writable([]);
	return {
		subscribe,
		set,
		load: () => {
			return fetch('/api/unread')
				.then(res => res.json())
				.then(res => {
					res.forEach(item => {
						item.published_at = dateFormat(item.published_at);
					});
					set(res);
				})
				.catch(e => console.error(e));
		},
		markAsRead: (id) => {
			return fetch('/api/read/' + id, {method: 'PUT'})
				.then(res => res.json())
				.catch(e => console.error(e));
		},
		markAsUnread: (id) => {
			return fetch('/api/unread/' + id, {method: 'PUT'})
				.then(res => res.json())
				.catch(e => console.error(e));
		}
	};
}

export const items = itemsStore();

export const categories = derived(items, $items => {
	if (!$items.length) return[];
	const cats = {};
	$items.forEach(i => {
		if (!i.feed?.category?.title) return;
		const title = i.feed.category.title;
		cats[title] = cats[title] || {...i.feed.category};
		cats[title].count = cats[title].count || 0;
		if (i.status === 'unread') cats[title].count += 1;
	});
	return [
		{ id: -1, title: 'All', count: $items.length},
		...Object.values(cats)
	];
});
