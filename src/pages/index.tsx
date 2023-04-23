import { useState } from 'react';
import Image from 'next/image';
import { Noto_Sans } from 'next/font/google';
import { MdSearch } from 'react-icons/md';
import { useMutation } from 'react-query';

const notoSans = Noto_Sans({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const [country, setCountry] = useState('');

  const mutation = useMutation({
    mutationFn: (country: string) => {
      return fetch(`/api/getWeather/${country}`);
    },
  });

  const searchHandler = () => {
    mutation.mutate(country);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  return (
    <main className='min-h-screen bg-[url("/assets/bg-light.png")] text-black'>
      <div className={'mx-auto max-w-[700px]' + ` ${notoSans.className}`}>
        <div className='flex flex-col'>
          <div className='flex h-[60px] gap-[20px] mt-[26px] relative'>
            <input
              className='w-[620px] rounded-[20px] bg-[rgba(255,255,255,0.2)] outline-none px-[22px]'
              onChange={inputHandler}
            />
            <span className='absolute top-[3px] left-[22px] opacity-40 text-[10px] leading-[13.62px]'>
              Country
            </span>
            <button
              className='h-[60px] w-[60px] rounded-[20px] bg-[#6C40B5] flex justify-center items-center text-white'
              onClick={searchHandler}
            >
              <MdSearch size={34} />
            </button>
          </div>
          <div className='mt-[112px] bg-[(rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] rounded-[40px]'>
            <div className='flex flex-col px-[50px] py-[46px]'>
              <div className='text-[16px] leading-[21.79px]'>
                {"Today's Weather"}
              </div>
              <div className='mt-[18px]'>
                <Image
                  src='/assets/26.svg'
                  width={164}
                  height={81}
                  alt='temperature'
                />
              </div>
              <div>29 hz</div>
              <div>
                <div>Johor, MY</div>
                <div>01-09-2022 09:41am</div>
                <div>Humidity: 58%</div>
                <div>Clouds</div>
              </div>
              <div className='w-[620px] rounded-[24px] bg-[rgba(255,255,255,0.2)] px-[26px] py-[23px] mt-[26px]'>
                <div>Search History</div>
                <div className='flex flex-col'>
                  <div>ok</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
