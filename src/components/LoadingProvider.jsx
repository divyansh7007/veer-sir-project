"use client";

import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

const LoadingProvider = () => {


  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  


  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
        setProgress(100);
    }, 1500);
  }, [pathname]);

  return (
    <LoadingBar
      color="#32de84"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default LoadingProvider;
