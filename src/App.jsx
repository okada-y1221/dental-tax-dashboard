import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Edit3, Save, X, Calendar, Bell, Home, FileText, DollarSign, Users, Settings, HelpCircle, LogOut, Menu } from 'lucide-react';

const DentalTaxDashboard = () => {
  const [editMode, setEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({
    currentMonth: {
      revenue: 8500000,
      insurance: 4200000,
      expenses: 7100000,
      profit: 5600000
    },
    taxEstimate: {
      income: 3200000,
      consumption: 1800000,
      resident: 900000
    },
    monthlyData: [
      { month: '1月', revenue: 6800000, expenses: 5200000, profit: 1600000 },
      { month: '2月', revenue: 7200000, expenses: 5500000, profit: 1700000 },
      { month: '3月', revenue: 8000000, expenses: 5800000, profit: 2200000 },
      { month: '4月', revenue: 7800000, expenses: 5600000, profit: 2200000 },
      { month: '5月', revenue: 7400000, expenses: 5400000, profit: 2000000 },
      { month: '6月', revenue: 7600000, expenses: 5500000, profit: 2100000 },
      { month: '7月', revenue: 7800000, expenses: 5700000, profit: 2100000 },
      { month: '8月', revenue: 8200000, expenses: 6000000, profit: 2200000 },
      { month: '9月', revenue: 8600000, expenses: 6200000, profit: 2400000 },
      { month: '10月', revenue: 9200000, expenses: 6500000, profit: 2700000 },
      { month: '11月', revenue: 8500000, expenses: 7100000, profit: 5600000 }
    ],
    cashFlow: [
      { month: '1ヶ月', value: 800 },
      { month: '2ヶ月', value: 1200 },
      { month: '3ヶ月', value: -500 }
    ]
  });

  const [tempData, setTempData] = useState(data);

  const formatCurrency = (value) => {
    return `¥${value.toLocaleString()}`;
  };

  const handleEdit = () => {
    setEditMode(true);
    setTempData(JSON.parse(JSON.stringify(data)));
  };

  const handleSave = () => {
    setData(tempData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempData(JSON.parse(JSON.stringify(data)));
    setEditMode(false);
  };

  const updateValue = (path, value) => {
    const newData = { ...tempData };
    const keys = path.split('.');
    let current = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = parseInt(value) || 0;
    setTempData(newData);
  };

  const EditableNumber = ({ value, onChange }) => {
    if (!editMode) {
      return <span className="text-xl font-bold">{formatCurrency(value)}</span>;
    }
    
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xl font-bold bg-white border border-blue-400 rounded px-2 py-1 w-full"
      />
    );
  };

  return (
    <div className="flex min-h-screen lg:h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar with Hamburger Menu */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-48 bg-slate-800 text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 flex items-center space-x-2 border-b border-slate-700">
          <FileText className="w-6 h-6 text-blue-400" />
          <div>
            <div className="text-sm font-bold">医療DX ×</div>
            <div className="text-xs">Bluetax For Dental</div>
          </div>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          <a href="#" className="flex items-center space-x-2 bg-slate-700 px-3 py-2 rounded text-sm hover:bg-slate-600 transition">
            <Home className="w-4 h-4" />
            <span>ホーム</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition">
            <FileText className="w-4 h-4" />
            <span>取引登録</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition">
            <FileText className="w-4 h-4" />
            <span>帳簿・レポート</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition">
            <DollarSign className="w-4 h-4" />
            <span>決算・申告</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition">
            <Users className="w-4 h-4" />
            <span>人事・労務</span>
          </a>
        </nav>
        
        <div className="p-3 border-t border-slate-700 space-y-1">
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition">
            <Settings className="w-4 h-4" />
            <span>設定</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition">
            <HelpCircle className="w-4 h-4" />
            <span>ヘルプ</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded text-sm hover:bg-slate-700 transition">
            <LogOut className="w-4 h-4" />
            <span>ログアウト</span>
          </a>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 w-full">
        {/* Header */}
        <header className="bg-gradient-to-r from-slate-700 to-blue-800 text-white px-3 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-600/50 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-lg font-bold">全体サマリー</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-600/50 px-3 py-1 rounded text-sm">
              <Calendar className="w-4 h-4" />
              <span>2025年11月</span>
            </div>
            <button className="relative p-2 hover:bg-slate-600/50 rounded">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center space-x-2 bg-slate-600/50 px-3 py-1 rounded">
              <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                ○○
              </div>
              <div className="text-sm">
                <div className="font-semibold">○○歯科クリニック</div>
                <div className="text-xs text-slate-300">院長様</div>
              </div>
            </div>
            {!editMode ? (
              <button onClick={handleEdit} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm">
                <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">編集</span>
              </button>
            ) : (
              <div className="flex space-x-1 sm:space-x-2">
                <button onClick={handleSave} className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm">
                  <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">保存</span>
                </button>
                <button onClick={handleCancel} className="flex items-center space-x-1 bg-slate-600 hover:bg-slate-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-sm">
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
          <div className="flex flex-col gap-4 min-h-full lg:h-full">
            
            {/* Top Row - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              
              
              {/* 今月の経営速報 */}
              <div className="bg-white rounded-lg shadow p-4 min-h-[200px]">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">今月の経営速報（11月度速報値）</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-slate-600 mb-2">売上</div>
                    <div className="text-xs text-slate-500 mb-1">保険</div>
                    <div className="mb-2">
                      <EditableNumber
                        value={editMode ? tempData.currentMonth.revenue : data.currentMonth.revenue}
                        onChange={(v) => updateValue('currentMonth.revenue', v)}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mb-1">自費</div>
                    <div className="text-base font-semibold mb-2">{formatCurrency(editMode ? tempData.currentMonth.insurance : data.currentMonth.insurance)}</div>
                    <div className="flex items-center space-x-1 text-green-600 text-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span>YoY比較</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-2">経費</div>
                    <div className="mb-2">
                      <EditableNumber
                        value={editMode ? tempData.currentMonth.expenses : data.currentMonth.expenses}
                        onChange={(v) => updateValue('currentMonth.expenses', v)}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mb-1">材料費</div>
                    <div className="text-base font-semibold mb-2">¥2,500,000</div>
                    <div className="flex items-center space-x-1 text-red-600 text-xs">
                      <TrendingDown className="w-3 h-3" />
                      <span>YoY比較</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-2">営業利益</div>
                    <div className="mb-2">
                      <EditableNumber
                        value={editMode ? tempData.currentMonth.profit : data.currentMonth.profit}
                        onChange={(v) => updateValue('currentMonth.profit', v)}
                      />
                    </div>
                    <div className="h-8"></div>
                    <div className="flex items-center space-x-1 text-green-600 text-xs mt-6">
                      <TrendingUp className="w-3 h-3" />
                      <span>YoY比較</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 納税見込み額 */}
              <div className="bg-white rounded-lg shadow p-4 min-h-[200px]">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">納税見込み額（2025年度予測）</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-slate-600 mb-2">所得税</div>
                    <div className="text-xl font-bold">{formatCurrency(editMode ? tempData.taxEstimate.income : data.taxEstimate.income)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-2">消費税</div>
                    <div className="text-xl font-bold">{formatCurrency(editMode ? tempData.taxEstimate.consumption : data.taxEstimate.consumption)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-2">住民税</div>
                    <div className="text-xl font-bold">{formatCurrency(editMode ? tempData.taxEstimate.resident : data.taxEstimate.resident)}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-600 mb-1">納税資金準備状況：65%</div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              {/* 資金繰り予測アラート */}
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow p-4 text-white min-h-[200px] flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold">資金繰り予測アラート</h3>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-xs mb-2">3ヶ月キャッシュフロー予想</div>
                <div className="flex-1 min-h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={editMode ? tempData.cashFlow : data.cashFlow}>
                      <XAxis dataKey="month" tick={{ fill: '#fff', fontSize: 10 }} />
                      <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={{ fill: '#fff', r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white/20 backdrop-blur rounded p-2 mt-2">
                  <div className="flex items-center space-x-1 text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>2026年1月に資金不足のリスクがあります</span>
                  </div>
                </div>
                <button className="w-full bg-white text-red-600 font-semibold py-2 rounded mt-2 text-sm hover:bg-slate-50 transition">
                  対策を確認する
                </button>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              
              
              {/* Left - 経営分析 */}
              <div className="lg:col-span-2 bg-slate-100 rounded-lg p-3 min-h-[500px] lg:min-h-[600px]">
                <h2 className="text-base font-bold text-slate-800 mb-3">経営分析</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-white rounded-lg shadow p-3 min-h-[250px]">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">月次推移（直近12ヶ月）</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <ComposedChart data={editMode ? tempData.monthlyData : data.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `¥${(v/1000000).toFixed(0)}M`} width={35} />
                        <Tooltip formatter={(v) => formatCurrency(v)} />
                        <Legend wrapperStyle={{ fontSize: '9px' }} />
                        <Bar dataKey="revenue" fill="#3b82f6" name="売上" />
                        <Bar dataKey="expenses" fill="#f59e0b" name="経費" />
                        <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="利益" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-3 min-h-[250px]">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">診療分析</h3>
                    
                    {/* 自費率推移 */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs text-slate-600">自費率推移</h4>
                        <div className="text-xs">
                          <span className="text-green-600 font-semibold">82%</span>
                          <span className="text-slate-500 ml-1">(目標: 80%)</span>
                        </div>
                      </div>
                      <ResponsiveContainer width="100%" height={100}>
                        <LineChart data={[
                          { month: '5月', rate: 72, target: 80 },
                          { month: '6月', rate: 75, target: 80 },
                          { month: '7月', rate: 77, target: 80 },
                          { month: '8月', rate: 78, target: 80 },
                          { month: '9月', rate: 76, target: 80 },
                          { month: '10月', rate: 79, target: 80 },
                          { month: '11月', rate: 82, target: 80 },
                          { month: '12月', rate: 80, target: 80 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                          <YAxis domain={[65, 85]} tick={{ fontSize: 9 }} tickFormatter={(v) => `${v}%`} />
                          <Tooltip formatter={(v) => `${v}%`} contentStyle={{ fontSize: '10px' }} />
                          <Line 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            name="自費率" 
                            dot={{ fill: '#3b82f6', r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="target" 
                            stroke="#94a3b8" 
                            strokeDasharray="5 5" 
                            strokeWidth={2} 
                            name="目標" 
                            dot={false}
                          />
                          <Legend wrapperStyle={{ fontSize: '9px' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* 診療メニュー別売上トップ5 */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-700 mb-2">11月度 診療メニュー別売上トップ5</h4>
                      <div className="space-y-1.5">
                        <div className="flex items-center">
                          <div className="w-20 text-xs text-slate-600">インプラント</div>
                          <div className="flex-1 mx-2">
                            <div className="h-5 bg-blue-100 rounded relative overflow-hidden">
                              <div className="h-full bg-blue-500 rounded" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <div className="w-24 text-right text-xs font-semibold">¥2,500,000</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 text-xs text-slate-600">矯正</div>
                          <div className="flex-1 mx-2">
                            <div className="h-5 bg-green-100 rounded relative overflow-hidden">
                              <div className="h-full bg-green-500 rounded" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                          <div className="w-24 text-right text-xs font-semibold">¥1,800,000</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 text-xs text-slate-600">ホワイトニング</div>
                          <div className="flex-1 mx-2">
                            <div className="h-5 bg-purple-100 rounded relative overflow-hidden">
                              <div className="h-full bg-purple-500 rounded" style={{ width: '48%' }}></div>
                            </div>
                          </div>
                          <div className="w-24 text-right text-xs font-semibold">¥1,200,000</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 text-xs text-slate-600">審美治療</div>
                          <div className="flex-1 mx-2">
                            <div className="h-5 bg-orange-100 rounded relative overflow-hidden">
                              <div className="h-full bg-orange-500 rounded" style={{ width: '40%' }}></div>
                            </div>
                          </div>
                          <div className="w-24 text-right text-xs font-semibold">¥1,000,000</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-20 text-xs text-slate-600">その他</div>
                          <div className="flex-1 mx-2">
                            <div className="h-5 bg-slate-100 rounded relative overflow-hidden">
                              <div className="h-full bg-slate-400 rounded" style={{ width: '36%' }}></div>
                            </div>
                          </div>
                          <div className="w-24 text-right text-xs font-semibold">¥900,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg shadow p-3 min-h-[280px]">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">11月度 経費構成比</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie data={[
                            { name: '材料費', value: 2500000, fill: '#3b82f6' },
                            { name: '人件費', value: 1800000, fill: '#ef4444' },
                            { name: '家賃・光熱費', value: 1200000, fill: '#10b981' },
                            { name: '広告宣伝費', value: 1000000, fill: '#f59e0b' },
                            { name: '技工費', value: 800000, fill: '#8b5cf6' },
                            { name: 'その他', value: 800000, fill: '#ec4899' }
                          ]} cx="50%" cy="50%" innerRadius={30} outerRadius={60} dataKey="value" label={false}>
                            {[
                              { name: '材料費', fill: '#3b82f6' },
                              { name: '人件費', fill: '#ef4444' },
                              { name: '家賃・光熱費', fill: '#10b981' },
                              { name: '広告宣伝費', fill: '#f59e0b' },
                              { name: '技工費', fill: '#8b5cf6' },
                              { name: 'その他', fill: '#ec4899' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [formatCurrency(value), name]} contentStyle={{ fontSize: '10px' }} />
                        </PieChart>
                      </ResponsiveContainer>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
                            <span>材料費</span>
                          </div>
                          <span className="font-semibold">¥2,500,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                            <span>人件費</span>
                          </div>
                          <span className="font-semibold">¥1,800,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
                            <span>家賃・光熱費</span>
                          </div>
                          <span className="font-semibold">¥1,200,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                            <span>広告宣伝費</span>
                          </div>
                          <span className="font-semibold">¥1,000,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
                            <span>技工費</span>
                          </div>
                          <span className="font-semibold">¥800,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ec4899' }}></div>
                            <span>その他</span>
                          </div>
                          <span className="font-semibold">¥800,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-3 min-h-[280px]">
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">材料費・技工費率推移</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={[
                        { m: '1月', r1: 60, r2: 55 },
                        { m: '2月', r1: 62, r2: 58 },
                        { m: '3月', r1: 65, r2: 60 },
                        { m: '4月', r1: 63, r2: 62 },
                        { m: '5月', r1: 68, r2: 65 },
                        { m: '6月', r1: 70, r2: 68 },
                        { m: '7月', r1: 72, r2: 70 },
                        { m: '8月', r1: 75, r2: 72 },
                        { m: '9月', r1: 73, r2: 74 },
                        { m: '10月', r1: 70, r2: 75 }
                      ]}>
                        <XAxis dataKey="m" tick={{ fontSize: 8 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 8 }} />
                        <Line type="monotone" dataKey="r1" stroke="#f59e0b" strokeWidth={2} name="材料費率" />
                        <Line type="monotone" dataKey="r2" stroke="#ef4444" strokeWidth={2} name="技工費率" />
                        <Legend wrapperStyle={{ fontSize: '9px' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Right - アクション&管理 */}
              <div className="bg-slate-100 rounded-lg p-3 min-h-[500px] lg:min-h-[600px]">
                <h2 className="text-base font-bold text-slate-800 mb-3">アクション&管理</h2>
                
                <div className="bg-white rounded-lg shadow p-3 mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">やることリスト（To-Do）</h3>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center space-x-2"><input type="checkbox" className="w-4 h-4" /><span>未アップロード領収書（5件）</span></label>
                    <label className="flex items-center space-x-2"><input type="checkbox" className="w-4 h-4" /><span>給与データ確認（あと2日）</span></label>
                    <label className="flex items-center space-x-2"><input type="checkbox" className="w-4 h-4" /><span>税理士からの質問に回答</span></label>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-3 mb-3">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">税理士からのアドバイス</h3>
                  <div className="text-xs bg-blue-50 p-2 rounded">
                    <p>今月の材料費率が前年比+2.5%となっています。在庫管理の見直しを推奨します。</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-3">
                  <h3 className="text-sm font-semibold text-slate-800 mb-2">設備投資計画（シミュレーション）</h3>
                  <div className="text-xs space-y-1 mb-2">
                    <div className="flex justify-between"><span>ユニット2台</span><span className="font-semibold">¥30,000</span></div>
                    <div className="flex justify-between"><span>ユニット2台</span><span className="font-semibold">¥2,000,000</span></div>
                    <div className="flex justify-between"><span>CT</span><span className="font-semibold">¥1,800,000</span></div>
                  </div>
                  <h4 className="text-xs font-semibold mb-1">ローン返済シミュレーション</h4>
                  <ResponsiveContainer width="100%" height={80}>
                    <BarChart data={[
                      { m: '1月', v: 10000 },
                      { m: '2月', v: 12000 },
                      { m: '3月', v: 14000 },
                      { m: '4月', v: 15000 },
                      { m: '5月', v: 16000 }
                    ]}>
                      <XAxis dataKey="m" tick={{ fontSize: 8 }} />
                      <Bar dataKey="v" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalTaxDashboard;
