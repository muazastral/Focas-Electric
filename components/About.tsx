import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Package, 
  Truck, 
  Award, 
  MapPin, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Factory,
  Home,
  Building2,
  HardHat,
  PenTool,
  Landmark,
  Zap,
  Target,
  Eye,
  Phone,
  Mail,
  Map,
  ExternalLink
} from 'lucide-react';
import { Button } from './Button';

const FAQs = [
  {
    question: "What is Focus Electrical Malaysia Sdn Bhd?",
    answer: "Focus Electrical Malaysia Sdn Bhd is an electrical and electronic product supplier providing certified products for residential, commercial, and industrial use in Malaysia."
  },
  {
    question: "Do you sell to individual homeowners?",
    answer: "Yes. We welcome both walk-in retail customers and business buyers, including homeowners, contractors, and companies."
  },
  {
    question: "Do you support bulk or project orders?",
    answer: "Yes. We provide special pricing, quotation support, and sourcing assistance for bulk and project-based purchases."
  },
  {
    question: "What brands do you carry?",
    answer: "We supply products from trusted brands including Panasonic, KDK, Schneider Electric, Legrand, Bosch, SJ Lite, Hitachi, and many more."
  },
  {
    question: "Do you provide installation services?",
    answer: "We focus on product supply and technical consultation. However, we can recommend suitable contractors depending on your project needs."
  },
  {
    question: "Where is your store located?",
    answer: "Our retail & trade store is located in Semambu Industrial Area, Malaysia."
  },
  {
    question: "Do you offer delivery services?",
    answer: "Yes. We provide delivery support for local and project orders depending on quantity and location."
  },
  {
    question: "How can I request a quotation?",
    answer: "You can contact our team via our website contact form, phone, email, or by visiting our store directly."
  },
  {
    question: "Are your products certified and compliant with Malaysian standards?",
    answer: "Yes. We prioritize certified products that comply with local safety and quality standards."
  }
];

