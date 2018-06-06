var theRef= new Firebase('https://demoapp-984c6.firebaseio.com/products');

function logOff() {
    theRef.unauth();
    location.assign('index.html');
}


var authData = theRef.getAuth();


function editProd(id) { 
    window.name = id;
    location.assign('editProduct.html');

}

function onComplete(error) {
    if (error){
        alert('Delete Failed!');
    } else {
        //alert('Deleted product!');
        location.reload(true);
    }
}

function deleteProd(id) {
    if (confirm('Are you sure you want to delete!?') == true) {
       theRef.child(id).remove(onComplete);
    } 
}


var prodData = {};

theRef.on('value', function(snap) {

    prodData = snap.val();
    
    $.each(prodData, function(index, value) {
        var prodPreview = '<div class="row">';
        
        prodPreview += '<div class="col-md-3 prodListHeader">';    
        prodPreview += '<h2>' + value.name + '</h2>';
        prodPreview += '</div>';
        
        prodPreview += '<div class="col-md-3 prodListHeader">';
        prodPreview += '<h2>$' + value.price + '</h2>';
        prodPreview += '</div>';
        
        prodPreview += '</div>';
        
        
        prodPreview += '<div class="row">';
        
        prodPreview += '<div class="col-md-3 picFix">';
        if (value.image == 'NONE') {
            prodPreview += '<img alt="No Pic">';
        } else {
            prodPreview += '<img src=' + value.image + '>';
        }
        prodPreview += '</div>';
        
        
        prodPreview += '<div class="col-md-3">';
        prodPreview += '<p>' + value.description + '</p>';
        prodPreview += '</div>';
        prodPreview += '</div>';
        
        
        prodPreview += '<div class="row">';
        
        prodPreview += '<div class="col-md-3">';
        prodPreview += '<button type="button" class="btn btn-warning" onclick="editProd(\'' + index + '\')">EDIT PRODUCT</button>';
        prodPreview += '</div>';
        
        prodPreview += '<div class="col-md-9">';
        prodPreview += '<button type="button" class="btn btn-danger" onclick="deleteProd(\'' + index + '\')">DELETE PRODUCT</button>';
        prodPreview += '</div>';
        
        prodPreview += '</div>';
        
        prodPreview += '<div class="row spacer">';
        prodPreview += '</div>';
        
        $(prodPreview).appendTo('#main');

    
    });

}, function(errorObject) {
    
console.log('The read failed: ' + errorObject.code);  

});