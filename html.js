const html = `<html>

<head>
    <style>
        * {
            position: relative;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    </style>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-annotation/0.5.7/chartjs-plugin-annotation.min.js"></script>
</head>

<body>
    <canvas id="myChart"></canvas>
    <script type="text/javascript">
        var canvas = document.getElementById('myChart');
        var height = canvas.height;
        var ctx = canvas.getContext('2d');
        gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgb(255, 99, 132)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        let xPosition = -1;
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: [],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: gradient,
                    borderColor: 'rgb(255, 99, 132)',
                    data: [],
                    pointRadius: null,
                    borderWidth: 1.5,
                }]
            },

            // Configuration options go here
            options: {
                animation: {
                    duration: 200,
                },
                annotation: {
                    annotations: [
                        {
                            type: "line",
                            mode: "vertical",
                            scaleID: "x-axis-0",
                            value: null,
                            borderColor: "rgb(150, 150, 150)",
                            borderDash: [2, 2],
                            label: {
                                content: null,
                                enabled: true,
                                position: "top",
                                xAdjust: 0,
                            }
                        }
                    ]
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0
                    }
                },
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            xPosition = tooltipItems.xLabel;
                            updateLinePosition(tooltipItems.yLabel)
                            updateLabelXAdjust();
                            return null;
                        }
                    },
                    custom: function (tooltipModel) {
                        tooltipModel.opacity = 0;
                    }
                },
                legend: {
                    display: false,
                },
            }
        });

        function getDataLength() {
            const length = chart.data.datasets[0].data.length
            return length;
        }

        function updateLinePosition(newData) {
            chart.options.annotation.annotations[0].value = xPosition;
            chart.options.annotation.annotations[0].label.content = newData;
            updateHighlightedPoint(xPosition);
            chart.update();
        }

        function updateHighlightedPoint() {
            const length = getDataLength();
            chart.data.datasets[0].pointRadius = []
            for (let i = 0; i < length; i++) {
                if (i == xPosition) {
                    chart.data.datasets[0].pointRadius[i] = 3;
                }
                else {
                    chart.data.datasets[0].pointRadius[i] = 0;
                }
            }
            chart.update();
        }

        function updateLabelXAdjust() {
            const length = getDataLength();
            const offset = 3;
            const adjustFactor = 5;
            if (offset <= xPosition && xPosition <= (length - 1) - offset) {
                chart.options.annotation.annotations[0].label.xAdjust = 0;
            }
            else {
                if (xPosition <= offset) {
                    chart.options.annotation.annotations[0].label.xAdjust = -adjustFactor * (offset - xPosition);
                }
                else {
                    chart.options.annotation.annotations[0].label.xAdjust = adjustFactor * (offset - (length - 1) + xPosition);
                }
            }
        }

        function synchronizeLabelData() {
            const newData = chart.data.datasets[0].data[xPosition];
            updateLinePosition(newData);
        }

        document.addEventListener("message", function (data) {
            const points = JSON.parse(data.data);
            chart.data.datasets[0].data = points;
            chart.data.labels = Array.from(Array(points.length).keys())
            synchronizeLabelData();
            chart.update();
        });
        
    </script>
</body>

</html>`;

export default html;
