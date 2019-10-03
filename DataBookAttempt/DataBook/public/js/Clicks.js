// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


// Pie Chart Example
$.get("http://127.0.0.1:8081/clicky2", function (data, status, jqxhr) {
  var dataSet = [];
  var dataAct = [];
  var i = 0;

  for (let {
      date,
      clickTotal
    } of data) {
    dataSet[i] = date.substring(0,10);
    dataAct[i] = clickTotal;
    console.log((dataSet[i]).substring(0, 10));
    i++;
  }

  var label = ` <div class="mt-4 text-center small">
  <span class="mr-2">
    <i class="fas fa-circle text-primary"></i>${dataSet[0].substring(0,10)}: ${dataAct[0]} Hits
  </span>
  <span class="mr-2">
    <i class="fas fa-circle text-success"></i>${dataSet[1].substring(0,10)}: ${dataAct[1]} Hits
  </span>
  <span class="mr-2">
    <i class="fas fa-circle text-info"></i>${dataSet[2].substring(0,10)}: ${dataAct[2]} Hits
  </span>
</div>`

  $('#label').append(label);

  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: dataSet,
      datasets: [{
        data: dataAct,
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });


});