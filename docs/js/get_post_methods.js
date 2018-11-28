

window.jQuery = $;
window.$ = $;

//showing all products before choosing category
function showPrewiew(){
    $(".product_item").html('');
    $(".product_view").html('');
    
    $(".buyframe").css("display",'none');
    var tittle='<p class="category_tittle " >All products</p>';
        // console.log(tittle);
         $(".category_tittle").html('');
    $('.category_tittle').append(tittle);
    $.getJSON('https://nit.tron.net.ua/api/product/list', function(data){
                var view='';
                for(var key in data)
                {
                    view+='<div class="product_item card col-xs-12 col-sm-6 col-md-6 col-lg-4" data-product-id="'+data[key]['id']+'">';
                    view+='<img src="'+data[key]['image_url']+'" alt="'+data[key]['id']+'" class="img-fluid product-image mx-auto"data-product-id="'+data[key]['id']+'">';
                    view+='<span class="product-title mx-auto" data-product-id="'+data[key]['id']+'">'+data[key]['name']+"</span>";
                    if(data[key]['special_price']!=null){
                        view+='<span class="mx-auto item_price" data-product-id="'+data[key]['id'] +'">Ціна: <s>'+data[key]['price']+"</s></span>";
                        view+='<span class="mx-auto item_price spec_pr" data-product-id="'+data[key]['id']+'">Акція: '+data[key]['special_price']+"</span>";
                    }
                    else{
                        view+='<span class="mx-auto item_price">Ціна:'+data[key]['price']+"</span>";
                    }
                    view+='<button type="button" class=" btn button btn-default product-show"data-attr="' +data[key]['id']+'"> Детальніше </button> ';
                    view+='</div>';
                }
                $('.product_item').append(view);
                $(".card").on('click',function(){
                var ii=$(this).data('product-id');
                    showDescription(ii);
                })
                
                
            });

}

var categoryDescription=[];
//shows categories
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
//shows items of category
function loadItems(id){
    $(".product_item").html('');
    $(".product_view").html('');
    $("#categories").slideToggle();
    $(".buyframe").css("display",'none');
    $(".empty_cart").css("display",'none');
    $(".empty_cart").css("display",'none');
    $(".bbb").css('display','none');
    
    var tittle='<p class="category_tittle" >'+categoryDescription[id-2]+'</p>';
        // console.log(tittle);
         $(".category_tittle").html('');
    $('.category_tittle').append(tittle);
    $.getJSON('https://nit.tron.net.ua/api/product/list/category/'+parseInt(id, 10), function(data){
                var view='';
                for(var key in data)
                {
                    view+='<div class="product_item card col-xs-12 col-sm-6 col-md-6 col-lg-4" data-product-id="'+data[key]['id']+'">';
                    view+='<img src="'+data[key]['image_url']+'" alt="'+data[key]['id']+'" class="img-fluid product-image mx-auto"data-product-id="'+data[key]['id']+'">';
                    view+='<span class="product-title mx-auto" data-product-id="'+data[key]['id']+'">'+data[key]['name']+"</span>";
                    if(data[key]['special_price']!=null){
                        view+='<span class="mx-auto item_price" data-product-id="'+data[key]['id'] +'">Ціна: <s>'+data[key]['price']+"</s></span>";
                        view+='<span class="mx-auto item_price spec_pr" data-product-id="'+data[key]['id']+'">Акція: '+data[key]['special_price']+"</span>";
                    }
                    else{
                        view+='<span class="mx-auto item_price">Ціна:'+data[key]['price']+"</span>";
                    }
                    view+='<button type="button" class=" btn button btn-x product-show"data-attr="' +data[key]['id']+'"> Детальніше </button> ';
                    view+='</div>';
                }
                $('.product_item').append(view);
                $(".card").on('click',function(){
                var ii=$(this).data('product-id');
                    showDescription(ii);
                })
                
                
            });
}
//shows description of chosen item
function showDescription(id){
    if(id!=undefined){
    $(".product_item").html('');
    $(".product_view").html('');
    $(".bbb").css('display','none');
    $(".category_tittle").html('');
    $(".empty_cart").css("display",'none');
    $.getJSON('https://nit.tron.net.ua/api/product/'+id, function(data){
        var description='';
            description+='<div class="product_view card container mx-auto" data-description-id="'+data['id']+'">';
            description+='<p class="mx-auto product-title">'+'<strong>'+data['name']+'</strong>.'+"</p>";
            description+='<img src="'+data['image_url']+'" alt="'+data['id']+'" class="img-fluid product-image mx-auto">';
            description+='<p class="mx-auto">Опис:</p>';
            description+='<p class="description">'+data['description']+"</p>";
            if(data['special_price']!=null){
                description+='<span class="mx-auto item_price">Ціна: <s>'+data['price']+"</s></span>";
            description+='<span class="mx-auto spec_pr item_price" >Акція: '+data['special_price']+"</span>";
            }
            else{
                description+='<span class="mx-auto item_price" >Ціна: '+data['price']+"</span>";
            }
            description+='<button type="button" class="button_buy btn button btn-info product-buy" onclick="buy(id)" id="' +data['id']+'"> В корзину </button> ';
            description+='</div>';
        $('.product_view').append(description);
    });
    }
}



