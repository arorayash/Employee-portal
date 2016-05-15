$(function(){
  
    var $products = $('.items');
    var $name = $('#name');
    var $description = $('#description');
    var $price = $('#price');
    
    var Template =  $("#product-template").html();
    
    function addProduct(product){
        $products.append(Mustache.render(Template, product));
    };
    
    $.ajax({
        type: 'GET',
        url: 'https://tapchief-internship.herokuapp.com/products/',
        success: function(products){
            $.each(products, function(i, product){
               addProduct(product);
            });
        },
        error: function(){
            alert("ERROR LOADING PRODUCTS!");
        }
    });
    
    $('#addProduct').on("click", function(){
        
        var product = {
            "name": $name.val(),
            "description": $description.val(),
            "price": $price.val(),
        };
        
        $.ajax({
            type: 'POST',
            url: 'https://tapchief-internship.herokuapp.com/products/',
            data: product,
            success: function(newProduct) {
                addProduct(newProduct);
            },
            error: function(){
                alert("ERROR SAVING PRODUCT!");
            }
        });
        
    });
    
    $products.delegate('.remove', "click", function(){
        
        var $product_remove = $(this).closest(".item");
        
        $.ajax({
            type: 'DELETE',
            url: ' https://tapchief-internship.herokuapp.com/products/'+ $(this).attr('data-id') + '/',
            success: function(){
                $product_remove.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });
    });
    
    $products.delegate('.editProduct', "click", function(){
        var $product_edit = $(this).closest(".item"); 
        $product_edit.find('input.name').val( $product_edit.find('span.name').html() );
        $product_edit.find('input.description').val( $product_edit.find('span.description').html() );
        $product_edit.find('input.price').val( $product_edit.find('span.price').html() );
        $(this).closest(".item").addClass('edit');
        
    });
    
    $products.delegate('.cancelEdit', "click", function(){
        $(this).closest(".item").removeClass('edit'); 
    });
    
    $products.delegate('.saveEdit', "click", function(){
        var $product_edit = $(this).closest(".item"); 
        var product = {
            "name": $product_edit.find('input.name').val(),
            "description": $product_edit.find('input.description').val(),
            "price": $product_edit.find('input.price').val(),
        }
        
        $.ajax({
            type: 'PUT',
            url: 'https://tapchief-internship.herokuapp.com/products/' + $product_edit.attr('data-id') + '/',
            data: product,
            success: function(newProduct) {
                $product_edit.find('span.name').html(product.name);
                $product_edit.find('span.description').html(product.description);
                $product_edit.find('span.price').html(product.price);
                $product_edit.removeClass('edit');
            },
            error: function(){
                alert("ERROR UPDATING PRODUCT!");
            }
        });
        
    });
    
});