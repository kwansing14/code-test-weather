import { WeatherDataProp } from '@/pages';
import { getTimeDate } from '@/helper';
import { MdSearch, MdDelete } from 'react-icons/md';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface RecordsProp {
  records: WeatherDataProp[];
  weatherData: WeatherDataProp | undefined;
  setWeatherData: (data: WeatherDataProp) => void;
  setRecords: (data: WeatherDataProp[]) => void;
}
const Records: React.FC<RecordsProp> = ({
  records,
  setRecords,
  weatherData,
  setWeatherData,
}) => {
  const [animationParent] = useAutoAnimate();

  const searchHandler = (index: number) => {
    setWeatherData(records[index]);
  };
  const deleteHandler = (index: number) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
    if (records[index].id === weatherData?.id) {
      setWeatherData(newRecords[0]);
    }
  };

  return (
    <div className='w-full rounded-[24px] bg-[rgba(255,255,255,0.2)] px-[17px] md:px-[26px] py-[23px] mt-[26px]'>
      <div>Search History</div>
      <div className='flex flex-col mt-[26px] gap-[18px]' ref={animationParent}>
        {records.map((record: WeatherDataProp, i: number) => (
          <div
            key={i}
            className='flex justify-between items-center bg-[rgba(255,255,255,0.4)] p-[10px] md:p-[21px] pr-[15px] rounded-[16px]'
          >
            <div className='flex flex-col md:flex-row justify-between w-full pr-2'>
              <div>
                {record.name}, {record.sys.country}
              </div>
              <div className='flex items-center gap-3 text-[10px] md:text-base'>
                <div>{getTimeDate(record.dt)}</div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div
                className='h-[34px] w-[34px] rounded-full flex justify-center items-center bg-white cursor-pointer'
                onClick={() => searchHandler(i)}
              >
                <MdSearch />
              </div>
              <div
                className='h-[34px] w-[34px] rounded-full flex justify-center items-center  bg-white cursor-pointer'
                onClick={() => deleteHandler(i)}
              >
                <MdDelete />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Records;
