import { BarChart3, Eye, MousePointer, TrendingUp } from 'lucide-react';

export default function AdminDashboard({ recipes, stats }) {
  const tableData = recipes.map((recipe) => {
    const s = stats[recipe.id] || { views: 0, clicks: 0 };
    const conversion = s.views > 0 ? ((s.clicks / s.views) * 100).toFixed(1) : '0.0';
    return { id: recipe.id, title: recipe.title, views: s.views, clicks: s.clicks, conversion };
  });

  const sorted = [...tableData].sort((a, b) => b.clicks - a.clicks);
  const maxClicks = Math.max(...sorted.map((d) => d.clicks), 1);
  const maxViews = Math.max(...sorted.map((d) => d.views), 1);

  const totalViews = tableData.reduce((sum, d) => sum + d.views, 0);
  const totalClicks = tableData.reduce((sum, d) => sum + d.clicks, 0);
  const avgConversion = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-sage-600 uppercase tracking-widest mb-2 font-sans">
          Panel wewnętrzny
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-800 leading-tight mb-2">
          Analityka
        </h1>
        <p className="text-gray-500 text-sm">
          Statystyki odsłon i kliknięć "Kup E-booka" dla każdego przepisu.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
              <Eye size={16} className="text-blue-500" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Odsłony</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-800">{totalViews}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center">
              <MousePointer size={16} className="text-terracotta-500" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Kliknięcia E-book</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-800">{totalClicks}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-cream-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">Śr. konwersja</span>
          </div>
          <p className="text-2xl font-bold text-charcoal-800">{avgConversion}%</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm overflow-hidden mb-10">
        <div className="px-5 py-4 border-b border-cream-200">
          <h2 className="font-serif text-lg font-semibold text-charcoal-800">Szczegóły przepisów</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-cream-50 text-left">
                <th className="px-5 py-3 font-medium text-charcoal-700">Przepis</th>
                <th className="px-5 py-3 font-medium text-charcoal-700 text-center">Odsłony</th>
                <th className="px-5 py-3 font-medium text-charcoal-700 text-center">Kliknięcia</th>
                <th className="px-5 py-3 font-medium text-charcoal-700 text-center">Konwersja</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => (
                <tr key={row.id} className="border-t border-cream-100 hover:bg-cream-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-charcoal-800 max-w-[200px] sm:max-w-none truncate">
                    {row.title}
                  </td>
                  <td className="px-5 py-3.5 text-center text-gray-600">{row.views}</td>
                  <td className="px-5 py-3.5 text-center text-terracotta-600 font-semibold">{row.clicks}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      parseFloat(row.conversion) > 10
                        ? 'bg-green-50 text-green-700'
                        : parseFloat(row.conversion) > 0
                        ? 'bg-orange-50 text-orange-700'
                        : 'bg-gray-50 text-gray-500'
                    }`}>
                      {row.conversion}%
                    </span>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-400">
                    Brak danych — statystyki pojawią się po pierwszych interakcjach użytkowników.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 size={18} className="text-terracotta-500" />
          <h2 className="font-serif text-lg font-semibold text-charcoal-800">Zainteresowanie E-bookiem</h2>
        </div>

        {sorted.length > 0 ? (
          <div className="space-y-4">
            {sorted.map((row) => (
              <div key={row.id} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-charcoal-700 font-medium truncate max-w-[60%]">
                    {row.title}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye size={11} /> {row.views}
                    </span>
                    <span className="flex items-center gap-1 text-terracotta-600 font-semibold">
                      <MousePointer size={11} /> {row.clicks}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1.5 h-5">
                  <div
                    className="bg-blue-100 rounded-full transition-all duration-500"
                    style={{ width: `${(row.views / maxViews) * 100}%`, minWidth: row.views > 0 ? '4px' : '0' }}
                    title={`${row.views} odsłon`}
                  />
                  <div
                    className="bg-terracotta-400 rounded-full transition-all duration-500"
                    style={{ width: `${(row.clicks / maxClicks) * 100}%`, minWidth: row.clicks > 0 ? '4px' : '0' }}
                    title={`${row.clicks} kliknięć`}
                  />
                </div>
              </div>
            ))}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-cream-200 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-100 rounded-full" /> Odsłony
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-terracotta-400 rounded-full" /> Kliknięcia E-book
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            Brak danych do wyświetlenia.
          </p>
        )}
      </div>
    </div>
  );
}
