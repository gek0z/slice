"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ToppingItemProps {
  name: string;
  percentage: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function ToppingItem({
  name,
  percentage,
  isSelected,
  onSelect,
}: ToppingItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-2 border rounded-md cursor-pointer transition-colors ${
        isSelected
          ? "border-red-500 bg-red-50"
          : "border-gray-200 hover:border-red-200"
      } `}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src={`/images/toppings/${name
                .toLowerCase()
                .replace(/\s+/g, "-")}.png`}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="text-xs text-gray-500">{percentage}%</span>
      </div>
    </motion.div>
  );
}
