export interface Trade {
  trade_id: number;
  symbol: string;
  entry_time: string;
  entry_price: number;
  stop_loss_price: number;
  exit_price: number;
  exit_time: string;
  pnl_amount: number;
  pnl_pct: number; // decided to store as a float like -2.53 for now, not rly sure what to do with it yet
  quantity: number;
}

export function parseCSV(csvText: string): Trade[] {
  const lines = csvText.trim().split("\n").slice(1);

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    return {
      trade_id: parseInt(values[0]),
      symbol: values[1],
      entry_time: values[2],
      entry_price: parseFloat(values[3]),
      stop_loss_price: parseFloat(values[4]),
      exit_price: parseFloat(values[5]),
      exit_time: values[6],
      pnl_amount: parseFloat(values[7]),
      pnl_pct: parseFloat(values[8].replace("%", "")), // convert "-2.53%" to -2.53
      quantity: parseInt(values[9]),
    };
  });
}
