function formatNumber (num) {
	num = Math.round(0 + num * 100) / 100;
	return num.toLocaleString('en-GB', { minimumFractionDigits: 2 });
}


function slugify (text) {
	return text.toString().toLowerCase().trim()
		.replace(/&/g, '-and-')         // Replace & with 'and'
		.replace(/[\s\W-]+/g, '-')
		.replace(/-{2,}/g, '-')         // Replace multiple - with single -
		.replace(/^-+/, '')             // Trim - from start of text
		.replace(/-+$/, '');            // Trim - from end of text
}


function findImage (article) {
	const images = article.querySelectorAll('img');
	return images.length ? images[images.length - 1].outerHTML : '';
}


function cleanupArticle (article) {
	// remove all other images
	// article.querySelectorAll('iframe,figure,img,pre,code').forEach(el => el.remove());
	article.querySelectorAll('iframe,.headline img').forEach(el => el.remove());
	// remove empty links
	article.querySelectorAll('a').forEach(el => { if (!el.innerHTML) el.remove(); });
	// shorten content
	// const limitChildrenTo = 6;
	// article.querySelectorAll('.article-content').forEach(el => {
	// 	if (el.children.length > limitChildrenTo + 1) {
	// 		[...el.children].forEach((child, i) => {
	// 			if (i > limitChildrenTo) child.remove();
	// 		});
	// 		const dots = document.createElement('span');
	// 		dots.innerHTML = '...';
	// 		el.appendChild(dots);
	// 	}
	// });
}

function dateFormat (dateString) {
	const d = new Date(dateString);
	const tz = d.getTimezoneOffset() * 60 * 1000;
	const local = new Date(d - tz);
	return local.toISOString().slice(0, 16).replace('T', ' ');
}

export {
	formatNumber,
	slugify,
	findImage,
	cleanupArticle,
	dateFormat,
};
