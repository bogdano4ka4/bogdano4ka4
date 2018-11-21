import './scss/main.scss';
import'./modules/menu_toogle.js';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

let _item=require('./modules/show_item');

let _item_description=require('./modules/show_description');
let SERVER_NAME="http://nit.tron.net.ua";


$(document).ready(function()
{
	$.getJSON('https://nit.tron.net.ua/api/category/list', function(data) 
	{
            for(var key in data){
                $('#categories').append('<p class="load" id="' + data[key]['id']+data[key]['name']+'" ' + "data-id="+data[key]['name']+'"> ' + ' ' + data[key]['name']+'</p>');
            }
        $('p.load').on('click', function(){
        	$(".product_item").html('');
			$(".product_view").html('');
        	$("#categories").slideToggle();
        	//console.log(this.id);
        	var id=this.id;
        	$.getJSON('http://nit.tron.net.ua/api/product/list/category/'+parseInt(id, 10), function(data){
        		//var tittle='<p class="category_tittle">'+data['name']+'</p>';
        		//console.log(tittle);
        		//$('.category_tittle').append(tittle);
        		var view='';
        		for(var key in data)
        		{
        			view+='<div class="product_item card col-xs-12 col-sm-6 col-md-3 col-lg-4" data-product-id="'+data[key]['id']+'"">';
        			view+='<img src="'+data[key]['image_url']+'" alt="'+data[key]['name']+'" class="img-fluid product-image">';
        			view+='<span class="product-title mx-auto">'+data[key]['name']+"</span>";
        			view+='<span class="mx-auto">Ціна: <s>'+data[key]['price']+"</s></span>";
        			if(data[key]['special_price']!=null){
        				view+='<span class="mx-auto">Акція: '+data[key]['special_price']+"</span>";
        			}
        			view+='<button type="button" class="btn button bg-success product-buy"> В корзину </button> ';
        			view+='</div>';
            	}
            	$('.product_item').append(view);
            	
			});
        });
        $('div.product_item').on('click', function(){
        	var name_=$(this).attr('name');
        	//$(".product_item").html('');
        	console.log(name_);
        	});

 	});
});

//$('.card').data('product-id');

//  $(document).ready(function()
//  {
// 	$.getJSON('http://nit.tron.net.ua/api/product/1', function(data){
// 		var description='';
// 	        description+='<div class="product_view card col-xs-12 col-sm-6 col-md-3 col-lg-4 mx-auto" >';
// 	        description+='<p class="mx-auto">'+'<strong>'+data['name']+'</strong>.'+"</p>";
// 	        description+='<img src="'+data['image_url']+'" alt="'+data['name']+'" class="img-fluid product-image">';
// 	        description+='<p class="mx-auto">Опис:</p>';
// 	        description+='<p>'+data['description']+"</p>";
// 	        description+='<span class="product-title">Ціна: '+data['name']+"</span>";
// 	        if(data['special_price']!=null){
// 	        	description+='<span>Ціна: <s>'+data['price']+"</s></span>";
// 	        description+='<span>Акція: '+data['special_price']+"</span>";
// 	        }
// 	        else{
// 	        	description+='<span>Ціна: '+data['price']+"</span>";
// 	        }
// 	        description+='<button type="button" class="btn button bg-success" name="'+data['id']+'"> В корзину </button> ';
// 	        description+='</div>';
// 	    $('.product_view').append(description);
// 	});
// });






$(document).on('click','.card',function(){
	var $this=$(this);
	console.log(this);
	console.log($this);
	var id=$this.closest('.card').data('product-id');
	console.log(id);
	$(".product_item").html('');
	$(".product_view").html('');
	$.getJSON('http://nit.tron.net.ua/api/product/'+id, function(data){
		var description='';
	        description+='<div class="product_view card col-xs-12 col-sm-6 col-md-3 col-lg-4 mx-auto" >';
	        description+='<p class="mx-auto">'+'<strong>'+data['name']+'</strong>.'+"</p>";
	        description+='<img src="'+data['image_url']+'" alt="'+data['name']+'" class="img-fluid product-image">';
	        description+='<p class="mx-auto">Опис:</p>';
	        description+='<p>'+data['description']+"</p>";
	        description+='<span class="product-title">Ціна: '+data['name']+"</span>";
	        if(data['special_price']!=null){
	        	description+='<span>Ціна: <s>'+data['price']+"</s></span>";
	        description+='<span>Акція: '+data['special_price']+"</span>";
	        }
	        else{
	        	description+='<span>Ціна: '+data['price']+"</span>";
	        }
	        description+='<button type="button" class="btn button bg-success" name="'+data['id']+'"> В корзину </button> ';
	        description+='</div>';
	    $('.product_view').append(description);
	});
});















// $(document).ready(function(){
// 	$.getJSON('https://nit.tron.net.ua/api/category/list', function(data) {
//             for(var key in data){
//                 $('#categories').append('<p class="load" id="' + data[key]['id']+'" ' + "data-id="+data[key]['name']+'"> ' + ' ' + data[key]['name']+'</p>');
//             }
//         $('p.load').on('click', function(){
//         	$(".product_item").html('');
//         	//console.log(this.id);
//         	var id=this.id;
//         	jQuery.ajax({
// 				url: 'http://nit.tron.net.ua/api/product/list/category/'+id,
// 				method: 'get',
// 				dataType: 'json',
// 				success: function(json){
// 					json.forEach(product => $('.product_item').append(_item(product)));
// 					console.log(this.id);
// 				},
// 				error: function(xhr){
// 					alert("An error occured: " + xhr.status + " " + xhr.statusText);
// 					},
// 	});
//         });
//  	});
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