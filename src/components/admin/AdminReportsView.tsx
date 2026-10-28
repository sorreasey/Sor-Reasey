import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Download, PieChart, Users, Award, CheckCircle } from 'lucide-react';

export const AdminReportsView: React.FC = () => {
  const { students, classes, attendance, language } = useApp();

  const maleCount = students.filter(s => s.gender === 'Male').length;
  const femaleCount = students.filter(s => s.gender === 'Female').length;

  const downloadFullReport = () => {
    const content = `Anjali House SIMS - Annual Report
Generated: ${new Date().toLocaleDateString()}
Location: Salakanseng Village, Siem Reap, Cambodia

Total Students Enrolled: 320
New Registrations This Term: 28
Active Classes: 5
Average Attendance Rate: 94.5%

Gender Distribution:
- Male: ${maleCount} (${Math.round((maleCount / students.length) * 100)}%)
- Female: ${femaleCount} (${Math.round((femaleCount / students.length) * 100)}%)

Class Enrollments:
- English Class: 120 students
- Computer Class: 80 students
- Art & Creative Expression: 60 students
- Khmer Literacy & Support: 35 students
- Sports & Life Skills: 25 students

Free Nutrition Support:
- 320 daily hot meals provided
- 100% clean drinking water
- Medical & Dental screening: Completed
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Anjali_House_Annual_Report_${new Date().getFullYear()}.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            {language === 'km' ? 'របាយការណ៍ និងស្ថិតិទូទៅ' : 'Reports & Analytics'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'km' ? 'របាយការណ៍លម្អិតអំពីវត្តមាន សមាមាត្រយេនឌ័រ និងការចុះឈ្មោះ' : 'Demographics, attendance compliance, and program growth'}
          </p>
        </div>

        <button
          onClick={downloadFullReport}
          className="px-4 py-2 bg-[#087F4F] hover:bg-[#07583D] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download NGO Annual Report</span>
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Demographics */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#087F4F]" />
            <span>Gender Demographics</span>
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Female Students</span>
                <span className="text-emerald-700">{femaleCount} (52%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#087F4F] rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700">Male Students</span>
                <span className="text-blue-700">{maleCount} (48%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional & Health Program */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Holistic Care Impact</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between text-emerald-900">
              <span className="font-semibold">Free Hot Lunch Meals</span>
              <span className="font-black text-sm">320 daily / 100%</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl flex items-center justify-between text-blue-900">
              <span className="font-semibold">Clean Drinking Water Refills</span>
              <span className="font-black text-sm">2,500 L/month</span>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl flex items-center justify-between text-purple-900">
              <span className="font-semibold">Annual Dental & Vision Check</span>
              <span className="font-black text-sm">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
