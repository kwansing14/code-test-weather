import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (resolvedTheme === 'dark') setTheme('dark');
    if (resolvedTheme === 'light') setTheme('light');
  }, [resolvedTheme, setTheme]);

  // use mounted to solve hydration error some weird theme bug
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='flex justify-end'>
      <button className='flex h-16 items-center pr-8' onClick={handleClick}>
        {mounted && (
          <div className='flex animate-fade-in items-center gap-2'>
            {theme === 'dark' ? 'Dark' : 'Light'}
            {theme === 'dark' ? <MdDarkMode /> : <MdLightMode />}
          </div>
        )}
      </button>
    </div>
  );
};

export default ThemeSwitch;
