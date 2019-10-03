$.get("http://127.0.0.1:8081/products",function(data, status, jqxhr){
    var dataList = `
    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Units in Stock</th>
          <th>Unit Price</th>
        </tr>
      </thead>
      
      <tbody>`;
    
 
    for(let{ProductID, ProductName, UnitPrice, UnitsInStock} of data){
        dataList += `<tr>`;
        dataList += `<td>${ProductID}</td><td>${ProductName}</td><td>${UnitsInStock}</td><td>${UnitPrice}</td>`;
        dataList += `</tr>`
    }
    dataList += `</tbody></table>`;
    $('#table').append(dataList);
    $('#dataTable').dataTable();
});

// const tab = document.getElementById("#tab");
// function clicks() {

//   if(tab.click()){

//   }
// }

$("#tab").click(function(){
  var postAPI = "/clicky";
  $.post(postAPI);
})



