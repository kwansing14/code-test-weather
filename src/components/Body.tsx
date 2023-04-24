import { getTimeDate, getTemp } from '@/helper';
import { WeatherDataProp } from '@/pages';

interface Prop {
  weatherData: WeatherDataProp | undefined;
}

const Body: React.FC<Prop> = ({ weatherData }) => {
  return (
    <>
      {weatherData && (
        <div className='flex justify-between'>
          <div>
            <div className='text-[16px] leading-[21.79px] whitespace-nowrap'>
              {"Today's Weather"}
            </div>
            <div className='text-[60px] md:text-[120px] font-bold text-[#6C40B5] dark:text-white leading-[60px] md:leading-[120px] mt-[6px]'>
              {getTemp(weatherData.main.temp)}°
            </div>
            <div className='flex gap-2 mt-[10px]'>
              <div>H: {getTemp(weatherData.main.temp_max)}°</div>
              <div>L: {getTemp(weatherData.main.temp_min)}°</div>
            </div>
            <div className='text-[#666666] font-bold mt-[10px] dark:text-white'>
              {weatherData.name},{weatherData.sys.country}
            </div>
          </div>
          <div className='flex flex-col-reverse md:flex-row w-full md:justify-between items-end gap-1'>
            <div className='text-[#666666] dark:text-white'>
              {getTimeDate(weatherData.dt)}
            </div>
            <div className='text-[#666666] dark:text-white'>
              Humidity: {weatherData.main.humidity}%
            </div>
            <div className='text-[#666666] dark:text-white'>
              {weatherData.weather[0].main}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
