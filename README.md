# Sales Dashboard Application

A modern sales analytics dashboard built with Next.js 15, TypeScript, and Tailwind CSS, featuring interactive charts and comprehensive year-based filtering. This project demonstrates atomic design principles, clean architecture, and data visualization best practices.

## 🚀 Features

- **Interactive Sales Dashboard** - Visualize sales data across three years (2022-2024)
- **Multiple Chart Types** - Line charts for trends, pie charts for category breakdown, bar charts for regional analysis
- **Dynamic Filtering** - Filter by year, toggle between monthly/quarterly views, and set custom sales thresholds
- **Atomic Design Pattern** - Components organized using atomic design principles for maximum reusability
- **Responsive Design** - Modern, clean UI that adapts to all screen sizes
- **Real-time Calculations** - KPIs update instantly based on selected filters
- **Custom Sales Threshold** - Filter transactions above specific sales amounts

## 📊 What I Built

### 1. Component Architecture (Atomic Design)
src/components/ ├── atoms/ # Basic building blocks │ ├── KpiCard.tsx # Reusable KPI display cards │ └── ChartCard.tsx # Wrapper for chart components ├── molecules/ # Simple component combinations │ ├── LineChart.tsx # SVG-based line chart │ ├── PieChart.tsx # SVG-based pie chart │ └── BarChart.tsx # SVG-based bar chart └── organisms/ # Complex feature components └── ControlPanel.tsx # Year and period selection controls

### 2. Data Generation & Management

- **Realistic Mock Data**: 540+ transactions spanning 2022-2024
- **5 Product Categories**: Electronics, Clothing, Home & Garden, Sports, Books
- **4 Geographic Regions**: North, South, East, West
- **Rich Metadata**: Includes customer names, payment methods, discounts, costs, and profit calculations
- **Data inspired by**: Kaggle sales datasets with realistic pricing structures

### 3. Pages Structure

#### Landing Page (`/`)
- **Purpose**: Executive overview and quick insights
- **Features**:
  - 3 Key Performance Indicators (KPIs) with YoY growth
  - Sales trend line chart
  - Category breakdown pie chart
  - Regional performance bar chart
  - Year and period selectors

#### Dashboard Page (`/dashboard`)
- **Purpose**: Detailed analytics with advanced filtering
- **Features**:
  - Custom sales threshold input
  - Full-width sales trend visualization
  - Side-by-side category and regional analysis
  - Real-time data summary panel showing filtered metrics
  - All filters work dynamically together

### 4. Enhancements Implemented

✅ **Custom Filter Input** - Sales threshold filter on dashboard page  
✅ **Multiple Chart Types** - Line, bar, and pie charts with different use cases  
✅ **Year Selection** - Switch between 2022, 2023, and 2024  
✅ **Period Toggle** - View data by month or quarter  
⚠️ **API Integration** - Architecture ready for API implementation (currently uses mock data)

## 🛠 Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Recharts

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.1.4 | React framework with App Router |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | 4.0.0 | Utility-first styling |
| **React** | 19.x | UI library |
| **Lucide React** | Latest | Icon system |

### Why These Choices?

- **Next.js 15**: Latest features, App Router for better architecture, built-in optimization
- **TypeScript**: Type safety prevents bugs, better IDE support, improved maintainability
- **Tailwind v4**: Modern utility-first CSS, consistent design system, minimal bundle size
- **Custom SVG Charts**: Zero external chart dependencies, full control over rendering, lightweight

## 📁 Data Source
Sales data is mock data inspired by Kaggle’s Sample Superstore dataset and structured for frontend visualization.

## 📦 Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js**: v18.18.0 or higher
- **npm**: v9.0.0 or higher (or yarn/pnpm)

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd springer-capital-frontend-assessment
```
Install dependencies
```bash
npm install
```
Run the development server
```bash
npm run dev
```
Open your browser Navigate to http://localhost:3000
Build for Production
```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

Other Commands
```bash
# Run ESLint
npm run lint

# Run type checking
npx tsc --noEmit
```
## 📁 Project Structure

```
springer-capital-frontend-assessment/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard page with advanced filters
│   │   ├── layout.tsx             # Root layout with global styles
│   │   ├── page.tsx               # Landing page with overview
│   │   └── globals.css            # Tailwind imports and global styles
│   ├── components/
│   │   ├── atoms/                 # Basic reusable components
│   │   │   ├── KpiCard.tsx
│   │   │   └── ChartCard.tsx
│   │   ├── molecules/             # Composite components
│   │   │   ├── LineChart.tsx
│   │   │   ├── PieChart.tsx
│   │   │   └── BarChart.tsx
│   │   └── organisms/             # Complex feature components
│   │       └── ControlPanel.tsx
│   ├── data/
│   │   └── salesData.ts           # Mock sales data generator
│   └── types/
│       └── sales.ts               # TypeScript interfaces
├── tailwind.config.ts             # Tailwind configuration
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── eslint.config.mjs              # ESLint rules
├── postcss.config.mjs             # PostCSS for Tailwind
└── package.json                   # Dependencies and scripts
```

🌍 Live Demo

👉 <https://springer-capital-frontend-assessmen-kappa.vercel.app/>

💻 GitHub Repository

👉 <https://github.com/utkarsh-pratik/springer-capital-frontend-assessment.git>