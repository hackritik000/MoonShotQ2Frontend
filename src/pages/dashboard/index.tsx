import PageHead from '@/components/shared/page-head.jsx';
import { getUrlCookie, useDashboardData } from './queries/queries.js';
import { Button } from '@/components/ui/button.js';
import { useNavigate, useParams } from 'react-router-dom';
import { BarChart } from './components/barChart.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAllDataReducers,
  ageReducers,
  AgeTypes,
  dateReducers,
  Gender,
  genderReducers
} from '@/store/dataSlice.js';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.js';
import { useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover.js';
import { Calendar } from '@/components/ui/calendar.js';
import { RootState } from '@/store/store.js';
import { SelectRangeEventHandler } from 'react-day-picker';
import { LineChart } from './components/lineChart.js';
import { formatDate } from './normalfunction.js';
import { GenerateLink } from './components/genarateLink.js';

export default function DashboardPage() {
  const {id} = useParams()
  console.log(id);
  const { data, isLoading, isError } = useDashboardData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = useSelector((state: RootState) => state.data.date);
  const reduxData = useSelector((state: RootState) => state.data);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getUrlCookie(id);
      }
      if (data?.data?.data) {
        dispatch(addAllDataReducers(data.data.data));
      }
    };

    fetchData();
  });

  if (isError) {
    console.log('Error in isError');
    console.log(isError);
  }

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  const gotoSignOut = () => {
    navigate('/logout');
  };

  const selectAge = (event: AgeTypes) => {
    const selectedValue = event as AgeTypes;
    if (Object.values(AgeTypes).includes(selectedValue as AgeTypes)) {
      dispatch(ageReducers(selectedValue));
    } else {
      console.error('Invalid age type selected');
    }
  };
  const selectGender = (event: Gender) => {
    const selectedValue = event as Gender;
    if (Object.values(Gender).includes(selectedValue as Gender)) {
      dispatch(genderReducers(selectedValue));
    } else {
      console.error('Invalid age type selected');
    }
  };
  const ageOption = Object.values(AgeTypes);
  const genderOption = Object.values(Gender);

  const setDate: SelectRangeEventHandler = (range) => {
    if (range) {
      if (range.from && !range.to) {
        dispatch(
          dateReducers({
            from: range.from.toISOString(),
            to: range.from.toISOString()
          })
        );
      } else if (!range.from && range.to) {
        dispatch(
          dateReducers({
            from: range.to.toISOString(),
            to: range.to.toISOString()
          })
        );
      } else if (range.from && range.to) {
        dispatch(
          dateReducers({
            from: range.from.toISOString(),
            to: range.to.toISOString()
          })
        );
      }
    }
  };

  return (
    <>
      <PageHead title="Dashboard" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back {data?.data.fullname} 👋
          </h2>
          <Button onClick={() => gotoSignOut()}>Sign Out</Button>
        </div>
        <div>
          <Select value={reduxData.age} onValueChange={selectAge}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {ageOption.map((age) => (
                  <SelectItem key={age} value={age}>
                    {age}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={reduxData.gender} onValueChange={selectGender}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {genderOption.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Popover>
            <div className="flex">
              <PopoverTrigger asChild>
                <Button variant="outline">Open Calander</Button>
              </PopoverTrigger>
              <p>
                {formatDate(date.from) || 'Start date'} to{' '}
                {formatDate(date.to) || 'End date'}
              </p>
            </div>
            <PopoverContent className="p-0">
              <Calendar
                mode="range"
                selected={{ from: new Date(date.from), to: new Date(date.to) }}
                onSelect={setDate}
                defaultMonth={new Date(date.from)}
                className="rounded-md border shadow"
                footer={
                  date ? (
                    <p>
                      {formatDate(date.from) || 'Start date'} to{' '}
                      {formatDate(date.to) || 'End date'}
                    </p>
                  ) : (
                    <p>Please select a date range.</p>
                  )
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            <BarChart />
          </div>
          <div className="w-full">
            <LineChart />
          </div>
        </div>
        <GenerateLink />
      </div>
    </>
  );
}
