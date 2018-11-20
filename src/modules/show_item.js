let _show_view=({
	id,
	name,
	image_url,
	description,
	price,
})=>{
	let $product=$(`<div id='${id}' class="product-buy card col-xs-12 col-sm-6 col-md-4 col-lg-4">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title">`).text(name));
	$product.append($(`<span>Ціна: ${price}</span>`));
	$product.append($(`<button type"button" class="">Buy</button>`));
	return $product;
};
module.exports=_show_view;

