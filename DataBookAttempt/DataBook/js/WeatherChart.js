Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$.get("https://prodapi.metweb.ie/observations/phoenix-park/today",
    function (data, status, jqxhr) {
        var title = "";
        var dataSet = [];
        var dataAct = [];
        var i = 0;
        //for weather
        for (let {
                reportTime,
                date,
                temperature
            } of data) {
            title = date;
            dataSet[i] = reportTime;
            dataAct[i] = temperature;
            i++;

        }

        var ctx = document.getElementById('myAreaChart');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: dataSet,
                datasets: [{
                    label: title,
                    //backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                    pointBackgroundColor: 'black',
                    data: dataAct

                }]
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            maxTicksLimit: 10,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return value + "'";
                            }
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ": ' " + tooltipItem.yLabel;
                        }
                    }
                }
            }

        });
    })

$.get("https://prodapi.metweb.ie/observations/phoenix-park/yesterday",
    function (data, status, jqxhr) {
        console.log(data);
        var title = "";
        var dataSet = [];
        var dataAct = [];
        var i = 0;
        //for weather
        for (let {
                reportTime,
                date,
                temperature
            } of data) {
            title = date;
            dataSet[i] = reportTime;
            dataAct[i] = temperature;
            i++;

        }

        var ctx = document.getElementById('YesterdayTempChart');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: dataSet,
                datasets: [{
                    label: title,
                    //backgroundColor: 'rgb(0, 0, 255)',
                    borderColor: 'rgb(0, 0, 255)',
                    pointBackgroundColor: 'black',
                    data: dataAct

                }]
            },

            // Configuration options go here
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'date'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 7
                        }
                    }],

                   
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 10,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return value + "'";
                            }
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ": ' " + tooltipItem.yLabel;
                        }
                    }
                }
            }

        });
    })


$.get("https://prodapi.metweb.ie/monthly-data/Phoenix%20Park",
    function (data, status, jqxhr) {
        console.log(data.total_rainfall.report[2019]);
        var rainData = data.total_rainfall.report[2019];   
        console.log(rainData.february);

        var jan = rainData.january;
        var feb = rainData.february;
        var mar = rainData.mar;
        var apr = rainData.apr;
        var may = rainData.may;
        var jun = rainData.june;
        var jul = rainData.july;
        var aug = rainData.august;
        var sep = rainData.september;
        var oct = rainData.october;
        var nov = rainData.november;
        var dec = rainData.december;
        console.log(aug);

        var title = "";
        var dataSet = ["January","February","March","April"];
        var dataAct = [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec];
        console.log(dataAct);

        var ctx = document.getElementById("myBarChart");
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July","August","September","November","December"],
                datasets: [{
                    // label: "Revenue",
                    backgroundColor: "#4e73df",
                    hoverBackgroundColor: "#2e59d9",
                    borderColor: "#4e73df",
                    data: dataAct,
                }],
            },
            options: {
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'month'
                        },
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            maxTicksLimit: 12
                        },
                        maxBarThickness: 25,
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 100,
                            maxTicksLimit: 10,
                            padding: 10,
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return value + ' ml';
                            }
                        },
                        gridLines: {
                            color: "rgb(234, 236, 244)",
                            zeroLineColor: "rgb(234, 236, 244)",
                            drawBorder: false,
                            borderDash: [2],
                            zeroLineBorderDash: [2]
                        }
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + tooltipItem.yLabel + 'ml';
                        }
                    }
                },
            }
        });



    })