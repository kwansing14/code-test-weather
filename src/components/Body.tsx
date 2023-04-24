import { getTimeDate, getTemp } from '@/helper';
import { WeatherDataProp } from '@/pages';

interface Prop {
  weatherData: WeatherDataProp;
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
            <div className='text-[60px] md:text-[120px] font-bold text-[#6C40B5] leading-[60px] md:leading-[120px] mt-[6px]'>
              {getTemp(weatherData.main.temp)}°
            </div>
            <div className='flex gap-2 mt-[10px]'>
              <div>H: {getTemp(weatherData.main.temp_max)}°</div>
              <div>L: {getTemp(weatherData.main.temp_min)}°</div>
            </div>
            <div className='text-[#666666] font-bold mt-[10px]'>
              {weatherData.name},{weatherData.sys.country}
            </div>
          </div>
          <div className='flex flex-col-reverse md:flex-row w-full md:justify-between -ml-[60px] items-end gap-1'>
            <div className='text-[#666666]'>{getTimeDate(weatherData.dt)}</div>
            <div className='text-[#666666]'>
              Humidity: {weatherData.main.humidity}%
            </div>
            <div className='text-[#666666]'>{weatherData.weather[0].main}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
