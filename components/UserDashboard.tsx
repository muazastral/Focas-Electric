import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { 
  User, 
  ShoppingBag, 
  ShoppingCart, 
  Lock, 
  LogOut, 
  MapPin, 
  Mail, 
  Phone,
  Edit2
} from 'lucide-react';
import { Button } from './Button';
import { MOCK_ORDERS } from '../constants';
import { fallbackData, getOrdersRequest } from '../services/api';
import { Order } from '../types';

export const UserDashboard: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  if (!user) return null;

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const apiOrders = await getOrdersRequest();
        setOrders(apiOrders);
      } catch {
        setOrders(fallbackData.orders.filter(o => o.userId === user.id));
      }
    };

    loadOrders();
  }, [user.id]);

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        <div className="flex justify-between items-start mb-8">
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h2>
           <Button variant="outline" size="sm" className="gap-2"><Edit2 className="w-4 h-4" /> Edit</Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
           <img 
             src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=06b6d4&color=fff`} 
             alt={user.name} 
             className="w-24 h-24 rounded-full shadow-lg"
           />
           <div className="text-center md:text-left">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{user.name}</h3>
             <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Member since Oct 2023</p>
             <div className="flex flex-wrap gap-2 justify-center md:justify-start">
               <span className="px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold">Standard Member</span>
               <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold">Verified</span>
             </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
               <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                 <Mail className="w-5 h-5 text-cyan-500" />
                 {user.email}
               </div>
             </div>
             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number</label>
               <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                 <Phone className="w-5 h-5 text-cyan-500" />
                 {user.phone || 'Not set'}
               </div>
             </div>
           </div>
           
           <div>
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Delivery Address</label>
             <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-lg">
               <MapPin className="w-5 h-5 text-cyan-500 mt-0.5" />
               <p>{user.address || 'No address set. Please update your profile.'}</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.filter(o => o.userId === user.id).map(order => (
          <div key={order.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg">Order #{order.id}</p>
                <p className="text-sm text-slate-500">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-cyan-600 dark:text-cyan-400 text-lg">RM {order.total.toFixed(2)}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                  'bg-amber-100 text-amber-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>{item.quantity}x {item.productName}</span>
                  <span>RM {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {orders.filter(o => o.userId === user.id).length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No orders found.</p>
            <Button variant="outline" className="mt-4" onClick={() => onNavigate('products')}>Start Shopping</Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Shopping Cart</h2>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
           {cart.length > 0 ? cart.map(item => (
             <div key={item.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex gap-4 items-center">
               <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-slate-50" />
               <div className="flex-1">
                 <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                 <p className="text-sm text-slate-500 mb-2">RM {item.price.toFixed(2)}</p>
                 <div className="flex items-center gap-3">
                   <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold">-</button>
                   <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                   <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold">+</button>
                 </div>
               </div>
               <div className="text-right">
                 <p className="font-bold text-slate-900 dark:text-white mb-2">RM {(item.price * item.quantity).toFixed(2)}</p>
                 <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">Remove</button>
               </div>
             </div>
           )) : (
             <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
               <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-slate-300" />
               <p className="text-slate-500">Your cart is empty.</p>
             </div>
           )}
        </div>
        
        <div>
           <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4">Order Summary</h3>
             <div className="space-y-3 mb-6 text-sm">
               <div className="flex justify-between text-slate-600 dark:text-slate-400">
                 <span>Subtotal</span>
                 <span>RM {cartTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-slate-600 dark:text-slate-400">
                 <span>Shipping Estimate</span>
                 <span>RM {cartTotal > 0 ? '15.00' : '0.00'}</span>
               </div>
               <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                 <span>Total</span>
                 <span>RM {cartTotal > 0 ? (cartTotal + 15).toFixed(2) : '0.00'}</span>
               </div>
             </div>
             <Button className="w-full" disabled={cart.length === 0}>Proceed to Checkout</Button>
           </div>
        </div>
      </div>
    </div>
  );

  const renderPassword = () => (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Change Password</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
            <input type="password" className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
            <input type="password" className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label>
            <input type="password" className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white" />
          </div>
          <Button type="submit" className="w-full mt-4">Update Password</Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
             <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden sticky top-24">
                <div className="p-6 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-center">
                   <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                   <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <nav className="p-2 space-y-1">
                  {[
                    { id: 'profile', label: 'My Profile', icon: User },
                    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                    { id: 'cart', label: 'Manage Cart', icon: ShoppingCart },
                    { id: 'password', label: 'Change Password', icon: Lock },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </nav>
             </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'cart' && renderCart()}
            {activeTab === 'password' && renderPassword()}
          </div>

        </div>
      </div>
    </div>
  );
};