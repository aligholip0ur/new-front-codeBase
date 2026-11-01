import { useState, useEffect } from 'react';

interface WindowSize {
  clientWidth: number;
  clientHeight: number;
}

const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    clientWidth: window.innerWidth,
    clientHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        clientWidth: window.innerWidth,
        clientHeight: window.innerHeight,
      });
    };

    // اضافه کردن event listener برای تغییر اندازه
    window.addEventListener('resize', handleResize);

    // حذف event listener هنگام unmount شدن کامپوننت
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
