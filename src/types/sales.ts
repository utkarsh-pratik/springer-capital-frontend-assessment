export interface SalesDataItem {
    id: string;
    date: string;
    year: number;
    month: number;
    day: number;
    sales: number;
    quantity: number;
    category: string;
    product: string;
    region: string;
    customer: string;
    paymentMethod: string;
    discount: number;
    cost: number;
    profit: number;
  }
  
  export type ChartType = "bar" | "line" | "pie";
  export type AggregationPeriod = "monthly" | "quarterly" | "yearly";