"use client"; 

// Import necessary hooks from React
import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DigitalClockComponent() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true); 
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); 
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; 
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") 
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); 
    const minutes = time.getMinutes().toString().padStart(2, "0"); 
    const seconds = time.getSeconds().toString().padStart(2, "0"); 
    return `${hours}:${minutes}:${seconds}`; 
  }, [time, is24Hour, mounted]); 

  return (
    <div className="flex items-center justify-center h-screen bg-blue-900">
     <div className="relative p-4 rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-blue-950 animate-border rounded-lg border-[3px] border-transparent"></div>
        <Card className=" border-none relative z-10 p-10 bg-blue-300 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold tracking-tight">DIGITAL CLOCK</div>
            <div className="text-sm text-black mb-4">
              Display current time in hours, minutes, and seconds.
            </div>
            <div className="text-6xl font-bold tracking-tight">{formattedTime}</div>
            <div className="mt-4 flex items-center">
              <Button
                onClick={() => setIs24Hour(true)}
                className="mr-2 font-bold bg-blue-500 text-black hover:bg-blue-600 rounded-full"
              >
                24-Hour Format
              </Button>
              <Button
                onClick={() => setIs24Hour(false)}
                className="mr-2 font-bold bg-blue-500 text-black hover:bg-blue-600 rounded-full"
              >
                12-Hour Format
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}