const BRANCHES = [
  {
    name: "Head Office (Semambu)",
    address: "Lot 110 & 111, Jalan Industri Semambu 6, Kawasan Perindustrian Semambu, 25300 Kuantan, Pahang Darul Makmur",
    tel: "09-560 6188 / 89 (Sales Dept)",
    fax: "09-560 6184",
    emails: ["sales@focuselectrical.com.my", "account@focuselectrical.com.my"],
    mapLink: "https://goo.gl/maps/uiM1wAZzNL1nmcTRA"
  },
  {
    name: "Kuantan Branch Sales",
    address: "C-710, Ground Floor, Jalan Dato Lim Hoe Lek, 25200 Kuantan, Pahang Darul Makmur.",
    tel: "09-5157980",
    fax: "09-560 6184",
    emails: ["sales@focuselectrical.com.my", "account@focuselectrical.com.my"],
    mapLink: "https://goo.gl/maps/UnKoNB9SoRoQ4upD8"
  },
  {
    name: "Kuantan - Balok Branch",
    address: "A7, Ground Floor Lorong Baluk Darat 13, Perumahan Baluk Darat Balok, 26100 Kuantan, Pahang",
    tel: "-", 
    fax: "09-560 6184",
    emails: ["sales@focuselectrical.com.my", "account@focuselectrical.com.my"],
    mapLink: "https://maps.app.goo.gl/XxsFwVrhxXZkBiUaA"
  },
  {
    name: "Selangor - Batu Caves Branch",
    address: "No.6, Jalan SBC 9, Taman Sri Batu Caves, 68100 Batu Caves, Selangor Darul Ehsan.",
    tel: "03-6188 5317 / 9317",
    fax: "09-560 6184",
    emails: ["sales@focuselectrical.com.my", "account@focuselectrical.com.my"],
    mapLink: "https://g.page/focus-electrical-malaysia-sdn--b?share"
  },
  {
    name: "Terengganu - Chukai Branch",
    address: "Lot PT 17378, Ground Floor, Jalan Persiaran Jakar, Jakar, 24000 Chukai, Terengganu.",
    tel: "09-858 7362",
    fax: "09-560 6184",
    emails: ["sales@focuselectrical.com.my", "account@focuselectrical.com.my"],
    mapLink: "https://goo.gl/maps/XYU2t9Vc9R1Gnduq6"
  },
  {
    name: "Kuantan - Taman Tas Branch",
    address: "B-24 & B-26, Ground Floor, Lrg Pandan Damai 2/2, Taman Pandan Permai, Jalan Gambang, 25150 Kuantan, Pahang Darul Makmur.",
    tel: "09-553 6002",
    fax: "09-560 6184",
    emails: ["sales@focuselectrical.com.my", "account@focuselectrical.com.my"],
    mapLink: "https://goo.gl/maps/gykBC7oUSskdiciK7"
  }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      <button 
        className="flex justify-between items-center w-full px-6 py-5 text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-bold text-slate-900 dark:text-white pr-8">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-2">
          {answer}
        </div>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <div className="pt-20 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-100/40 via-transparent to-transparent dark:from-cyan-900/20 dark:via-transparent dark:to-transparent opacity-70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
            About Focus Electrical
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Powering Malaysia with <br className="hidden md:block"/>
            <span className="text-cyan-600 dark:text-cyan-400">Trusted Electrical Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Focus Electrical Malaysia Sdn Bhd is a trusted electrical and electronic product supplier serving residential, commercial, and industrial customers across Malaysia.
          </p>
        </div>
      </section>

      {/* Who We Are & Mission/Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Who We Are Section (Centered Text) */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Who We Are</h2>
            </div>
            <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed space-y-4 text-justify mx-auto">
              <p>
                <strong>FOCUS ELECTRICAL MALAYSIA SDN. BHD.</strong> was incorporated on July 2000. The company was set up primarily to supply electrical and electronic goods to the contractor, factory, developers, wireman, end users and etc. The company has tied up joint partnership arrangements with established fully owned private company in local electrical fields.
              </p>
              <p>
                Being a relatively young set-up, the company emphasizes on transparent, flexible and pro active dealings. The core team charting the growth of the company comprises of a select few professionals who have many years of experience and expertise in both engineering and electrical fields.
              </p>
              <p>
                In line with the national aspiration to create successful business, all shareholders of the company are committed to build the company over time into an excellent electrical goods provider that can compete in a level playing field. In addition it wishes to establish itself as a Malaysian company with a solid reputation in this industry.
              </p>
              <p>
                Currently the company is targeting potential customers in the selected sectors i.e. construction, services, oil & gas, manufacturing and retail. The company aims to develop a number of revenue streams from local outsourcing, providing professional services and supplying niche products.
              </p>
            </div>
          </div>

          {/* Mission & Vision Section (Underneath) */}
          <div className="max-w-4xl mx-auto mb-20">
             <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="grid md:grid-cols-2 gap-12 relative">
                  {/* Mission */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                        <Target className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      To provide high-quality electrical products and practical technical support that help our customers complete their projects safely, on time, and within budget.
                    </p>
                  </div>
                  
                  {/* Divider */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2"></div>
                  <div className="md:hidden w-full h-px bg-slate-200 dark:bg-slate-800"></div>
                  
                  {/* Vision */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                        <Eye className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      To become one of Malaysia’s most reliable and recognized electrical supply partners for homes, contractors, and industries.
                    </p>
                  </div>
                </div>
             </div>
          </div>
          
          {/* What We Do */}
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">What We Do</h2>
                <p className="text-slate-300">Comprehensive supply chain solutions for every scale.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   "Electrical & electronic product supply",
                   "Residential & commercial components",
                   "Industrial electrical equipment",
                   "Project & bulk order support",
                   "Technical product consultation",
                   "Logistics & delivery coordination",
                   "After-sales product assistance",
                   "Contractor supply programs"
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                     <span className="text-slate-200 font-medium">{item}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Customers Choose Us</h2>
            <p className="text-slate-600 dark:text-slate-400">Reliability is at the core of our business.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Authorized Distributor", desc: "Direct partner of trusted global brands.", icon: Award },
              { title: "Wide Product Range", desc: "Everything you need under one roof.", icon: Package },
              { title: "Ready Stock", desc: "Fast availability for urgent project needs.", icon: Zap },
              { title: "Competitive Pricing", desc: "Fair market rates for bulk and retail.", icon: CheckCircle2 },
              { title: "Technical Knowledge", desc: "Expert advice to guide your selection.", icon: ShieldCheck },
              { title: "Local Support", desc: "Retail store & delivery logistics support.", icon: Truck },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Industries We Serve</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
             {[
               { name: "Residential", icon: Home },
               { name: "Commercial", icon: Building2 },
               { name: "Industrial", icon: Factory },
               { name: "Construction", icon: HardHat },
               { name: "Renovation", icon: PenTool },
               { name: "Development", icon: Landmark }
             ].map((ind, i) => (
               <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-default">
                 <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                   <ind.icon className="w-6 h-6" />
                 </div>
                 <span className="font-medium text-slate-900 dark:text-white text-sm">{ind.name}</span>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Contact & Locations Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Locations & Contact Info</h2>
            <p className="text-slate-600 dark:text-slate-400">Visit one of our branches or get in touch for support.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {BRANCHES.map((branch, index) => (
                <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors shadow-sm group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/20 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{branch.name}</h3>
                  </div>
                  
                  <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                    <p className="leading-relaxed min-h-[60px]">{branch.address}</p>
                    
                    <div className="space-y-2">
                       <div className="flex items-start gap-3">
                         <Phone className="w-4 h-4 mt-1 text-slate-400" />
                         <div>
                           <p>Tel: <span className="text-slate-900 dark:text-white">{branch.tel}</span></p>
                           <p>Fax: {branch.fax}</p>
                         </div>
                       </div>
                       
                       <div className="flex items-start gap-3">
                         <Mail className="w-4 h-4 mt-1 text-slate-400" />
                         <div className="flex flex-col">
                           {branch.emails.map((email, i) => (
                             <a key={i} href={`mailto:${email}`} className="hover:text-cyan-600 transition-colors">{email}</a>
                           ))}
                         </div>
                       </div>
                    </div>

                    <a 
                      href={branch.mapLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium hover:underline mt-2"
                    >
                      <Map className="w-4 h-4" /> View on Google Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400">Common questions about our products and services.</p>
          </div>
          
          <div className="space-y-4">
            {FAQs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Let’s Power Your Next Project
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
            Whether you need a single electrical component or full project supply, our team is ready to support your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto">Request Quotation</Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">Contact Us</Button>
          </div>
        </div>
      </section>

    </div>
  );
};