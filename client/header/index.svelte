<br>
<hr class="header-hr">
<header class="header">
	<h1>Front Page</h1>
</header>
<hr class="header-hr">

<nav class="categories">
	{#each $categories as category, i}
		<span class="category">{category.title} ({category.count})</span>
		<!-- <a href="#{category.id}"
			class="category"
			class:active="{category.id === activeCategory}"
			on:click|preventDefault="{() => activeCategory = category.id}">{category.title} ({category.count})</a> -->
	{/each}
</nav>
{#if $categories.length}
	<hr class="categories-hr">
{/if}

<script>
import {categories} from '../lib';
// let activeCategory = -1;
</script>
