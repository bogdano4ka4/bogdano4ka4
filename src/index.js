import './scss/main.scss';
import'./modules/menu_toogle.js';
console.log("ffff");
console.log(`The time is ${new Date()}`);

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

let _item=require('./modules/show_item');

let _item_description=require('./modules/show_description');


$(document).ready(function(){
    $(".show_all").click(function(){
        jQuery.ajax({
	url: 'https://nit.tron.net.ua/api/product/list',
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
    $(".show_xiaomi").click(function(){
	jQuery.ajax({
	url: 'http://nit.tron.net.ua/api/product/list/category/3',
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
    $(".show_smartphones").click(function(){
	jQuery.ajax({
	url: 'http://nit.tron.net.ua/api/product/list/category/2',
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
		var $title = $('<h1>').text("Apple");
		json.forEach(product => $('.product_item').append(_item(product)));
	},
	error: function(xhr){
		alert("An error occured: " + xhr.status + " " + xhr.statusText);
	},
});
    });
});

$(document).ready(function(){
    $(".show_notebook").click(function(){
	jQuery.ajax({
	url: 'http://nit.tron.net.ua/api/product/list/category/5',
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