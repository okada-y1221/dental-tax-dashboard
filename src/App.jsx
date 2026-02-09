import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Edit3, Save, X, Calendar, Bell, Home, FileText, DollarSign, Users, Settings, HelpCircle, LogOut, Menu } from 'lucide-react';

const DentalTaxDashboard = () => {
  const [editMode, setEditMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      return <span className="text-sm font-bold">{formatCurrency(value)}</span>;
    }
    
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm font-bold bg-white border border-blue-400 rounded px-1 py-0.5 w-full"
      />
    );
  };

  return (
    <div className="min-h-screen lg:h-screen bg-gradient-to-br from-slate-50 to-blue-50 lg:overflow-hidden flex flex-col">
      {/* Compact Header */}
      <header className="bg-gradient-to-r from-slate-800 to-blue-900 text-white shadow-lg">
        <div className="px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <h1 className="text-sm font-bold">医療DX × Bluetax For Dental</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-slate-700/50 px-2 py-1 rounded text-xs">
              <Calendar className="w-3 h-3" />
              <span>2025年11月</span>
            </div>
            <button className="relative p-1">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 bg-slate-700/50 px-2 py-1 rounded">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                ○○
              </div>
              <div className="text-xs">○○歯科クリニック</div>
            </div>
            {!editMode ? (
              <button onClick={handleEdit} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs">
                <Edit3 className="w-3 h-3" />
                <span>編集</span>
              </button>
            ) : (
              <div className="flex space-x-1">
                <button onClick={handleSave} className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs">
                  <Save className="w-3 h-3" />
                </button>
                <button onClick={handleCancel} className="flex items-center space-x-1 bg-slate-600 hover:bg-slate-700 px-2 py-1 rounded text-xs">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Fixed Height on Desktop, Scrollable on Mobile */}
      <div className="flex-1 overflow-auto lg:overflow-hidden p-2 lg:h-[calc(100vh-40px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 h-full">
          
          {/* Left Column - 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-2 h-full">
            
            {/* 今月の経営速報 */}
            <div className="bg-white rounded-lg shadow p-2 border border-slate-200" style={{ flex: '0 0 auto' }}>
              <h3 className="text-xs font-semibold text-slate-700 mb-1">今月の経営速報</h3>
              <div className="space-y-1">
                <div>
                  <div className="text-xs text-slate-600">売上</div>
                  <EditableNumber
                    value={editMode ? tempData.currentMonth.revenue : data.currentMonth.revenue}
                    onChange={(v) => updateValue('currentMonth.revenue', v)}
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-600">経費</div>
                  <EditableNumber
                    value={editMode ? tempData.currentMonth.expenses : data.currentMonth.expenses}
                    onChange={(v) => updateValue('currentMonth.expenses', v)}
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-600">営業利益</div>
                  <EditableNumber
                    value={editMode ? tempData.currentMonth.profit : data.currentMonth.profit}
                    onChange={(v) => updateValue('currentMonth.profit', v)}
                  />
                </div>
              </div>
            </div>

            {/* 納税見込み額 */}
            <div className="bg-white rounded-lg shadow p-2 border border-slate-200" style={{ flex: '0 0 auto' }}>
              <h3 className="text-xs font-semibold text-slate-700 mb-1">納税見込み額</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-600">所得税</span>
                  <span className="text-xs font-bold">{formatCurrency(editMode ? tempData.taxEstimate.income : data.taxEstimate.income)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-600">消費税</span>
                  <span className="text-xs font-bold">{formatCurrency(editMode ? tempData.taxEstimate.consumption : data.taxEstimate.consumption)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-600">住民税</span>
                  <span className="text-xs font-bold">{formatCurrency(editMode ? tempData.taxEstimate.resident : data.taxEstimate.resident)}</span>
                </div>
              </div>
            </div>

            {/* 資金繰りアラート */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow p-2 text-white flex-1 flex flex-col">
              <div className="flex items-center space-x-1 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-semibold">資金繰り予測</h3>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={editMode ? tempData.cashFlow : data.cashFlow}>
                    <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs mt-1">⚠️ 2026年1月に資金不足リスク</p>
            </div>
          </div>

          {/* Center Column - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-2 h-full">
            
            {/* 月次推移 */}
            <div className="bg-white rounded-lg shadow p-2 border border-slate-200" style={{ flex: '0 0 55%' }}>
              <h3 className="text-xs font-semibold text-slate-800 mb-1">月次推移（直近12ヶ月）</h3>
              <div className="h-[calc(100%-20px)]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={editMode ? tempData.monthlyData : data.monthlyData} margin={{ left: 5, right: 5, top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 9 }} />
                    <YAxis 
                      tick={{ fill: '#64748b', fontSize: 9 }}
                      tickFormatter={(value) => `¥${(value / 1000000).toFixed(1)}M`}
                      width={45}
                    />
                    <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ fontSize: '10px' }} />
                    <Legend wrapperStyle={{ fontSize: '9px' }} />
                    <Bar dataKey="revenue" fill="#3b82f6" name="売上" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#f59e0b" name="経費" radius={[4, 4, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 診療分析 */}
            <div className="bg-white rounded-lg shadow p-2 border border-slate-200 flex-1">
              <h3 className="text-xs font-semibold text-slate-800 mb-1">診療分析</h3>
              <div className="grid grid-cols-2 gap-2 h-[calc(100%-20px)]">
                <div>
                  <h4 className="text-xs text-slate-600 mb-1">自費率推移</h4>
                  <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={[
                      { month: '8月', rate: 78 },
                      { month: '9月', rate: 76 },
                      { month: '10月', rate: 79 },
                      { month: '11月', rate: 82 }
                    ]}>
                      <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                      <YAxis domain={[70, 85]} tick={{ fontSize: 8 }} />
                      <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="text-xs text-slate-600 mb-1">診療メニュー別売上</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>インプラント</span>
                      <span className="font-semibold">¥250万</span>
                    </div>
                    <div className="flex justify-between">
                      <span>矯正</span>
                      <span className="font-semibold">¥180万</span>
                    </div>
                    <div className="flex justify-between">
                      <span>材料費</span>
                      <span className="font-semibold">¥120万</span>
                    </div>
                    <div className="flex justify-between">
                      <span>経費</span>
                      <span className="font-semibold">¥100万</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-2 h-full">
            
            {/* 経費分析 */}
            <div className="bg-white rounded-lg shadow p-2 border border-slate-200" style={{ flex: '0 0 55%' }}>
              <h3 className="text-xs font-semibold text-slate-800 mb-1">経費分析</h3>
              <div className="h-[calc(50%-10px)]">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '材料費', value: 2500000, color: '#3b82f6' },
                      { name: '人件費', value: 1800000, color: '#ef4444' },
                      { name: 'その他', value: 2800000, color: '#10b981' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={50}
                    dataKey="value"
                  >
                    {[
                      { color: '#3b82f6' },
                      { color: '#ef4444' },
                      { color: '#10b981' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              </div>
              <div className="space-y-0.5 text-xs mt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded"></div>
                    <span>材料費</span>
                  </div>
                  <span className="font-semibold">¥250万</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded"></div>
                    <span>人件費</span>
                  </div>
                  <span className="font-semibold">¥180万</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded"></div>
                    <span>その他</span>
                  </div>
                  <span className="font-semibold">¥280万</span>
                </div>
              </div>
            </div>

            {/* To-Do */}
            <div className="bg-white rounded-lg shadow p-2 border border-slate-200 flex-1">
              <h3 className="text-xs font-semibold text-slate-800 mb-1">To-Do</h3>
              <div className="space-y-1">
                <label className="flex items-center space-x-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>未アップロード領収書 (5件)</span>
                </label>
                <label className="flex items-center space-x-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>給与データ確認 (あと2日)</span>
                </label>
                <label className="flex items-center space-x-1 text-xs">
                  <input type="checkbox" className="w-3 h-3" />
                  <span>税理士からの質問に回答</span>
                </label>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200">
                <h4 className="text-xs font-semibold text-slate-700 mb-1">税理士アドバイス</h4>
                <p className="text-xs text-slate-600">12月中の設備投資で節税効果が見込めます</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalTaxDashboard;
