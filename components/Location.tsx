import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { Button } from './Button';

export const Location: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-cyan-50 dark:bg-cyan-900/5 opacity-50 skew-y-3 transform origin-bottom-right"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Visit Our Retail & <br/>
                Trade Store in Semambu
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
                Our physical store at Semambu Industrial Area serves walk-in customers, contractors, and businesses with ready stock and technical assistance.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mt-1" />
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold">Semambu Industrial Area</h4>
                    <p className="text-slate-600 dark:text-slate-400">Lot 123, Jalan Industri Semambu 5,<br/>25300 Kuantan, Pahang.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mt-1" />
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold">Opening Hours</h4>
                    <p className="text-slate-600 dark:text-slate-400">Mon - Fri: 8:30 AM - 5:30 PM</p>
                    <p className="text-slate-600 dark:text-slate-400">Sat: 8:30 AM - 1:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mt-1" />
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-semibold">Contact</h4>
                    <p className="text-slate-600 dark:text-slate-400">+60 9-555 1234</p>
                  </div>
                </div>
              </div>

              <Button variant="primary">Get Directions</Button>
            </div>

            <div className="h-[400px] lg:h-auto bg-slate-100 dark:bg-slate-800 relative">
              <img 
                src="https://picsum.photos/1000/1000?grayscale&blur=2" 
                alt="Store Map" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="secondary" className="bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-black backdrop-blur-sm">View on Google Maps</Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};