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
        	//console.log(this.id);
        	var id=this.id;
        	$.getJSON('http://nit.tron.net.ua/api/product/list/category/'+parseInt(id, 10), function(data){
        		var view='';
        		for(var key in data)
        		{
        			view+='<div class="product_item card col-xs-12 col-sm-6 col-md-3 col-lg-4" name="'+data[key]['id']+'"">';
        			view+='<img src="'+data[key]['image_url']+'" alt="'+data[key]['name']+'" class="img-fluid product-image">';
        			view+='<span class="product-title">Ціна: '+data[key]['name']+"</span>";
        			view+='<span>Ціна: '+data[key]['price']+"</span>";
        			if(data[key]['special_price']!=null){
        				view+='<span>Акція: '+data[key]['special_price']+"</span>";
        			}
        			view+='<button type="button" class="btn button" name="'+data[key]['id']+'"> В корзину </button> ';
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