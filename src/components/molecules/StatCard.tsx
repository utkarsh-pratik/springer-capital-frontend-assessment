// src/components/molecules/StatCard.tsx

import { motion, Variants } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <p className="truncate text-sm font-medium text-slate-500">{title}</p>
        {icon}
      </div>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </motion.div>
  );
}
