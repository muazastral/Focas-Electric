import React from 'react';
import { SERVICES_LIST } from '../constants';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              More Than Supply — <br />
              We Support Your <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Our team provides more than just products. We support your workflow from planning to delivery.
            </p>
          </div>
          <Button>Talk to Our Team</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm dark:shadow-none">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};