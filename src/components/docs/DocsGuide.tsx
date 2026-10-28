import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  Terminal,
  Database,
  Smartphone,
  Server,
  Layers,
  ChevronDown,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

export const DocsGuide: React.FC = () => {
  const { language } = useApp();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copySnippet = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const steps = [
    {
      num: 1,
      titleEn: 'Step 1: System Requirements & Architecture',
      titleKm: 'ជំហានទី ១៖ ការវិភាគតម្រូវការ និងស្ថាបត្យកម្មប្រព័ន្ធ (Architecture)',
      contentKm: `ប្រព័ន្ធ **Anjali House SIMS** ត្រូវបានរៀបចំឡើងជា ៣ ស្រទាប់ចម្បង (Multi-Tier Enterprise Architecture)៖
1. **Client Tier**: 
   - **Flutter Mobile App**: សម្រាប់លោកគ្រូអ្នកគ្រូ និងបុគ្គលិកទូទៅប្រើលើទូរស័ព្ទដៃ Android/iOS
   - **Responsive Web Dashboard**: សម្រាប់រដ្ឋបាល និងអ្នកគ្រប់គ្រងពិនិត្យមើលស្ថិតិ ចុះឈ្មោះសិស្ស និងទាញយករបាយការណ៍
2. **Application / API Tier**:
   - **ASP.NET Core 8 Web API** ដែលមាន Controllers, DTOs, Repository Services, JWT Bearer Token, និង Entity Framework Core 8
3. **Database Tier**:
   - **Microsoft SQL Server 2022**: តារាងទិន្នន័យ (Tables), កូនសោរចម្បង (Primary Keys), កូនសោរបន្ទាប់បន្សំ (Foreign Keys), Indexes, និង Constraints`,
      contentEn: `The Anjali House SIMS is built with a Clean Multi-Tier Architecture:
1. Client Tier: Flutter Android/iOS App + Responsive Web Admin Dashboard
2. API Tier: ASP.NET Core 8 Web API with JWT Authentication and EF Core
3. Database Tier: Microsoft SQL Server 2022 with normalized schemas and indexes`
    },
    {
      num: 2,
      titleEn: 'Step 2: Database Design & SQL Server Schema',
      titleKm: 'ជំហានទី ២៖ ការរចនា និងបង្កើត Database ក្នុង SQL Server',
      contentKm: `តារាងសំខាន់ៗទាំង ១០ ត្រូវបានបង្កើតឡើងយ៉ាងត្រឹមត្រូវក្នុង SQL Server:
- **Roles & Users**: គ្រប់គ្រងសិទ្ធិប្រើប្រាស់ (Admin, Teacher, Staff)
- **Classes**: គ្រប់គ្រងថ្នាក់រៀនទាំង ៥ (English, Computer, Art, Khmer, Sports)
- **Students**: ផ្ទុកព័ត៌មានលម្អិតសិស្ស, លេខកូដ S0001, អាណាព្យាបាល, និងរូបថត
- **Attendance**: កត់ត្រាវត្តមានប្រចាំថ្ងៃ (Present, Absent, Late, Excused)
- **News, Events, Gallery, FAQs, ContactMessages**

**របៀបដំណើរការក្នុង SQL Server Management Studio (SSMS):**
1. បើក SSMS រួចភ្ជាប់ទៅ Server របស់អ្នក
2. បើកឯកសារ \`database/01_Create_Database_And_Tables.sql\` រួចចុច **F5**
3. បើកឯកសារ \`database/02_Indexes_And_SeedData.sql\` រួចចុច **F5** ដើម្បីបញ្ចូលទិន្នន័យគំរូសៀមរាប`,
      codeSnippet: `CREATE DATABASE AnjaliHouseSIMS;
GO
USE AnjaliHouseSIMS;
GO
-- See full script in Codebase Deliverables tab`
    },
    {
      num: 3,
      titleEn: 'Step 3: ASP.NET Core Web API Configuration',
      titleKm: 'ជំហានទី ៣៖ ការបង្កើត និងកំណត់រចនាសម្ព័ន្ធ ASP.NET Core Web API',
      contentKm: `ASP.NET Core Web API (.NET 8) ផ្តល់ជូននូវ RESTful endpoints ពេញលេញ៖
- កំណត់ Connection String នៅក្នុង \`appsettings.json\`:
  \`\`\`json
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=AnjaliHouseSIMS;User Id=sa;Password=YourStrong@Password123;TrustServerCertificate=True;"
  }
  \`\`\`
- ដំណើរការ API តាមរយៈ Terminal:
  \`\`\`bash
  cd backend/AnjaliHouse.API
  dotnet restore
  dotnet run
  \`\`\`
- ចូលមើល Swagger Documentation: \`http://localhost:5000/swagger\``
    },
    {
      num: 4,
      titleEn: 'Step 4: JWT Authentication & Role Authorization',
      titleKm: 'ជំហានទី ៤៖ ប្រព័ន្ធសុវត្ថិភាព JWT និងសិទ្ធិ Role-Based Authorization',
      contentKm: `រាល់ Request ទៅកាន់ Endpoints នៃប្រព័ន្ធ ត្រូវឆ្លងកាត់ការផ្ទៀងផ្ទាត់ JWT Token:
- \`POST /api/auth/login\`: ទទួលយក username & password រួចត្រលប់នូវ JWT Token មានសុពលភាព ៧ ថ្ងៃ
- \`[Authorize(Roles = "Admin")]\`: ការពារការលុបទិន្នន័យសិស្ស ឬការកែប្រែអ្នកប្រើប្រាស់
- \`[Authorize(Roles = "Admin,Teacher,Staff")]\`: អនុញ្ញាតឱ្យកត់ត្រាវត្តមាន និងបង្កើតព័ត៌មាន`
    },
    {
      num: 5,
      titleEn: 'Step 5: Flutter Mobile UI Implementation',
      titleKm: 'ជំហានទី ៥៖ ការសរសេរកូដផ្ទាំង UI ទាំងអស់លើ Flutter Mobile',
      contentKm: `ផ្ទាំងទាំង ១៦ ត្រូវបានសរសេរឡើងដោយផ្អែកលើ Material 3 និងពណ៌ផ្លូវការរបស់ Anjali House:
- **Splash Screen**: និមិត្តសញ្ញាផ្ទះ និងកុមារ + ប៊ូតុង Login និង Get Started
- **Home Dashboard**: ផ្ទាំងស្វាគមន៍ + ប៊ូតុងផ្លូវកាត់ចំនួន ៨ + ព័ត៌មានចុងក្រោយ
- **Location Screen**: ផែនទីខេត្តសៀមរាប + ភូមិសាលាកន្សែង + ប៊ូតុងបើក Google Maps
- **Contact Us**: ស្លាកទំនាក់ទំនង + ទម្រង់ផ្ញើសារសាកសួរ
- **Q&A / FAQ**: ផ្ទាំងសំណួរ-ចម្លើយ + ប៊ូតុងសួរសំណួរថ្មី
- **Register Student**: ទម្រង់ចុះឈ្មោះសិស្ស + បង្កើតលេខកូដសិស្សស្វ័យប្រវត្តិ
- **Student List & Detail**: ស្វែងរក ត្រងតាមថ្នាក់ និងមើលប័ណ្ណសម្គាល់ខ្លួនសិស្ស (ID Card)`
    },
    {
      num: 6,
      titleEn: 'Step 6: Flutter Networking & API Integration',
      titleKm: 'ជំហានទី ៦៖ ការភ្ជាប់ Flutter ទៅកាន់ ASP.NET Core API',
      contentKm: `ប្រើប្រាស់ Package \`http\` និង \`provider\` ដើម្បីគ្រប់គ្រង State:
- \`ApiService.getStudents()\`: ទាញយកបញ្ជីឈ្មោះសិស្ស
- \`ApiService.registerStudent()\`: បញ្ជូនទិន្នន័យចុះឈ្មោះ
- \`ApiService.recordAttendance()\`: កត់ត្រាវត្តមានប្រចាំថ្ងៃ`
    },
    {
      num: 7,
      titleEn: 'Step 7: Build Android APK Release',
      titleKm: 'ជំហានទី ៧៖ របៀប Build ឯកសារ Android APK សម្រាប់ដំឡើង',
      contentKm: `ដើម្បីបង្កើតឯកសារ APK ផ្លូវការសម្រាប់ដំឡើងលើទូរស័ព្ទដៃ Android:
1. បើក Terminal ក្នុងថត \`anjali_house\`
2. ដំណើរការទាញយក Dependencies:
   \`\`\`bash
   flutter pub get
   \`\`\`
3. បង្កើត Release APK:
   \`\`\`bash
   flutter build apk --release --split-per-abi
   \`\`\`
4. ឯកសារ APK នឹងត្រូវបានបង្កើតក្នុងថត៖
   \`anjali_house/build/app/outputs/flutter-apk/app-arm64-v8a-release.apk\`
   លោកអ្នកអាចផ្ញើឯកសារនេះតាម Telegram ឬ Google Drive ទៅដំឡើងលើទូរស័ព្ទរបស់លោកគ្រូអ្នកគ្រូបានភ្លាមៗ!`
    },
    {
      num: 8,
      titleEn: 'Step 8: Admin Web Dashboard Deployment',
      titleKm: 'ជំហានទី ៨៖ ការ Deploy ផ្ទាំង Admin Web ទៅកាន់ Cloud / Hosting',
      contentKm: `ផ្ទាំងគ្រប់គ្រងរដ្ឋបាល Web អាចដំណើរការបាននៅលើគ្រប់ Browser (Chrome, Safari, Edge):
- Build Web Assets:
  \`\`\`bash
  npm run build
  \`\`\`
- ថត \`dist\` ដែលបានបង្កើតរួច អាចដាក់ដំណើរការលើ Nginx, IIS, Firebase Hosting, ឬ Azure Static Web Apps!`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#087F4F] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {language === 'km' ? 'សៀវភៅណែនាំតម្លើង និងដំណើរការប្រព័ន្ធ (Step 1 ដល់ Step 11)' : 'Complete Setup & Deployment Documentation'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'km' ? 'មគ្គុទ្ទេសក៍ជាភាសាខ្មែរ និងអង់គ្លេសសម្រាប់ Developer' : 'Detailed architectural walkthrough and setup guide in Khmer & English'}
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Steps List */}
      <div className="space-y-3">
        {steps.map((st) => {
          const isExpanded = activeStep === st.num;
          return (
            <div
              key={st.num}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setActiveStep(isExpanded ? 0 : st.num)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#087F4F] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-100">
                    {st.num}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'km' ? st.titleKm : st.titleEn}
                    </h3>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-[#087F4F]" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {isExpanded && (
                <div className="p-5 pt-2 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-700 leading-relaxed space-y-3">
                  <div className="whitespace-pre-line font-sans">
                    {language === 'km' ? st.contentKm : st.contentEn || st.contentKm}
                  </div>

                  {st.codeSnippet && (
                    <div className="relative mt-2">
                      <pre className="p-3 bg-slate-900 text-emerald-400 font-mono rounded-xl text-[11px] overflow-x-auto">
                        {st.codeSnippet}
                      </pre>
                      <button
                        onClick={() => copySnippet(st.codeSnippet!, `step-${st.num}`)}
                        className="absolute top-2 right-2 p-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                      >
                        {copiedKey === `step-${st.num}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
