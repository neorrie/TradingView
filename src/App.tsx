import { useEffect, useRef, useState } from "react";
import { parseCSV } from "./utilities/parseCSV";
import { createChart, CandlestickSeries } from "lightweight-charts";

type BarData = {
  open: number;
  high: number;
  low: number;
  close: number;
  time: string;
};

function App() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [candlePrice, setCandlePrice] = useState<BarData | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          textColor: "#DDD",
          background: { color: "#242424" },
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
        width: 900,
        height: 450,
      });

      const newSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      chart.timeScale().applyOptions({
        timeVisible: true,
      });

      // data goes here
      const candlestickData = [
        {
          time: "2025-07-08",
          open: 180.34,
          high: 180.99,
          low: 178.57,
          close: 179.85,
        },
      ];
      newSeries.setData(candlestickData);

      // hover
      chart.subscribeCrosshairMove((param) => {
        const data = param.seriesData.get(newSeries);
        if (data !== undefined) {
          setCandlePrice(data as BarData);
        } else {
          setCandlePrice(null);
        }
      });

      return () => chart.remove();
    }
  }, []);

  return (
    <div>
      <h1>Trading Dashboard</h1>
      <div ref={chartContainerRef}></div>
      <div>additional information </div>
      <div>
        <div>OPEN: {candlePrice?.open}</div>
        <div>HIGH: {candlePrice?.high}</div>
        <div>LOW: {candlePrice?.low}</div>
        <div>CLOSE: {candlePrice?.close}</div>
      </div>
    </div>
  );
}

export default App;
