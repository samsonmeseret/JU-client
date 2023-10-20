import React, { useRef, useEffect } from 'react';

import {
  Chart, BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { tailwindConfig, formatValue, hexToRGB } from '../utils/Utils';

Chart.register(BarController, BarElement, LinearScale, TimeScale, Tooltip, Legend);

const chartData = {
  labels: [
    '12-01-2020', '01-01-2021', '02-01-2021',
    '03-01-2021', '04-01-2021', '05-01-2021',
    '06-01-2021', '07-01-2021', '08-01-2021',
    '09-01-2021', '10-01-2021', '11-01-2021',
    '12-01-2021', '01-01-2022', '02-01-2022',
    '03-01-2022', '04-01-2022', '05-01-2022',
    '06-01-2022', '07-01-2022', '08-01-2022',
    '09-01-2022', '10-01-2022', '11-01-2022',
    '12-01-2022', '01-01-2023',
  ],
  datasets: [
    // Indigo line
    {
      label: 'Current',
      data: [
        5000, 8700, 7500, 12000, 11000, 9500, 10500,
        10000, 15000, 9000, 10000, 7000, 22000, 7200,
        9800, 9000, 10000, 8000, 15000, 12000, 11000,
        13000, 11000, 15000, 17000, 18000,
      ],
      fill: true,
      backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
      borderColor: tailwindConfig().theme.colors.indigo[500],
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 3,
      pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
      clip: 20,
    },
    // Gray line
    // {
    //   label: 'Previous',
    //   data: [
    //     8000, 5000, 6500, 5000, 6500, 12000, 8000,
    //     9000, 8000, 8000, 12500, 10000, 10000, 12000,
    //     11000, 16000, 12000, 10000, 10000, 14000, 9000,
    //     10000, 15000, 12500, 14000, 11000,
    //   ],
    //   borderColor: tailwindConfig().theme.colors.slate[300],
    //   fill: false,
    //   borderWidth: 2,
    //   tension: 0,
    //   pointRadius: 0,
    //   pointHoverRadius: 3,
    //   pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
    //   clip: 20,
    // },
  ],
};
function BarChart01({
  data,
  width,
  height
}) {

  const canvas = useRef(null);
  const legend = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
            },
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(value),
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'MM-DD-YYYY',
              unit: 'month',
              displayFormats: {
                month: 'MMM YY',
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) => formatValue(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [{
        id: 'htmlLegend',
        afterUpdate(c, args, options) {
          const ul = legend.current;
          if (!ul) return;
          // Remove old legend items
          while (ul.firstChild) {
            ul.firstChild.remove();
          }
          // Reuse the built-in legendItems generator
          const items = c.options.plugins.legend.labels.generateLabels(c);
          items.forEach((item) => {
            const li = document.createElement('li');
            li.style.marginRight = tailwindConfig().theme.margin[4];
            // Button element
            const button = document.createElement('button');
            button.style.display = 'inline-flex';
            button.style.alignItems = 'center';
            button.style.opacity = item.hidden ? '.3' : '';
            button.onclick = () => {
              c.setDatasetVisibility(item.datasetIndex, !c.isDatasetVisible(item.datasetIndex));
              c.update();
            };
            // Color box
            const box = document.createElement('span');
            box.style.display = 'block';
            box.style.width = tailwindConfig().theme.width[3];
            box.style.height = tailwindConfig().theme.height[3];
            box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
            box.style.marginRight = tailwindConfig().theme.margin[2];
            box.style.borderWidth = '3px';
            box.style.borderColor = item.fillStyle;
            box.style.pointerEvents = 'none';
            // Label
            const labelContainer = document.createElement('span');
            labelContainer.style.display = 'flex';
            labelContainer.style.alignItems = 'center';
            const value = document.createElement('span');
            value.style.color = tailwindConfig().theme.colors.slate[800];
            value.style.fontSize = tailwindConfig().theme.fontSize['3xl'][0];
            value.style.lineHeight = tailwindConfig().theme.fontSize['3xl'][1].lineHeight;
            value.style.fontWeight = tailwindConfig().theme.fontWeight.bold;
            value.style.marginRight = tailwindConfig().theme.margin[2];
            value.style.pointerEvents = 'none';
            const label = document.createElement('span');
            label.style.color = tailwindConfig().theme.colors.slate[500];
            label.style.fontSize = tailwindConfig().theme.fontSize.sm[0];
            label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
            const theValue = c.data.datasets[item.datasetIndex].data.reduce((a, b) => a + b, 0);
            const valueText = document.createTextNode(formatValue(theValue));
            const labelText = document.createTextNode(item.text);
            value.appendChild(valueText);
            label.appendChild(labelText);
            li.appendChild(button);
            button.appendChild(box);
            button.appendChild(labelContainer);
            labelContainer.appendChild(value);
            labelContainer.appendChild(label);
            ul.appendChild(li);
          });
        },
      }],
    });
    return () => chart.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <ul ref={legend} className="flex flex-wrap"></ul>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default BarChart01;
