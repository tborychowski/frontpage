<a class="read-more"
	href="#mark-as-read" on:click|preventDefault="{markAsRead}">
		mark as {item.status === 'unread' ? 'read' : 'unread'}
</a>

<script>
import {items} from '../lib';

export let item;

function markAsRead () {
	const $item = $items.find(i => i.id === item.id);
	if ($item && $item.status === 'unread') {
		items.markAsRead(item.id).then(() => items.load());
	}
}
</script>
