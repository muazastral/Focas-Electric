import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { STATS } from '../constants';

const data = [
  { name: 'A', value: 40 },
  { name: 'B', value: 30 },
  { name: 'C', value: 20 },
  { name: 'D', value: 27 },
  { name: 'E', value: 18 },
  { name: 'F', value: 23 },
  { name: 'G', value: 34 },
];

export const Metrics: React.FC = () => {
  return (
    <section className="py-20 relative bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Electrical Supply, <br />
              <span className="text-red-600 dark:text-red-400">Made Reliable</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
               We track our performance to ensure your projects never stop. High availability and rapid local delivery define our service.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 transition-colors">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative glass-panel rounded-2xl p-8 h-[400px] flex flex-col justify-between shadow-xl dark:shadow-none">
            <div className="mb-4">
               <h3 className="text-lg font-medium text-slate-900 dark:text-white">Stock Availability Trend</h3>
               <p className="text-sm text-slate-500 dark:text-slate-400">Monthly optimized inventory levels</p>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        className={index % 2 === 0 ? "fill-red-500 dark:fill-red-500" : "fill-slate-300 dark:fill-slate-700"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex justify-between items-end border-t border-slate-200 dark:border-slate-700 pt-4">
              <div>
                <p className="text-xs text-slate-500 uppercase">Current Status</p>
                <p className="text-green-600 dark:text-green-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></span>
                  Operational
                </p>
              </div>
              <div className="text-right">
                 <p className="text-2xl font-bold text-slate-900 dark:text-white">99.9%</p>
                 <p className="text-xs text-slate-500">Uptime</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};