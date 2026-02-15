import React from 'react';
import { Button } from './Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
          Let’s Power Your <br/>
          <span className="gradient-text">Next Project</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
          Whether you need a single socket or a full project supply, our team is ready to assist.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto">Request Quotation</Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">Contact Us</Button>
        </div>
      </div>
    </section>
  );
};