import Image from 'next/image';
const Cloud = () => {
  return (
    <div className='absolute  -top-[35px] md:-top-[71px] right-0'>
      <Image
        src='/assets/sun.png'
        width={281}
        height={251}
        className='w-[147px] md:w-[281px] h-[131px] md:h-[251px]'
        alt='cloud'
      />
    </div>
  );
};

export default Cloud;
