
let _show_description=({
	id,
	name,
	image_url,
	description,
	price,
})=>{
	let $product=$(`<div id='${id}' class="card col-xs-12 col-sm-4 col-md-3" data-product-id="${id}">`);
	$product.append($(`<img src="${image_url}" alt="${name}" class="img-fluid product-image">`));
	$product.append($(`<span class="product-title">`).text(name));
	$product.append($(`<span class="product-description">ОПИС:</span>`).text(description));
	$product.append($(`<span type="button">${price}</span>`));
	return $product;
};

module.exports=_show_description;

