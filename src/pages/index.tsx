import { useState, useEffect } from 'react';
import { Noto_Sans } from 'next/font/google';
import { useMutation } from 'react-query';
import Cloud from '@/components/Cloud';
import Records from '@/components/Records';
import SearchBar from '@/components/SearchBar';
import Body from '@/components/Body';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const notoSans = Noto_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export interface WeatherDataProp {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;

    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherDataProp>();
  const [records, setRecords] = useState<WeatherDataProp[]>([]);

  const [animationParent] = useAutoAnimate();
  // api mutation
  const mutation = useMutation({
    mutationFn: (country: string) => fetch(`/api/getWeather/${country}`),
    onSuccess: async (data) => {
      const res = await data.json();
      setWeatherData(res);
      setRecords((prev) => [...prev, res]);
    },
  });

  //localstorage storing
  useEffect(() => {
    if (records.length > 0) {
      localStorage.setItem('weatherData', JSON.stringify(records));
    }
  }, [records]);

  useEffect(() => {
    const data = localStorage.getItem('weatherData');
    if (!data) return;
    const res = JSON.parse(data) as WeatherDataProp[];
    setWeatherData(res[0]);
    setRecords(res);
  }, []);

  return (
    <main className='min-h-screen bg-[url("/assets/bg-light.png")] text-black'>
      <div
        className={
          'px-[15px] mx-auto w-full md:max-w-[700px]' + ` ${notoSans.className}`
        }
      >
        <div className='flex flex-col'>
          <SearchBar mutation={mutation} />
          <div className='mt-[112px] mb-[80px] bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] rounded-[40px] relative'>
            <div
              className='flex flex-col px-[20px] md:px-[50px] py-[20px] md:py-[46px]'
              ref={animationParent}
            >
              {weatherData && <Body weatherData={weatherData} />}
              <Records
                weatherData={weatherData}
                records={records}
                setWeatherData={setWeatherData}
                setRecords={setRecords}
              />
            </div>
            <Cloud />
          </div>
        </div>
      </div>
    </main>
  );
}
