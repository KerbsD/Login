import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import '../index.css';

function Time() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => setValue(new Date()), 1000);
  
      return () => {
        clearInterval(interval);
      };    
    }, []);
  
    return (
      <div className='flex flex-col items-center justify-center'> 
        <Clock size={200} value={value}/>
         <h2 className='font-extralight text-xl'>{value.toLocaleTimeString()}</h2>
      </div>
    );
}

export default Time;