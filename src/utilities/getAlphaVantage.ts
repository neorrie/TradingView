import axios from "axios";

const API_KEY = "NEPWE9QP0FYVPZ70";

type Candlestick = {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
