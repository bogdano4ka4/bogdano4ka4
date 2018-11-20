import './scss/main.scss';
import'./modules/menu_toogle.js';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

let _item=require('./modules/show_item');

let _item_description=require('./modules/show_description');
let SERVER_NAME="http://nit.tron.net.ua";

$(document).ready(function(){
    $(".show_all").click(function(){
    	$(".product_item").html('');
	jQuery.ajax({
	url: SERVER_NAME+'/api/product/list',
	method: 'get',
	dataType: 'json',
	success: function(json){		
		json.forEach(product => $('.product_item').append(_item(product)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},
});
    });
});

$(document).ready(function(){
    $(".show_apple").click(function(){
    	$(".product_item").html('');
	jQuery.ajax({
	url: 'http://nit.tron.net.ua/api/product/list/category/4',
	method: 'get',
	dataType: 'json',
	success: function(json){
		json.forEach(product => $('.product_item').append(_item_description(product)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},
});
    });
});


$(document).on('click','.product-buy',function(){
	var id_num=this.id;
	console.log(id_num);
	$(".product_item").html('');

	//var id=$this.closest('.product').data('product-id');
	//console.log(id);

});
// $(document).ready(function(){
//     $(".show_xiaomi").click(function(){
// 	jQuery.ajax({
// 	url: 'http://nit.tron.net.ua/api/product/list/category/3',
// 	method: 'get',
// 	dataType: 'json',
// 	success: function(json){

// 		json.forEach(product => $('.product_item').append(_item(product)));
// 	},
// 	error: function(xhr){
// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
// 	},
// });
//     });
// });
// $(document).ready(function(){
//     $(".show_smartphones").click(function(){
// 	jQuery.ajax({
// 	url: 'http://nit.tron.net.ua/api/product/list/category/2',
// 	method: 'get',
// 	dataType: 'json',
// 	success: function(json){
// 		json.forEach(product => $('.product_item').append(_item(product)));
// 	},
// 	error: function(xhr){
// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
// 	},
// });
//     });
// });



// $(document).ready(function(){
//     $(".show_notebook").click(function(){
// 	jQuery.ajax({
// 	url: 'http://nit.tron.net.ua/api/product/list/category/5',
// 	method: 'get',
// 	dataType: 'json',
// 	success: function(json){
// 		json.forEach(product => $('.product_item').append(_item(product)));
// 	},
// 	error: function(xhr){
// 		alert("An error occured: " + xhr.status + " " + xhr.statusText);
// 	},
// });
//     });
// });

// function fillCategory(category) {
//     categoriesCount ++;
//     var view = CATEGORY_TEMPLATE.content.cloneNode(true);
//     var nameField = view.querySelector(".category-name");
//     nameField.onclick = function () {
//         showListView();
//         load(SERVER_NAME, "api/product/list/category/" + category.id, insertTemplatedContent,
//             [document.getElementById("products"), fillProduct])
//     };
//     nameField.innerHTML = category.name;
//     return view;
// }