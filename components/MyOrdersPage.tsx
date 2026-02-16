import React, { useEffect, useState } from 'react';
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  CreditCard,
  Eye,
  RotateCcw,
  FileText,
} from 'lucide-react';
import { Button } from './Button';
import { useAuth } from './AuthContext';
import { MOCK_ORDERS } from '../constants';
import { fallbackData, getOrdersRequest } from '../services/api';
import { Order } from '../types';

interface MyOrdersPageProps {
  onNavigate?: (page: string) => void;
}

const STATUS_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  Pending:    { icon: Clock,       color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800', label: 'Pending' },
  Processing: { icon: RotateCcw,   color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',     label: 'Processing' },
  Shipped:    { icon: Truck,       color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800', label: 'Shipped' },
  Delivered:  { icon: CheckCircle, color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', label: 'Delivered' },
  Cancelled:  { icon: XCircle,     color: 'text-red-600 dark:text-red-400',      bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',         label: 'Cancelled' },
};

const STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export const MyOrdersPage: React.FC<MyOrdersPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [sortNewest, setSortNewest] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const apiOrders = await getOrdersRequest();
        setOrders(apiOrders);
      } catch {
        const userOrders = (fallbackData.orders?.length ? fallbackData.orders : MOCK_ORDERS)
          .filter(o => o.userId === user?.id);
        setOrders(userOrders);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const statuses = ['All', ...Object.keys(STATUS_CONFIG)];

  const filtered = orders
    .filter(o => filterStatus === 'All' || o.status === filterStatus)
    .filter(o => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.items.some(i => i.productName.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => sortNewest
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  const summary = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
  };

  if (!user) {
    return (
      <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Login Required</h2>
          <p className="text-slate-500 mb-6">Please login to view your orders.</p>
          <Button onClick={() => onNavigate?.('login')}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Orders</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage your order history</p>
          </div>
          <button
            onClick={() => onNavigate?.('products')}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {[
            { label: 'Total Orders', value: summary.total, icon: FileText, color: 'text-slate-600 dark:text-slate-400' },
            { label: 'Pending', value: summary.pending, icon: Clock, color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Processing', value: summary.processing, icon: RotateCcw, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Shipped', value: summary.shipped, icon: Truck, color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Delivered', value: summary.delivered, icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</span>
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by order ID or product name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                  filterStatus === s
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-red-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Sort */}
          <button
            onClick={() => setSortNewest(!sortNewest)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-red-400 transition-colors whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            {sortNewest ? 'Newest First' : 'Oldest First'}
          </button>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 animate-pulse">
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-3" />
                <div className="h-4 bg-slate-100 dark:bg-slate-800/50 rounded w-48" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-700" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {orders.length === 0 ? 'No Orders Yet' : 'No Matching Orders'}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              {orders.length === 0
                ? "You haven't placed any orders yet. Start shopping and your orders will appear here."
                : 'Try adjusting your search or filter to find your order.'}
            </p>
            {orders.length === 0 && (
              <Button onClick={() => onNavigate?.('products')} className="gap-2">
                <ShoppingBag className="w-5 h-5" /> Start Shopping
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => {
              const isExpanded = expandedOrder === order.id;
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
              const StatusIcon = cfg.icon;
              const stepIdx = STEPS.indexOf(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Order Header — always visible */}
                  <button
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
                  >
                    {/* Order ID & date */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <Package className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="font-bold text-slate-900 dark:text-white text-lg">#{order.id}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {order.date}</span>
                        <span>{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${cfg.bg} ${cfg.color}`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {cfg.label}
                    </div>

                    {/* Total */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">RM {order.total.toFixed(2)}</p>
                    </div>

                    {/* Expand chevron */}
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top-2 duration-200">
                      {/* Progress tracker for non-cancelled orders */}
                      {order.status !== 'Cancelled' && (
                        <div className="px-6 py-5 bg-slate-50 dark:bg-slate-950/50">
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Order Progress</p>
                          <div className="flex items-center gap-0">
                            {STEPS.map((step, i) => {
                              const reached = i <= stepIdx;
                              const StepIcon = STATUS_CONFIG[step]?.icon || Clock;
                              return (
                                <React.Fragment key={step}>
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                                      reached
                                        ? 'bg-red-500 border-red-500 text-white'
                                        : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400'
                                    }`}>
                                      <StepIcon className="w-4 h-4" />
                                    </div>
                                    <span className={`text-[10px] font-medium ${reached ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`}>
                                      {step}
                                    </span>
                                  </div>
                                  {i < STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-1 mt-[-16px] ${
                                      i < stepIdx ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-800'
                                    }`} />
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Items list */}
                      <div className="px-6 py-5">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Items</p>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                  <Package className="w-5 h-5 text-slate-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">{item.productName}</p>
                                  <p className="text-xs text-slate-500">Qty: {item.quantity} × RM {item.price.toFixed(2)}</p>
                                </div>
                              </div>
                              <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                RM {(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer actions */}
                      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Payment: Online Transfer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {order.status === 'Delivered' && (
                            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => onNavigate?.('products')}>
                              <RotateCcw className="w-3 h-3" /> Reorder
                            </Button>
                          )}
                          <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
                            <Eye className="w-3 h-3" /> View Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