var itemsToBuy=[];
var amountItems=[];
var row;
var count;
var product={};
var index;
var purschase=false;
var sum;
//buying product realization
function buy(id){
    $(".product_item").html('');
    $(".product_view").html('');
    $(".buyframe").css("display",'block');
    $(".empty_cart").css("display",'none');
    $(".bbb").css('display','block');
    
    if (!itemsToBuy.includes(id)) {
        itemsToBuy.push(id);
        amountItems.push(1);
    $.getJSON('https://nit.tron.net.ua/api/product/'+id, function(data){
        product.id=data['id'];
        product.name=data['name'];
        product.description=data['description'];
        product.image_url=data['image_url'];
        product.price=data['price'];
        product.special_price=data['special_price'];
        var table = document.getElementById("classTable");
        row = table.insertRow(table.rows.length);
        row.insertCell(0).innerHTML = product.name;
        row.insertCell(1).innerHTML = (product.special_price || product.price);
        count = row.insertCell(2);
        index= itemsToBuy.length - 1;
        count.innerHTML = "1";
        let del = row.insertCell(3);
        var input_img=' <img class="btn_img my_btn" src="img/delete.png" alt="rabish"onclick="deleteRow(product,this)">';
        del.innerHTML=input_img;
    });
     }else{
        row.deleteCell(1);
        row.insertCell(1).innerHTML = (product.special_price || product.price);
        amountItems[index]++;
        count.innerHTML++;

     }
}
$(document).on('click','.cancel',function(){
    showPrewiew();
    $('.bbb').css('display','none');
});
//delete selected item from cart
function deleteRow(product, r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("classTable").deleteRow(i);
    let index = itemsToBuy.indexOf(product.id);
    console.log(index+"index");
    itemsToBuy.splice(index, 1);
    amountItems.splice(index, 1)
    console.log(itemsToBuy+"---"+amountItems )
    console.log(itemsToBuy.length+"zzzzz");
    if(itemsToBuy.length==0){
        showPrewiew();
    }
}

//shows list of chosen products
function cartCliked(){
    $('.cart').on('click',function(){
        $(".product_item").html('');
            $(".product_view").html('');
            $(".category_tittle").html('');
            $(".empty_cart").css("display",'none');
        if(itemsToBuy.length!=0){
            $(".buyframe").css("display",'block');
            $('.bbb').css('display','block');
           // $("#classTable").css("display",'block');
        }else{
            $(".empty_cart").css("display",'block');
            
            $(".buyframe").css("display",'block');
        }
    })
};

var products={};
var postData={};
//sends data to server
function makePost()
{
    $('.buy').on('click',function()
    {
        if(itemsToBuy.length!=0)
        {
                var name1=document.getElementById('namee').value;
                if(name1.length==0){
                    alert("Введіть ваше ім'я");
                    document.getElementById('namee').value="";
                    return;
                } 
                var phone1=document.getElementById('mobile').value;
                if(phone1.length<12){
                    alert("Формат номеру телефону не правильний!\nПравильний формат: +38 (ddd) ddd-dddd");
                    document.getElementById('mobile').value="";
                    return;
                }
                    
                var email1=document.getElementById('email').value;
                console.log(name+" "+ email+" "+ phone1);
                postData = 
                {
                    token:"m4Ff6tdT_yBrNChFq45q",
                    name: name1,
                    phone: phone1,
                    email: email1,
                }
                for(var i=0;i<itemsToBuy.length;i++) 
                {
                  postData["products[" + itemsToBuy[i] + "]"] = amountItems[i]
                }
                console.log(postData);
                 $.post("https://nit.tron.net.ua/api/order/add",
                {
                    token:"m4Ff6tdT_yBrNChFq45q",
                    name: name1,
                    phone: phone1,
                    email: email1,
                    postData
                },
                function(postData,status){
                    console.log("Data: " + postData + "\nStatus: " + status);
                    alert("Шановний(на), "+name1+"\nОчікуйте доставки!");
                    
                    showPrewiew(1);
                    document.getElementById('email').value='';
                    document.getElementById('mobile').value='';
                    document.getElementById('namee').value='';
                });
        }else{
            alert('У вас немає товарів у чеку');
        }
    })
};

$(document).ready(function(){
    showPrewiew();
    showGoods();
    cartCliked();
    makePost();
});