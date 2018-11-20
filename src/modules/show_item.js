let _show_view=({
	id,
	name,
	image_url,
	description,
	price,
})=>{
	let $product=$(`<div class="card col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title">`).text(name));
	$product.append($(`<span type="button">Ціна: ${price}</span>`));
	return $product;
};
module.exports=_show_view;

