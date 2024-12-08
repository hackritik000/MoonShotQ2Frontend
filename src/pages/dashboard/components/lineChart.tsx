import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import ZoomPlugin from 'chartjs-plugin-zoom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AgeTypes, Gender } from '@/store/dataSlice';
import { formatDate } from '../normalfunction';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ZoomPlugin
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true
        },
        pinch: {
          enabled: true
        },
        mode: 'x' as 'x'
      }
    }
  }
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augsh',
  'Octover',
  'December'
];

export function LineChart() {
  const allData = useSelector((state: RootState) => state.data);

  const filteredData = allData.data.filter((item) => {
    if (allData.gender === Gender.All && allData.age === AgeTypes.All) {
      return true;
    }
    if (allData.gender === Gender.All && item.Age === allData.age) {
      return true;
    }
    if (allData.age === AgeTypes.All && item.Gender === allData.gender) {
      return true;
    }
    return item.Age === allData.age && item.Gender === allData.gender;
  });

const data = {
  labels: filteredData.map(date => formatDate(date.Day)),
  datasets: [
    {
      label: `Dataset ${allData.active}`,
      data: filteredData.map(item => item[allData.active]),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.1
    }
  ]
};
  return <Line options={options} data={data} />;
}
