<main bind:this="{mainEl}" class="layout_{layoutClass}">
	{#if !$items.length}
		<div class="no-more-news">No more news!</div>
	{/if}
	{#each $items as item, index (item.id)}

		<Article item="{item}" index="{index}"/>

		{#if $items.length > 2 && index < $items.length - 1}
			<hr class:headline="{index === 0}">
		{/if}
	{/each}
</main>
<hr><br><br>

<script>
import {onMount, afterUpdate} from 'svelte';
import {items, cleanupArticle, findImage} from '../lib';
import Article from './article';

const layoutClasses = ['empty', 'one', 'two', 'three', 'four', 'full'];
$:layoutClass = layoutClasses[$items.length] || 'full';
let mainEl;

onMount(() => items.load());
afterUpdate(formatArticles);

function formatArticles () {
	if (!mainEl) return;
	const articles = mainEl.querySelectorAll('article');
	if (!articles.length) return;
	articles.forEach(article => {
		const id = +article.dataset.id;
		const idx = $items.findIndex(i => i.id === id);
		if (typeof idx !== 'undefined' && $items[idx]) {
			$items[idx].image = findImage(article);
		}
		cleanupArticle(article);
	});
}

</script>
