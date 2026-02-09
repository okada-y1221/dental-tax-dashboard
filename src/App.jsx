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
    ],
    expenseBreakdown: [
      { name: '材料費', value: 2500000, color: '#3b82f6' },
      { name: '人件費', value: 1800000, color: '#ef4444' },
      { name: '材料費', value: 1200000, color: '#10b981' },
      { name: 'インプラント', value: 1800000, color: '#f59e0b' },
      { name: '加工費', value: 1000000, color: '#8b5cf6' },
      { name: '矯正', value: 900000, color: '#ec4899' }
    ],
    topMenu: [
      { name: 'インプラント', nov: 2500000, prev: 1800000 },
      { name: '矯正', nov: 1800000, prev: 2500000 },
      { name: '材料費', nov: 1200000, prev: 1800000 },
      { name: '経費', nov: 1000000, prev: 900000 }
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

  const EditableNumber = ({ value, onChange, label }) => {
    if (!editMode) {
      return <span className="text-lg sm:text-xl font-bold">{formatCurrency(value)}</span>;
    }
    
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-lg sm:text-xl font-bold bg-white border-2 border-blue-400 rounded px-2 py-1 w-full"
        placeholder={label}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-2 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-sm sm:text-xl lg:text-2xl font-bold tracking-tight">医療DX × Bluetax</h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            {/* Date - Hidden on mobile */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-700/50 px-3 py-2 rounded-lg">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm font-medium">2025年11月</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-700/50 rounded-lg transition">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile - Simplified on mobile */}
            <div className="hidden sm:flex items-center space-x-3 bg-slate-700/50 px-3 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-700 transition">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                ○○
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-sm font-semibold">○○歯科クリニック</div>
                <div className="text-xs text-slate-300">院長様</div>
              </div>
            </div>
            
            {/* Mobile: Just avatar */}
            <div className="sm:hidden w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
              ○○
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex relative">
        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-slate-800 min-h-screen text-white p-6
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Close button for mobile */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <nav className="space-y-2 mt-12 lg:mt-0">
            <a href="#" className="flex items-center space-x-3 bg-slate-700 px-4 py-3 rounded-lg font-medium hover:bg-slate-600 transition">
              <Home className="w-5 h-5" />
              <span>ホーム</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <FileText className="w-5 h-5" />
              <span>取引登録</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <DollarSign className="w-5 h-5" />
              <span>帳簿・レポート</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <FileText className="w-5 h-5" />
              <span>決算・申告</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <Users className="w-5 h-5" />
              <span>人事・労務</span>
            </a>
          </nav>
          
          <div className="mt-8 pt-8 border-t border-slate-700 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <Settings className="w-5 h-5" />
              <span>設定</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <HelpCircle className="w-5 h-5" />
              <span>ヘルプ・お問い合わせ</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <LogOut className="w-5 h-5" />
              <span>ログアウト</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-2 sm:p-4 w-full lg:w-auto h-[calc(100vh-60px)] overflow-y-auto">
          {/* Edit Mode Controls */}
          <div className="mb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">全体サマリー</h2>
            {!editMode ? (
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>データ編集</span>
              </button>
            ) : (
              <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
                >
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>保存</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>キャンセル</span>
                </button>
              </div>
            )}
          </div>

          {editMode && (
            <div className="mb-2 bg-blue-50 border-l-4 border-blue-600 p-2 rounded-lg">
              <p className="text-blue-900 font-medium text-xs">📝 編集モード: 数値をクリックして変更できます</p>
            </div>
          )}

          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            {/* Current Month */}
            <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">今月の経営速報</h3>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-slate-600 mb-1">売上</div>
                  <div className="flex items-center justify-between">
                    <EditableNumber
                      value={editMode ? tempData.currentMonth.revenue : data.currentMonth.revenue}
                      onChange={(v) => updateValue('currentMonth.revenue', v)}
                      label="売上"
                    />
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    保険 {formatCurrency(editMode ? tempData.currentMonth.insurance : data.currentMonth.insurance)}
                  </div>
                  <div className="flex items-center space-x-1 text-green-600 text-sm mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>YoY比較</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">経費</div>
                  <EditableNumber
                    value={editMode ? tempData.currentMonth.expenses : data.currentMonth.expenses}
                    onChange={(v) => updateValue('currentMonth.expenses', v)}
                    label="経費"
                  />
                  <div className="flex items-center space-x-1 text-red-600 text-sm mt-2">
                    <TrendingDown className="w-4 h-4" />
                    <span>YoY比較</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">営業利益</div>
                  <EditableNumber
                    value={editMode ? tempData.currentMonth.profit : data.currentMonth.profit}
                    onChange={(v) => updateValue('currentMonth.profit', v)}
                    label="営業利益"
                  />
                  <div className="flex items-center space-x-1 text-green-600 text-sm mt-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>YoY比較</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Estimate */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">納税見込み額 (2025年度予測)</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-600 mb-1">所得税</div>
                  <EditableNumber
                    value={editMode ? tempData.taxEstimate.income : data.taxEstimate.income}
                    onChange={(v) => updateValue('taxEstimate.income', v)}
                    label="所得税"
                  />
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">消費税</div>
                  <EditableNumber
                    value={editMode ? tempData.taxEstimate.consumption : data.taxEstimate.consumption}
                    onChange={(v) => updateValue('taxEstimate.consumption', v)}
                    label="消費税"
                  />
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">住民税</div>
                  <EditableNumber
                    value={editMode ? tempData.taxEstimate.resident : data.taxEstimate.resident}
                    onChange={(v) => updateValue('taxEstimate.resident', v)}
                    label="住民税"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-600 mb-2">納税資金準備状況: 65%</div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>

            {/* Cash Flow Alert */}
            <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition">
              <div className="flex items-start space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg font-semibold">資金繰り予測アラート</h3>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">3ヶ月キャッシュロー予想</h4>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={editMode ? tempData.cashFlow : data.cashFlow}>
                    <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={3} dot={{ fill: '#fff', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                <p className="text-sm font-medium">⚠️ 2026年1月に資金不足のリスクがあります</p>
              </div>
              <button className="mt-4 w-full bg-white text-red-600 font-semibold py-3 rounded-lg hover:bg-slate-50 transition">
                対策を確認する
              </button>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
            {/* Monthly Trend */}
            <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">月次推移 (直近12ヶ月)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <ComposedChart data={editMode ? tempData.monthlyData : data.monthlyData} margin={{ left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    tickFormatter={(value) => `${(value / 10000).toFixed(0)}万`}
                    width={60}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="売上(保険/自費)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expenses" fill="#f59e0b" name="経費" radius={[8, 8, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Diagnosis Analysis */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">診療分析</h3>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-600 mb-2">自費率推移</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={[
                    { month: '5月', rate: 72 },
                    { month: '6月', rate: 75 },
                    { month: '7月', rate: 77 },
                    { month: '8月', rate: 78 },
                    { month: '9月', rate: 76 },
                    { month: '10月', rate: 79 },
                    { month: '11月', rate: 82 },
                    { month: '12月', rate: 80 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#64748b' }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} name="自費率" />
                    <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} name="ターゲット" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-600 mb-3">11月度 診療メニュー別売上トップ5</h4>
                <div className="space-y-2">
                  {(editMode ? tempData.topMenu : data.topMenu).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold text-slate-900">{formatCurrency(item.nov)}</span>
                        <span className="text-xs text-slate-500">{formatCurrency(item.prev)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* Expense Breakdown */}
            <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">経費分析</h3>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={editMode ? tempData.expenseBreakdown : data.expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {(editMode ? tempData.expenseBreakdown : data.expenseBreakdown).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {(editMode ? tempData.expenseBreakdown : data.expenseBreakdown).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-700">{item.name}</span>
                    </div>
                    <span className="font-semibold text-slate-900">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action & Management */}
            <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">To-Do & アドバイス</h3>
              <div className="mb-3">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 p-2 bg-slate-50 rounded hover:bg-slate-100 transition cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-slate-800">未アップロード領収書 (5件)</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2 p-2 bg-slate-50 rounded hover:bg-slate-100 transition cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-slate-800">給与データ確認 (あと2日)</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2 p-2 bg-slate-50 rounded hover:bg-slate-100 transition cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-slate-800">税理士からの質問に回答</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold text-slate-700 mb-2">税理士アドバイス</h4>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 font-medium mb-2">今月の材料費率が前年比+2.5%となっています。在庫管理の見直しを推奨します。</p>
                      <p className="text-xs text-slate-500">税理士より</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment Investment */}
            <div className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-800 mb-2">設備投資計画</h3>
              <div className="space-y-2 mb-2">
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-xs text-slate-600">ユニット2台</div>
                  <div className="text-sm font-bold text-slate-900">¥30,000</div>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-xs text-slate-600">予定期限</div>
                  <div className="text-sm font-bold text-slate-900">¥2,000,000</div>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <div className="text-xs text-slate-600">CT</div>
                  <div className="text-sm font-bold text-slate-900">¥1,800,000</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-slate-600 mb-1">ローン返済</h4>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={[
                    { month: '1月', value: 10000 },
                    { month: '2月', value: 12000 },
                    { month: '3月', value: 14000 },
                    { month: '4月', value: 16000 },
                    { month: '5月', value: 15000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DentalTaxDashboard;
