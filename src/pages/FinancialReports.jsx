import React, { useState } from 'react';
import StatCard from '../components/StatCard';

function FinancialReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 1. Stats Data
  const stats = [
    { label: "Total Revenue", value: "Rs. 4.2M", iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "emerald" },
    { label: "Doctor Payouts", value: "Rs. 2.1M", iconPath: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", color: "blue" },
    { label: "Operational Costs", value: "Rs. 500K", iconPath: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6", color: "rose" },
    { label: "Net Profit", value: "Rs. 1.6M", iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "violet" },
  ];

  // 2. Chart Mock Data (Income vs Expense)
  const monthlyData = [
    { month: 'Jan', income: 80, expense: 40 },
    { month: 'Feb', income: 90, expense: 45 },
    { month: 'Mar', income: 75, expense: 50 },
    { month: 'Apr', income: 100, expense: 55 }, // Current month is higher
  ];

  // 3. Transactions Mock Data
  const allTransactions = Array.from({ length: 15 }, (_, i) => {
    const isIncome = i % 3 !== 0; // Every 3rd item is an expense
    return {
      id: `TRX-${8000 + i}`,
      description: isIncome ? "Patient Consultation Fee" : (i % 2 === 0 ? "Pharmacy Supplier Payment" : "Electricity Bill"),
      category: isIncome ? "Income" : "Expense",
      amount: isIncome ? `+ Rs. ${(2500 + i * 500).toLocaleString()}.00` : `- Rs. ${(15000 + i * 1000).toLocaleString()}.00`,
      date: `2026-04-${27 - (i % 10)}`,
      status: i % 8 === 0 ? "Pending" : "Completed"
    };
  });

  // 4. Search & Filter Logic
  const filteredTransactions = allTransactions.filter(trx => {
    const matchesSearch = trx.description.toLowerCase().includes(searchTerm.toLowerCase()) || trx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || trx.category === filterType;
    return matchesSearch && matchesFilter;
  });

  // 5. Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 lg:p-8 font-sans animate-fade-in relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">Financial Reports</h1>
          <p className="text-slate-500 font-medium mt-1">Track clinic revenue, expenses, and overall profitability.</p>
        </div>
        <div className="flex gap-3">
          <input type="month" defaultValue="2026-04" className="px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 text-sm outline-none focus:border-blue-500 shadow-sm cursor-pointer" />
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-500/30 hover:from-blue-700 transition-all text-sm flex items-center gap-2 hover:-translate-y-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, idx) => (
          <StatCard key={idx} {...s} />
        ))}
      </div>

      {/* Chart & Quick Actions Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
        {/* CSS Bar Chart (Income vs Expense) */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-slate-800">Income vs Expenses</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Year-to-date performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-400"></div> Income</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-400"></div> Expense</div>
            </div>
          </div>

          <div className="h-56 flex items-end justify-around gap-2 pt-10 border-b border-slate-100 pb-2">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="flex items-end gap-2 w-full justify-center h-full">
                  {/* Income Bar */}
                  <div className="w-8 md:w-12 bg-emerald-400 rounded-t-xl transition-all duration-500 hover:opacity-80 relative group" style={{ height: `${data.income}%` }}>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md shadow-sm">
                      {data.income}K
                    </span>
                  </div>
                  {/* Expense Bar */}
                  <div className="w-8 md:w-12 bg-rose-400 rounded-t-xl transition-all duration-500 hover:opacity-80 relative group" style={{ height: `${data.expense}%` }}>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-extrabold text-rose-700 bg-rose-50 px-2 py-1 rounded-md shadow-sm">
                      {data.expense}K
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 mt-4">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div>
            <h3 className="text-xl font-extrabold mb-2">Financial Actions</h3>
            <p className="text-blue-100 text-sm font-medium mb-8">Manage payouts and record external expenses manually.</p>
          </div>
          <div className="space-y-3">
            <button className="w-full py-4 bg-white text-blue-600 font-extrabold rounded-2xl hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Record New Expense
            </button>
            <button className="w-full py-4 bg-blue-500/50 text-white font-bold rounded-2xl border border-blue-400/30 hover:bg-blue-500 transition-all text-sm">
              Process Doctor Payouts
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-extrabold text-slate-800">Recent Transactions</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm w-full sm:w-48"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <select 
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 text-sm outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Income">Income Only</option>
              <option value="Expense">Expenses Only</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction ID & Desc</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentTransactions.length > 0 ? (
                currentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trx.category === 'Income' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                          {trx.category === 'Income' ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path></svg>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{trx.description}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{trx.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-slate-600">{trx.date}</td>
                    <td className="px-8 py-5">
                      <p className={`font-extrabold ${trx.category === 'Income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {trx.amount}
                      </p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase border ${
                        trx.status === 'Completed' ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-blue-600 font-bold text-xs hover:underline">View Receipt</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-slate-400 font-medium">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-sm text-slate-500 font-medium hidden sm:block">
            Showing <span className="font-bold text-slate-800">{indexOfFirstItem + 1}</span> to <span className="font-bold text-slate-800">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> of <span className="font-bold text-slate-800">{filteredTransactions.length}</span> transactions
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded-xl transition-all flex items-center justify-center ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)} className={`w-10 h-10 rounded-xl font-bold transition-all text-sm flex items-center justify-center ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-600 hover:bg-slate-100'}`}>
                  {index + 1}
                </button>
              ))}
            </div>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 rounded-xl transition-all flex items-center justify-center ${currentPage === totalPages ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default FinancialReports;