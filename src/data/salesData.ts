import { SalesDataItem } from "@/types/sales";

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"];
const products = {
  Electronics: ["Laptop", "Smartphone", "Headphones", "Tablet", "Smartwatch"],
  Clothing: ["T-Shirt", "Jeans", "Jacket", "Sneakers", "Dress"],
  "Home & Garden": ["Furniture", "Plants", "Kitchen Set", "Bedding", "Decor"],
  Sports: ["Running Shoes", "Yoga Mat", "Bicycle", "Dumbbells", "Tennis Racket"],
  Books: ["Fiction Novel", "Cookbook", "Biography", "Self-Help", "Textbook"],
};
const regions = ["North", "South", "East", "West"];
const customers = [
  "John Smith",
  "Emma Johnson",
  "Michael Brown",
  "Sophia Davis",
  "William Wilson",
  "Olivia Martinez",
  "James Anderson",
  "Ava Taylor",
  "Robert Thomas",
  "Isabella Moore",
];
const paymentMethods = ["Credit Card", "Debit Card", "PayPal", "Cash"];

// Generate realistic sales data
function generateSalesData(): SalesDataItem[] {
  const data: SalesDataItem[] = [];
  let id = 1;

  // Generate data for 2022, 2023, and 2024
  [2022, 2023, 2024].forEach((year) => {
    // Generate 12 months of data
    for (let month = 1; month <= 12; month++) {
      // Generate 15-25 transactions per month
      const transactionsPerMonth = Math.floor(Math.random() * 11) + 15;

      for (let i = 0; i < transactionsPerMonth; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const product =
          products[category as keyof typeof products][
            Math.floor(Math.random() * products[category as keyof typeof products].length)
          ];
        const region = regions[Math.floor(Math.random() * regions.length)];
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

        // Generate realistic pricing based on category
        let basePrice: number;
        switch (category) {
          case "Electronics":
            basePrice = Math.floor(Math.random() * 1500) + 500;
            break;
          case "Clothing":
            basePrice = Math.floor(Math.random() * 150) + 50;
            break;
          case "Home & Garden":
            basePrice = Math.floor(Math.random() * 800) + 200;
            break;
          case "Sports":
            basePrice = Math.floor(Math.random() * 300) + 100;
            break;
          case "Books":
            basePrice = Math.floor(Math.random() * 50) + 10;
            break;
          default:
            basePrice = 100;
        }

        const quantity = Math.floor(Math.random() * 5) + 1;
        const discount = (id % 10 > 7) ? ((id % 20) + 5) : 0;
        const sales = Math.floor(basePrice * quantity * (1 - discount / 100));
        const cost = Math.floor(sales * 0.6); // 60% cost ratio
        const profit = sales - cost;

        const daysInMonth = new Date(year, month, 0).getDate();
        const day = Math.floor(Math.random() * daysInMonth) + 1;

        data.push({
          id: `TXN-${String(id).padStart(6, "0")}`,
          date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
          year,
          month,
          day,
          sales,
          quantity,
          category,
          product,
          region,
          customer,
          paymentMethod,
          discount,
          cost,
          profit,
        });

        id++;
      }
    }
  });

  // Sort by date
  return data.sort((a, b) => a.date.localeCompare(b.date));
}

export const salesData: SalesDataItem[] = generateSalesData();

// Utility functions for data analysis
export const getSalesDataByYear = (year: number): SalesDataItem[] => {
  return salesData.filter((item) => item.year === year);
};

export const getSalesDataByCategory = (category: string): SalesDataItem[] => {
  return salesData.filter((item) => item.category === category);
};

export const getSalesDataByRegion = (region: string): SalesDataItem[] => {
  return salesData.filter((item) => item.region === region);
};

export const getTotalSales = (data: SalesDataItem[]): number => {
  return data.reduce((sum, item) => sum + item.sales, 0);
};

export const getTotalProfit = (data: SalesDataItem[]): number => {
  return data.reduce((sum, item) => sum + item.profit, 0);
};

export const getAverageSales = (data: SalesDataItem[]): number => {
  return data.length > 0 ? getTotalSales(data) / data.length : 0;
};

export const getTopCategories = (data: SalesDataItem[], limit: number = 5) => {
  const categoryMap = new Map<string, number>();
  data.forEach((item) => {
    categoryMap.set(item.category, (categoryMap.get(item.category) || 0) + item.sales);
  });

  return Array.from(categoryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([category, sales]) => ({ category, sales }));
};

export const getTopRegions = (data: SalesDataItem[], limit: number = 4) => {
  const regionMap = new Map<string, number>();
  data.forEach((item) => {
    regionMap.set(item.region, (regionMap.get(item.region) || 0) + item.sales);
  });

  return Array.from(regionMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([region, sales]) => ({ region, sales }));
};