<article class="{item.status}" class:headline="{index === 0}" data-id="{item.id}">
	<h2>{item.title}</h2>
	<h3><em>{item.feed.title}</em>, {item.published_at}</h3>
	<h3 class="links">
		<a class="read-more" target="front-page" href="{item.rssUrl}">full</a> |
		<a class="read-more" target="front-page" href="{item.url}">original</a> |
		<MarkAsRead item="{item}" />
		<hr>
	</h3>

	{#if item.image && index === 0}{@html item.image}{/if}
	<span class="article-content">{@html item.content}</span>
</article>

<script>
import MarkAsRead from './mark-as-read';
export let item;
export let index;


</script>
