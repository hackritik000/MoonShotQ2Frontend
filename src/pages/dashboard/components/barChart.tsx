import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartEvent,
  ActiveElement
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { DataInterface } from '../queries/queries';
import { activeReducers, AgeTypes, Gender } from '@/store/dataSlice';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialColors = Array(6).fill('rgba(255, 99, 132, 0.5)');
const AtoF = ['A', 'B', 'C', 'D', 'E', 'F'];

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart'
    }
  }
};

const checkDate = (
  day: string,
  allData: { from: string | undefined; to: string | undefined }
) => {
  if (!allData.from || !allData.to) return false;
  if (allData && day > allData?.from && day < allData.to) {
    return true;
  }
  if (allData) return false;
  return true;
};

const firstActiveColor = (active: string) => {
  const newColors = [...initialColors];
  const newColorsIndex = AtoF.indexOf(active);

  newColors[newColorsIndex] =
    newColors[newColorsIndex] === initialColors[newColorsIndex]
      ? 'rgba(0, 0, 0, 0.5)'
      : initialColors[newColorsIndex];

  return newColors;
};

export function BarChart() {
  const dispatch = useDispatch();
  const allData = useSelector((state: RootState) => state.data);
  const [colors, setColors] = useState(firstActiveColor(allData.active));
  // useEffect(()=>{
  // if(allData.active){
  //     const newColors = [...initialColors];
  //     const newColorsIndex = initialColors.indexOf(allData.active)
  //     newColors[newColorsIndex] =
  //       newColors[newColorsIndex] === initialColors[newColorsIndex]
  //         ? 'rgba(0, 0, 0, 0.5)'
  //         : initialColors[newColorsIndex];
  //   setColors(newColors)
  // }
  // })
  if (allData.firstAdd) {
    const data = allData.data.filter((item) => {
      const checkingDateBool = checkDate(item.Day, allData.date);
      if (allData.gender === Gender.All && allData.age === AgeTypes.All) {
        return checkingDateBool;
      }
      if (allData.gender === Gender.All && item.Age === allData.age) {
        return checkingDateBool;
      }
      if (allData.age === AgeTypes.All && item.Gender === allData.gender) {
        return checkingDateBool;
      }
      return (
        item.Age === allData.age &&
        item.Gender === allData.gender &&
        checkDate(item.Day, allData.date)
      );
    });

    const totals = AtoF.map((key) =>
      data.reduce(
        (sum, item) => sum + (item[key as keyof DataInterface] || 0),
        0
      )
    );

    const finalData: ChartData<'bar'> = {
      labels: AtoF,
      datasets: [
        {
          label: 'Total Values',
          data: totals,
          backgroundColor: colors
        }
      ]
    };

    const handleBarClick: ChartOptions<'bar'>['onClick'] = (
      _: ChartEvent,
      elements: ActiveElement[]
    ) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        const newColors = [...initialColors];
        newColors[clickedIndex] =
          newColors[clickedIndex] === initialColors[clickedIndex]
            ? 'rgba(0, 0, 0, 0.5)'
            : initialColors[clickedIndex];
        setColors(newColors);
        dispatch(activeReducers(AtoF[clickedIndex]));
      }
    };

    return (
      <Bar options={{ ...options, onClick: handleBarClick }} data={finalData} />
    );
  }
  return <div>hello</div>;
}
