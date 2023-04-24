import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { UseMutationResult } from 'react-query';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Prop {
  mutation: UseMutationResult<Response, unknown, string, unknown>;
}

const SearchBar: React.FC<Prop> = ({ mutation }) => {
  const [animationParent] = useAutoAnimate();
  const [country, setCountry] = useState<string>('');
  const searchHandler = () => {
    country && mutation.mutate(country);
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };
  return (
    <div ref={animationParent}>
      <div className='flex h-[40px] md:h-[60px] gap-[10px] md:gap-[20px] mt-[19px] md:mt-[26px] relative'>
        <input
          className='text-[12px] md:text-base w-[calc(100%-40px)] md:w-[590px] rounded-[8px] md:rounded-[20px] bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(26,26,26,0.5)] outline-none px-[11px] md:px-[22px]'
          onChange={inputHandler}
        />
        <span className='absolute top-[6px] left-[11px] md:left-[22px] opacity-40 text-[8px] md:text-[10px] leading-[13.62px]'>
          Country
        </span>
        <div
          className='h-[40px] md:h-[60px] w-[40px] md:w-[60px] rounded-[8px] md:rounded-[20px] bg-[#6C40B5] dark:bg-[#28124D] flex justify-center items-center text-white'
          onClick={searchHandler}
        >
          <MdSearch className='text-[25px] md:text-[32px]' />
        </div>
      </div>
      {mutation.isError && (
        <div className='text-sm bg-red-200 rounded-lg py-2 px-[11px] md:px-[22px] mt-4'>
          Error:{' '}
          <span className=' text-red-700'>
            &apos;{mutation.variables}&apos;
          </span>{' '}
          cannot be found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
