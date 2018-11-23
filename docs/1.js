

window.jQuery = $;
window.$ = $;

var categoryDescription=[];
function showGoods(){
 $.getJSON('https://nit.tron.net.ua/api/category/list', function(data) {
  var cat='<div>';
   for(var key in data){
    cat+='<p class="load" data-category-id="'+data[key]['id']+'">'+data[key]['name']+'</p>';
    categoryDescription.push(data[key]['description']);
        }
        cat+='</div>'
        
        
        $('#categories').append(cat);
        $('p.load').on('click', function(){
         var id = $(this).attr('data-category-id');
         //console.log(id);
         loadItems(id);
         selectedCategory=id;
         
        });


});
}
function loadItems(id){
	$(".product_item").html('');
	$(".product_view").html('');
    $("#categories").slideToggle();
    var tittle='<p class="category_tittle" >'+categoryDescription[id]+'</p>';
        // console.log(tittle);
         $(".category_tittle").html('');
    $('.category_tittle').append(tittle);
	$.getJSON('http://nit.tron.net.ua/api/product/list/category/'+parseInt(id, 10), function(data){
        		var view='';
        		for(var key in data)
        		{
        			view+='<div class="product_item card col-xs-12 col-sm-6 col-md-6 col-lg-4" data-product-id="'+data[key]['id']+'">';
        			view+='<img src="'+data[key]['image_url']+'" alt="'+data[key]['id']+'" class="img-fluid product-image"data-product-id="'+data[key]['id']+'">';
        			view+='<span class="product-title mx-auto" data-product-id="'+data[key]['id']+'">'+data[key]['name']+"</span>";
        			if(data[key]['special_price']!=null){
        				view+='<span class="mx-auto item_price" data-product-id="'+data[key]['id'] +'">Ціна: <s>'+data[key]['price']+"</s></span>";
        				view+='<span class="mx-auto item_price" data-product-id="'+data[key]['id']+'">Акція: '+data[key]['special_price']+"</span>";
        			}
        			else{
        				view+='<span class="mx-auto item_price">Ціна:'+data[key]['price']+"</span>";
        			}
        			view+='<button type="button" class=" btn button bg-warning product-show"data-attr="' +data[key]['id']+'"> Детальніше </button> ';
        			view+='</div>';
            	}
            	$('.product_item').append(view);
            	$(".card").on('click',function(){
            	var ii=$(this).data('product-id');
        			showDescription(ii);
            	})
            	
            	
			});
}

function showDescription(id){
	if(id!=undefined){
	$(".product_item").html('');
	$(".product_view").html('');
    $(".category_tittle").html('');
	$.getJSON('http://nit.tron.net.ua/api/product/'+id, function(data){
		var description='';
	        description+='<div class="product_view card col-xs-12 col-sm-6 col-md-6 col-lg-4 mx-auto" data-description-id="'+data['id']+'">';
	        description+='<p class="mx-auto product-title">'+'<strong>'+data['name']+'</strong>.'+"</p>";
	        description+='<img src="'+data['image_url']+'" alt="'+data['id']+'" class="img-fluid product-image">';
	        description+='<p class="mx-auto">Опис:</p>';
	        description+='<p>'+data['description']+"</p>";
	        description+='<span> '+data['name']+"</span>";
	        if(data['special_price']!=null){
	        	description+='<span class=" item_price">Ціна: <s>'+data['price']+"</s></span>";
	        description+='<span class=" item_price" >Акція: '+data['special_price']+"</span>";
	        }
	        else{
	        	description+='<span class=" item_price" >Ціна: '+data['price']+"</span>";
	        }
	        description+='<button type="button" class="button_buy btn button bg-success product-buy" onclick="buy(id)" id="' +data['id']+'"> В корзину </button> ';
	        description+='</div>';
	    $('.product_view').append(description);
	});
	}
}




var buy_item_array=[];
var itemsInCart=[];
var countOfItemsInCart=[];
function buy(id){
	if (!itemsInCart.includes(id)) {
        itemsInCart.push(id);
        countOfItemsInCart.push(1);
        console.log(itemsInCart+"=="+countOfItemsInCart);  
    }
    var product={};;
    $.getJSON('https://nit.tron.net.ua/api/product/1', function(data){
	    product.name=data['name'];
	    product.description=data['description'];
	    product.image_url=data['image_url'];
	    product.price=data['price'];
	    product.special_price=data['special_price'];
	});
	var table = document.getElementById("classTable");
   // var row = table.insertRow(table.rows.length-1);
    var row = table.insertRow(table.rows.length);
        row.insertCell(0).innerHTML = product.name;
        row.insertCell(1).innerHTML = (product.special_price || product.price);

        let dec = row.insertCell(2);
        dec.innerHTML = "-";
        var count = row.insertCell(3);
        var index = itemsInCart.length - 1;
        dec.onclick = function () {
            if (countOfItemsInCart[index] > 1) {
                count.innerHTML--;
                countOfItemsInCart[index]--;
            }
        }
        count.innerHTML = "1";
        let inc = row.insertCell(4);
        inc.innerHTML = "+";
        inc.onclick = function () {
            countOfItemsInCart[index]++;
            count.innerHTML++;
        }

        let del = row.insertCell(5);
        del.className = "delete-button";
        del.onclick = function () {
            let index = itemsInCart.indexOf(product.id);
            table.deleteRow(index + 1);
            itemsInCart.splice(index, 1);
            countOfItemsInCart.splice(index, 1)
        }

    
    }

// var bought = [];
// bought[1] = 0;
// bought[2] = 0;
// bought[3] = 0;
// bought[4] = 0;

// function assArr(id){
// console.log(bought.length);
// 	for(idd in bought){
// 	if(idd==id){
// 	bought[id]=bought[id]+1;
// 		console.log(idd + "==" + bought[idd]);

// 	}else{

// 	} 
// 	}	
// 	console.log(bought);
// }



$(document).ready(function(){
	showGoods();
});


// button.onclick = function (e) {
//         e.stopPropagation();
//         showCartView();
//         addRowToCartTable(cartTable, product);
//     }

// function setupCartView() {
//     document.getElementById("cart-view-send").onclick = function () {
//         var formData = new FormData(document.forms.cart);
//         formData.append("token", TOKEN);
//         for (let i = 0; i < itemsInCart.length; i++) {
//             formData.append("products[" + itemsInCart[i].id + "]", countOfItemsInCart[i]);
//         }
//         post(SERVER_NAME, "api/order/add", formData);
//     }
// }
