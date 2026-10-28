export interface CodeFile {
  path: string;
  category: 'Flutter' | 'ASPNET' | 'SQLServer' | 'Docs';
  language: 'dart' | 'csharp' | 'sql' | 'markdown' | 'yaml' | 'json';
  descriptionKhmer: string;
  descriptionEnglish: string;
  content: string;
}

export const CODE_DELIVERABLES: CodeFile[] = [
  // ==========================================
  // FLUTTER MOBILE APP CODE FILES
  // ==========================================
  {
    path: 'anjali_house/pubspec.yaml',
    category: 'Flutter',
    language: 'yaml',
    descriptionKhmer: 'ឯកសារកំណត់រចនាសម្ព័ន្ធ Flutter និង Packages ទាំងអស់ដែលត្រូវប្រើ',
    descriptionEnglish: 'Flutter project configuration and all required dependencies',
    content: `name: anjali_house
description: Anjali House Student Information Management System Mobile App
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.3.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter
  intl: ^0.19.0
  http: ^1.2.1
  provider: ^6.1.2
  shared_preferences: ^2.2.2
  google_fonts: ^6.1.0
  url_launcher: ^6.2.5
  image_picker: ^1.0.7
  cached_network_image: ^3.3.1
  flutter_staggered_animations: ^1.1.1
  fl_chart: ^0.66.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
`
  },
  {
    path: 'anjali_house/lib/main.dart',
    category: 'Flutter',
    language: 'dart',
    descriptionKhmer: 'ចំណុចចាប់ផ្តើមនៃកម្មវិធីទូរស័ព្ទ Flutter (Entry point)',
    descriptionEnglish: 'Flutter mobile application entry point with providers and routing',
    content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'theme/app_theme.dart';
import 'providers/student_provider.dart';
import 'providers/attendance_provider.dart';
import 'providers/auth_provider.dart';
import 'screens/splash_screen.dart';
import 'screens/login_screen.dart';
import 'screens/home_screen.dart';
import 'screens/student_list_screen.dart';
import 'screens/register_student_screen.dart';
import 'screens/attendance_screen.dart';
import 'screens/location_screen.dart';
import 'screens/contact_screen.dart';
import 'screens/faq_screen.dart';
import 'screens/gallery_screen.dart';
import 'screens/about_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AnjaliHouseApp());
}

class AnjaliHouseApp extends StatelessWidget {
  const AnjaliHouseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => StudentProvider()),
        ChangeNotifierProvider(create: (_) => AttendanceProvider()),
      ],
      child: MaterialApp(
        title: 'Anjali House SIMS',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        initialRoute: '/',
        routes: {
          '/': (context) => const SplashScreen(),
          '/login': (context) => const LoginScreen(),
          '/home': (context) => const HomeScreen(),
          '/students': (context) => const StudentListScreen(),
          '/register': (context) => const RegisterStudentScreen(),
          '/attendance': (context) => const AttendanceScreen(),
          '/location': (context) => const LocationScreen(),
          '/contact': (context) => const ContactScreen(),
          '/faq': (context) => const FaqScreen(),
          '/gallery': (context) => const GalleryScreen(),
          '/about': (context) => const AboutScreen(),
        },
      ),
    );
  }
}
`
  },
  {
    path: 'anjali_house/lib/theme/app_theme.dart',
    category: 'Flutter',
    language: 'dart',
    descriptionKhmer: 'រចនាបថ និងពណ៍ផ្លូវការ (Color Palette & Theme Mode)',
    descriptionEnglish: 'App color scheme, typography, button styles matching NGO guidelines',
    content: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Official Anjali House Brand Colors
  static const Color primaryGreen = Color(0xFF087F4F);
  static const Color darkGreen = Color(0xFF07583D);
  static const Color accentGreen = Color(0xFF10B981);
  static const Color backgroundGrey = Color(0xFFF5F7F6);
  static const Color cardWhite = Colors.white;
  static const Color textDark = Color(0xFF1E293B);
  static const Color textMuted = Color(0xFF64748B);
  static const Color errorRed = Color(0xFFEF4444);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryGreen,
        primary: primaryGreen,
        secondary: darkGreen,
        background: backgroundGrey,
        surface: cardWhite,
      ),
      scaffoldBackgroundColor: backgroundGrey,
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: GoogleFonts.inter(
          fontSize: 28,
          fontWeight: FontWeight.bold,
          color: textDark,
        ),
        titleLarge: GoogleFonts.inter(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: textDark,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          color: textDark,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: textDark,
        elevation: 0,
        centerTitle: true,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryGreen,
          foregroundColor: Colors.white,
          minimumSize: const Size.fromHeight(50),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'anjali_house/lib/models/student_model.dart',
    category: 'Flutter',
    language: 'dart',
    descriptionKhmer: 'ទម្រង់ទិន្នន័យសិស្ស (Student Model with JSON serialization)',
    descriptionEnglish: 'Student data entity with JSON parsing and mapping methods',
    content: `class Student {
  final String id;
  final String fullName;
  final String fullNameKhmer;
  final DateTime dateOfBirth;
  final String gender;
  final int classId;
  final String className;
  final String guardianName;
  final String guardianPhone;
  final String address;
  final String? photoUrl;
  final String status;
  final DateTime registeredDate;
  final String? notes;

  Student({
    required this.id,
    required this.fullName,
    required this.fullNameKhmer,
    required this.dateOfBirth,
    required this.gender,
    required this.classId,
    required this.className,
    required this.guardianName,
    required this.guardianPhone,
    required this.address,
    this.photoUrl,
    required this.status,
    required this.registeredDate,
    this.notes,
  });

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: json['id'] ?? '',
      fullName: json['fullName'] ?? '',
      fullNameKhmer: json['fullNameKhmer'] ?? '',
      dateOfBirth: DateTime.parse(json['dateOfBirth']),
      gender: json['gender'] ?? 'Male',
      classId: json['classId'] ?? 1,
      className: json['className'] ?? '',
      guardianName: json['guardianName'] ?? '',
      guardianPhone: json['guardianPhone'] ?? '',
      address: json['address'] ?? '',
      photoUrl: json['photoUrl'],
      status: json['status'] ?? 'Active',
      registeredDate: DateTime.parse(json['registeredDate'] ?? DateTime.now().toIso8601String()),
      notes: json['notes'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'fullName': fullName,
      'fullNameKhmer': fullNameKhmer,
      'dateOfBirth': dateOfBirth.toIso8601String().substring(0, 10),
      'gender': gender,
      'classId': classId,
      'className': className,
      'guardianName': guardianName,
      'guardianPhone': guardianPhone,
      'address': address,
      'photoUrl': photoUrl,
      'status': status,
      'registeredDate': registeredDate.toIso8601String().substring(0, 10),
      'notes': notes,
    };
  }
}
`
  },
  {
    path: 'anjali_house/lib/services/api_service.dart',
    category: 'Flutter',
    language: 'dart',
    descriptionKhmer: 'សេវាកម្មហៅ RESTful API ទៅកាន់ ASP.NET Core Backend',
    descriptionEnglish: 'HTTP networking client for interacting with ASP.NET Core API',
    content: `import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/student_model.dart';

class ApiService {
  // Update with your machine IP when testing on real Android device
  static const String baseUrl = 'http://10.0.2.2:5000/api';
  String? _jwtToken;

  void setToken(String token) {
    _jwtToken = token;
  }

  Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_jwtToken != null) 'Authorization': 'Bearer $_jwtToken',
      };

  Future<List<Student>> getStudents({String? search, int? classId}) async {
    final uri = Uri.parse('$baseUrl/students').replace(queryParameters: {
      if (search != null && search.isNotEmpty) 'search': search,
      if (classId != null) 'classId': classId.toString(),
    });

    final res = await http.get(uri, headers: _headers);
    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => Student.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load students: \${res.body}');
    }
  }

  Future<Student> registerStudent(Map<String, dynamic> data) async {
    final res = await http.post(
      Uri.parse('$baseUrl/students'),
      headers: _headers,
      body: jsonEncode(data),
    );
    if (res.statusCode == 201) {
      return Student.fromJson(jsonDecode(res.body));
    } else {
      throw Exception('Failed to register student: \${res.body}');
    }
  }

  Future<bool> deleteStudent(String studentId) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/students/$studentId'),
      headers: _headers,
    );
    return res.statusCode == 200 || res.statusCode == 204;
  }
}
`
  },
  {
    path: 'anjali_house/lib/screens/home_screen.dart',
    category: 'Flutter',
    language: 'dart',
    descriptionKhmer: 'ផ្ទាំងដើម (Home Dashboard) ស្របតាមរូបភាពគំរូ Screen 2',
    descriptionEnglish: 'Home screen matching design with shortcuts, greetings, and news',
    content: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.backgroundGrey,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top Header with greeting
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Text('Hello, Panha ', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
                          Text('👋', style: TextStyle(fontSize: 20)),
                        ],
                      ),
                      const SizedBox(height: 2),
                      const Text('Good Morning!', style: TextStyle(color: AppTheme.textMuted, fontSize: 14)),
                    ],
                  ),
                  IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.notifications_none, color: Colors.black87),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              // Banner Photo of smiling students
              ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: Image.asset(
                  'assets/images/banner_students.png',
                  height: 150,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(height: 20),

              // 8 Grid Action Shortcuts
              GridView.count(
                crossAxisCount: 3,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                children: [
                  _buildQuickAction(context, Icons.person_add_alt_1, 'Register', '/register', Colors.green),
                  _buildQuickAction(context, Icons.people, 'Students', '/students', Colors.blue),
                  _buildQuickAction(context, Icons.article, 'News', '/news', Colors.orange),
                  _buildQuickAction(context, Icons.event, 'Events', '/events', Colors.purple),
                  _buildQuickAction(context, Icons.location_on, 'Location', '/location', Colors.redAccent),
                  _buildQuickAction(context, Icons.photo_library, 'Gallery', '/gallery', Colors.teal),
                  _buildQuickAction(context, Icons.help_outline, 'Q&A', '/faq', Colors.amber.shade700),
                  _buildQuickAction(context, Icons.headset_mic, 'Contact', '/contact', Colors.lightBlue),
                  _buildQuickAction(context, Icons.info_outline, 'About Us', '/about', AppTheme.primaryGreen),
                ],
              ),
              const SizedBox(height: 24),

              // Latest News Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Latest News', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  TextButton(
                    onPressed: () => Navigator.pushNamed(context, '/news'),
                    child: const Text('View All', style: TextStyle(color: AppTheme.primaryGreen)),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              // Latest News Card
              Card(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                elevation: 1,
                child: ListTile(
                  leading: ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.asset('assets/images/news_thumb.png', width: 50, height: 50, fit: BoxFit.cover),
                  ),
                  title: const Text('New English Class Starts', style: TextStyle(fontWeight: FontWeight.bold)),
                  subtitle: const Text('May 15, 2024'),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {},
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickAction(BuildContext ctx, IconData icon, String title, String route, Color color) {
    return InkWell(
      onTap: () => Navigator.pushNamed(ctx, route),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4, offset: const Offset(0, 2)),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500)),
          ],
        ),
      ),
    );
  }
}
`
  },

  // ==========================================
  // ASP.NET CORE WEB API (.NET 8) CODE FILES
  // ==========================================
  {
    path: 'backend/AnjaliHouse.API/Program.cs',
    category: 'ASPNET',
    language: 'csharp',
    descriptionKhmer: 'ឯកសារមេកំណត់ Services, Database, JWT Authentication និង CORS',
    descriptionEnglish: 'ASP.NET Core Web API startup, DI container, JWT Bearer and DB setup',
    content: `using System.Text;
using AnjaliHouse.API.Data;
using AnjaliHouse.API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1. Configure SQL Server with Entity Framework Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Server=(localdb)\\\\mssqllocaldb;Database=AnjaliHouseDb;Trusted_Connection=True;MultipleActiveResultSets=true";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// 2. Register Application Services
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IAttendanceService, AttendanceService>();

// 3. JWT Authentication Setup
var jwtKey = builder.Configuration["Jwt:Key"] ?? "AnjaliHouseSuperSecretSecretKeySiemReapCambodia2024!";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "AnjaliHouseAPI";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtIssuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdmin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("RequireStaff", policy => policy.RequireRole("Admin", "Staff", "Teacher"));
});

// 4. CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// 5. Swagger with Bearer Token documentation
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Anjali House SIMS API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \\"Bearer {token}\\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
`
  },
  {
    path: 'backend/AnjaliHouse.API/appsettings.json',
    category: 'ASPNET',
    language: 'json',
    descriptionKhmer: 'ឯកសារកំណត់រចនាសម្ព័ន្ធ Connection String និង JWT Key',
    descriptionEnglish: 'Configuration settings including SQL Server connection and JWT token keys',
    content: `{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=AnjaliHouseSIMS;User Id=sa;Password=YourStrong@Password123;TrustServerCertificate=True;MultipleActiveResultSets=true;"
  },
  "Jwt": {
    "Key": "AnjaliHouseSuperSecretSecretKeySiemReapCambodia2024!",
    "Issuer": "AnjaliHouseAPI",
    "ExpiryDays": 7
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
`
  },
  {
    path: 'backend/AnjaliHouse.API/Data/ApplicationDbContext.cs',
    category: 'ASPNET',
    language: 'csharp',
    descriptionKhmer: 'Entity Framework Core Database Context និង Relationships',
    descriptionEnglish: 'EF Core DbContext mapping SQL Server tables, keys, and foreign keys',
    content: `using Microsoft.EntityFrameworkCore;
using AnjaliHouse.API.Models;

namespace AnjaliHouse.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; } = null!;
        public DbSet<ClassEntity> Classes { get; set; } = null!;
        public DbSet<Attendance> Attendances { get; set; } = null!;
        public DbSet<NewsItem> News { get; set; } = null!;
        public DbSet<EventItem> Events { get; set; } = null!;
        public DbSet<GalleryItem> Gallery { get; set; } = null!;
        public DbSet<FAQItem> FAQs { get; set; } = null!;
        public DbSet<ContactMessage> ContactMessages { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Student relationships
            modelBuilder.Entity<Student>()
                .HasOne(s => s.Class)
                .WithMany(c => c.Students)
                .HasForeignKey(s => s.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            // Attendance relationships
            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.Student)
                .WithMany()
                .HasForeignKey(a => a.StudentId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.Class)
                .WithMany()
                .HasForeignKey(a => a.ClassId)
                .OnDelete(DeleteBehavior.Restrict);

            // Unique index on Student Code
            modelBuilder.Entity<Student>()
                .HasIndex(s => s.StudentCode)
                .IsUnique();
        }
    }
}
`
  },
  {
    path: 'backend/AnjaliHouse.API/Controllers/StudentsController.cs',
    category: 'ASPNET',
    language: 'csharp',
    descriptionKhmer: 'API Controller សម្រាប់គ្រប់គ្រងទិន្នន័យសិស្ស (Full CRUD)',
    descriptionEnglish: 'RESTful API controller for Student Create, Read, Update, Delete with filters',
    content: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnjaliHouse.API.Data;
using AnjaliHouse.API.Models;
using AnjaliHouse.API.DTOs;

namespace AnjaliHouse.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/students?search=sok&classId=1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentDto>>> GetStudents([FromQuery] string? search, [FromQuery] int? classId)
        {
            var query = _context.Students.Include(s => s.Class).AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                var term = search.Trim().ToLower();
                query = query.Where(s => s.FullName.ToLower().Contains(term) 
                                      || s.FullNameKhmer.Contains(term) 
                                      || s.StudentCode.ToLower().Contains(term)
                                      || s.GuardianPhone.Contains(term));
            }

            if (classId.HasValue && classId.Value > 0)
            {
                query = query.Where(s => s.ClassId == classId.Value);
            }

            var students = await query.OrderByDescending(s => s.CreatedAt).ToListAsync();
            return Ok(students.Select(s => s.ToDto()));
        }

        // GET: api/students/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentDto>> GetStudent(string id)
        {
            var student = await _context.Students
                .Include(s => s.Class)
                .FirstOrDefaultAsync(s => s.StudentCode == id || s.Id.ToString() == id);

            if (student == null) return NotFound(new { message = "Student not found" });

            return Ok(student.ToDto());
        }

        // POST: api/students (Register student)
        [HttpPost]
        public async Task<ActionResult<StudentDto>> CreateStudent([FromBody] CreateStudentDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Auto-generate next Student Code: S0001
            var count = await _context.Students.CountAsync();
            var nextCode = $"S{(count + 1).ToString("D4")}";

            var student = new Student
            {
                StudentCode = nextCode,
                FullName = dto.FullName,
                FullNameKhmer = dto.FullNameKhmer,
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender,
                ClassId = dto.ClassId,
                GuardianName = dto.GuardianName,
                GuardianPhone = dto.GuardianPhone,
                Address = dto.Address,
                PhotoUrl = dto.PhotoUrl ?? "assets/images/default_avatar.png",
                Status = "Active",
                CreatedAt = DateTime.UtcNow
            };

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentCode }, student.ToDto());
        }

        // PUT: api/students/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(string id, [FromBody] UpdateStudentDto dto)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.StudentCode == id);
            if (student == null) return NotFound();

            student.FullName = dto.FullName;
            student.FullNameKhmer = dto.FullNameKhmer;
            student.DateOfBirth = dto.DateOfBirth;
            student.Gender = dto.Gender;
            student.ClassId = dto.ClassId;
            student.GuardianName = dto.GuardianName;
            student.GuardianPhone = dto.GuardianPhone;
            student.Address = dto.Address;
            student.Status = dto.Status;
            student.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(student.ToDto());
        }

        // DELETE: api/students/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(string id)
        {
            var student = await _context.Students.FirstOrDefaultAsync(s => s.StudentCode == id);
            if (student == null) return NotFound();

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
`
  },
  {
    path: 'backend/AnjaliHouse.API/Controllers/AttendanceController.cs',
    category: 'ASPNET',
    language: 'csharp',
    descriptionKhmer: 'API Controller សម្រាប់កត់ត្រាវត្តមានសិស្សប្រចាំថ្ងៃ (Daily Attendance)',
    descriptionEnglish: 'Controller for recording, updating, and reporting student daily attendance',
    content: `using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AnjaliHouse.API.Data;
using AnjaliHouse.API.Models;
using AnjaliHouse.API.DTOs;

namespace AnjaliHouse.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AttendanceController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/attendance?date=2024-05-15&classId=1
        [HttpGet]
        public async Task<IActionResult> GetAttendance([FromQuery] DateTime? date, [FromQuery] int? classId)
        {
            var targetDate = date?.Date ?? DateTime.Today;
            var query = _context.Attendances
                .Include(a => a.Student)
                .Include(a => a.Class)
                .Where(a => a.Date.Date == targetDate);

            if (classId.HasValue && classId.Value > 0)
            {
                query = query.Where(a => a.ClassId == classId.Value);
            }

            var records = await query.ToListAsync();
            return Ok(records);
        }

        // POST: api/attendance/bulk
        [HttpPost("bulk")]
        public async Task<IActionResult> SaveBulkAttendance([FromBody] BulkAttendanceDto dto)
        {
            foreach (var item in dto.Records)
            {
                var existing = await _context.Attendances
                    .FirstOrDefaultAsync(a => a.StudentId == item.StudentId && a.Date.Date == dto.Date.Date);

                if (existing != null)
                {
                    existing.Status = item.Status;
                    existing.Remarks = item.Remarks;
                }
                else
                {
                    _context.Attendances.Add(new Attendance
                    {
                        StudentId = item.StudentId,
                        ClassId = dto.ClassId,
                        Date = dto.Date.Date,
                        Status = item.Status,
                        Remarks = item.Remarks
                    });
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Attendance records saved successfully." });
        }
    }
}
`
  },

  // ==========================================
  // SQL SERVER DATABASE SCHEMA SCRIPTS (T-SQL)
  // ==========================================
  {
    path: 'database/01_Create_Database_And_Tables.sql',
    category: 'SQLServer',
    language: 'sql',
    descriptionKhmer: 'ស្គ្រីបបង្កើត Database និង Tables ទាំងអស់ជាមួយ Foreign Keys & Constraints',
    descriptionEnglish: 'Complete T-SQL script to create AnjaliHouseSIMS database and core tables',
    content: `-- ========================================================
-- DATABASE: AnjaliHouseSIMS (Student Information Management System)
-- NGO Location: Salakanseng Village, Siem Reap, Cambodia
-- Author: Senior Database Architect
-- ========================================================

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'AnjaliHouseSIMS')
BEGIN
    CREATE DATABASE AnjaliHouseSIMS;
END
GO

USE AnjaliHouseSIMS;
GO

-- 1. Roles Table
CREATE TABLE Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(255) NULL
);

-- 2. Users Table
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    RoleId INT NOT NULL,
    AvatarUrl NVARCHAR(255) NULL,
    IsActive BIT DEFAULT 1 NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL,
    CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
);

-- 3. Classes Table
CREATE TABLE Classes (
    ClassId INT IDENTITY(1,1) PRIMARY KEY,
    ClassName NVARCHAR(100) NOT NULL,
    ClassNameKhmer NVARCHAR(150) NOT NULL,
    RoomNumber NVARCHAR(50) NOT NULL,
    TeacherName NVARCHAR(100) NOT NULL,
    Schedule NVARCHAR(100) NOT NULL,
    ColorHex NVARCHAR(20) DEFAULT '#087F4F' NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL
);

-- 4. Students Table
CREATE TABLE Students (
    StudentId INT IDENTITY(1,1) PRIMARY KEY,
    StudentCode NVARCHAR(20) NOT NULL UNIQUE, -- e.g. S0001, S0002
    FullName NVARCHAR(100) NOT NULL,
    FullNameKhmer NVARCHAR(150) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender NVARCHAR(10) NOT NULL, -- Male, Female, Other
    ClassId INT NOT NULL,
    GuardianName NVARCHAR(100) NOT NULL,
    GuardianPhone NVARCHAR(30) NOT NULL,
    Address NVARCHAR(255) NOT NULL,
    PhotoUrl NVARCHAR(255) NULL,
    Status NVARCHAR(20) DEFAULT 'Active' NOT NULL, -- Active, Inactive, Graduated
    Notes NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL,
    UpdatedAt DATETIME2 NULL,
    CONSTRAINT FK_Students_Classes FOREIGN KEY (ClassId) REFERENCES Classes(ClassId)
);

-- 5. Attendance Table
CREATE TABLE Attendance (
    AttendanceId INT IDENTITY(1,1) PRIMARY KEY,
    StudentId INT NOT NULL,
    ClassId INT NOT NULL,
    Date DATE NOT NULL,
    Status NVARCHAR(20) NOT NULL, -- Present, Absent, Late, Excused
    Remarks NVARCHAR(255) NULL,
    RecordedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL,
    CONSTRAINT FK_Attendance_Students FOREIGN KEY (StudentId) REFERENCES Students(StudentId) ON DELETE CASCADE,
    CONSTRAINT FK_Attendance_Classes FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    CONSTRAINT UQ_Student_Attendance_Date UNIQUE (StudentId, Date)
);

-- 6. News Table
CREATE TABLE News (
    NewsId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    TitleKhmer NVARCHAR(250) NOT NULL,
    Summary NVARCHAR(500) NOT NULL,
    SummaryKhmer NVARCHAR(500) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    ImageUrl NVARCHAR(255) NULL,
    Author NVARCHAR(100) NOT NULL,
    PublishedDate DATE DEFAULT CAST(GETDATE() AS DATE) NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL
);

-- 7. Events Table
CREATE TABLE Events (
    EventId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    TitleKhmer NVARCHAR(250) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    EventDate DATE NOT NULL,
    EventTime NVARCHAR(50) NOT NULL,
    Location NVARCHAR(200) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    ParticipantsCount INT DEFAULT 0 NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL
);

-- 8. Gallery Table
CREATE TABLE Gallery (
    PhotoId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(150) NOT NULL,
    TitleKhmer NVARCHAR(200) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    ImageUrl NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL
);

-- 9. FAQs Table
CREATE TABLE FAQs (
    FaqId INT IDENTITY(1,1) PRIMARY KEY,
    Question NVARCHAR(300) NOT NULL,
    QuestionKhmer NVARCHAR(350) NOT NULL,
    Answer NVARCHAR(MAX) NOT NULL,
    AnswerKhmer NVARCHAR(MAX) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    SortOrder INT DEFAULT 0 NOT NULL
);

-- 10. ContactMessages Table
CREATE TABLE ContactMessages (
    MessageId INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(30) NOT NULL,
    Subject NVARCHAR(200) NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(20) DEFAULT 'Unread' NOT NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME() NOT NULL
);
GO
`
  },
  {
    path: 'database/02_Indexes_And_SeedData.sql',
    category: 'SQLServer',
    language: 'sql',
    descriptionKhmer: 'Indexes សម្រាប់បង្កើនល្បឿន Query និងទិន្នន័យគំរូសៀមរាប (Sample Data)',
    descriptionEnglish: 'Performance indexes and realistic Siem Reap student seed data',
    content: `USE AnjaliHouseSIMS;
GO

-- Create Indexes for fast searching & reporting
CREATE NONCLUSTERED INDEX IX_Students_ClassId ON Students(ClassId);
CREATE NONCLUSTERED INDEX IX_Students_FullName ON Students(FullName);
CREATE NONCLUSTERED INDEX IX_Students_Status ON Students(Status);
CREATE NONCLUSTERED INDEX IX_Attendance_Date ON Attendance(Date);
CREATE NONCLUSTERED INDEX IX_Attendance_ClassDate ON Attendance(ClassId, Date);
GO

-- Seed Roles
INSERT INTO Roles (RoleName, Description) VALUES 
('Admin', 'Full administrative privileges across SIMS system'),
('Teacher', 'Can mark attendance, view students, create news'),
('Staff', 'View student info, manage contacts and events');

-- Seed Classes
INSERT INTO Classes (ClassName, ClassNameKhmer, RoomNumber, TeacherName, Schedule, ColorHex) VALUES
('English Class Level 1 & 2', N'ថ្នាក់ភាសាអង់គ្លេស កម្រិត ១ និង ២', 'Room A-101', 'Teacher Panha Keo', 'Mon - Fri | 8:00 AM - 10:30 AM', '#087F4F'),
('Computer Literacy', N'ថ្នាក់កុំព្យូទ័រ និងបច្ចេកវិទ្យា', 'Lab B-204', 'Teacher Dara Vong', 'Mon - Fri | 1:30 PM - 3:30 PM', '#3B82F6'),
('Art & Creative Expression', N'ថ្នាក់សិល្បៈ និងការបញ្ចេញគំនិតច្នៃប្រឌិត', 'Studio C-102', 'Teacher Sreymom Pich', 'Tue & Thu | 3:30 PM - 5:00 PM', '#F59E0B'),
('Khmer Literacy & Support', N'ថ្នាក់អក្ខរកម្មភាសាខ្មែរ', 'Room A-103', 'Teacher Chantrea Som', 'Mon - Fri | 10:30 AM - 12:00 PM', '#8B5CF6'),
('Sports & Life Skills', N'ថ្នាក់កីឡា និងបំណិនជីវិត', 'Field & Hall', 'Coach Rithy Kim', 'Wed & Sat | 8:30 AM - 10:30 AM', '#EC4899');

-- Seed Students
INSERT INTO Students (StudentCode, FullName, FullNameKhmer, DateOfBirth, Gender, ClassId, GuardianName, GuardianPhone, Address, Status) VALUES
('S0001', 'Sok Chetra', N'សុខ ចិត្រា', '2012-04-12', 'Male', 1, 'Sok Samnang', '+855 12 889 012', N'ភូមិសាលាកន្សែង សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប', 'Active'),
('S0002', 'Chan Davit', N'ចាន់ ដាវីត', '2011-08-25', 'Male', 2, 'Chan Kosal', '+855 77 345 901', N'ភូមិវត្តបូព៌ សង្កាត់សាលាកំរើក ក្រុងសៀមរាប', 'Active'),
('S0003', 'Meas Sreyneang', N'មាស ស្រីនាង', '2013-11-03', 'Female', 1, 'Meas Sarun', '+855 88 456 712', N'ភូមិមណ្ឌល១ សង្កាត់ស្វាយដង្គំ ក្រុងសៀមរាប', 'Active'),
('S0004', 'Long Vicheka', N'ឡុង វិច្ឆិកា', '2012-01-19', 'Female', 3, 'Long Phally', '+855 93 112 458', N'ភូមិជ្រាវ សង្កាត់ជ្រាវ ក្រុងសៀមរាប', 'Active'),
('S0005', 'Keo Panha', N'កែវ បញ្ញា', '2010-06-30', 'Male', 2, 'Keo Sophea', '+855 17 654 321', N'ភូមិស្លក្រាម សង្កាត់ស្លក្រាម ក្រុងសៀមរាប', 'Active');
GO
`
  },

  // ==========================================
  // DOCUMENTATION & SETUP GUIDE (KHMER & ENGLISH)
  // ==========================================
  {
    path: 'docs/SETUP_GUIDE_KHMER_ENGLISH.md',
    category: 'Docs',
    language: 'markdown',
    descriptionKhmer: 'សៀវភៅណែនាំតម្លើង និងដំណើរការប្រព័ន្ធទាំងមូល (Step 1 ដល់ Step 11)',
    descriptionEnglish: 'Complete setup guide from Step 1 to Step 11 for Windows, VS Code, SQL Server, and APK Build',
    content: `# មគ្គុទ្ទេសក៍ណែនាំតម្លើង និងដំណើរការប្រព័ន្ធ Anjali House SIMS
## Complete Setup Guide for Anjali House Student Information Management System

---

### ជំហានទី ១៖ ការវិភាគតម្រូវការ និងស្ថាបត្យកម្មប្រព័ន្ធ (Step 1: Architecture & Requirements)
ប្រព័ន្ធ Anjali House SIMS ត្រូវបានរចនាឡើងជាលក្ខណៈ **Clean Multi-Tier Architecture**:
1. **Frontend Client**: Flutter (Android Mobile) + React/Flutter Web (Admin Dashboard)
2. **Backend Web API**: ASP.NET Core 8 Web API ផ្តល់ជូន RESTful endpoints, JWT Authentication, និង Role-Based Authorization
3. **Database Layer**: Microsoft SQL Server (Transact-SQL) រក្សាទុកទិន្នន័យសិស្ស វត្តមាន ព័ត៌មាន ព្រឹត្តិការណ៍ និងរូបភាព

---

### ជំហានទី ២៖ ការរៀបចំ Database ក្នុង SQL Server (Step 2: SQL Server Database Setup)
1. បើកកម្មវិធី **SQL Server Management Studio (SSMS)** ឬ **Azure Data Studio**
2. ភ្ជាប់ទៅកាន់ Server (ឧទាហរណ៍៖ \`localhost\` ឬ \`.\\SQLEXPRESS\`)
3. បើកឯកសារ \`database/01_Create_Database_And_Tables.sql\` រួចចុច **Execute (F5)** ដើម្បីបង្កើត Tables និង Foreign Keys
4. បើកឯកសារ \`database/02_Indexes_And_SeedData.sql\` រួចចុច **Execute (F5)** ដើម្បីបញ្ចូលទិន្នន័យគំរូសិស្ស និងថ្នាក់រៀន

---

### ជំហានទី ៣៖ ការដំណើរការ ASP.NET Core Web API (Step 3: Run ASP.NET Core Web API)
1. បើក **Visual Studio 2022** ឬ **VS Code** ក្នុងថត \`backend/AnjaliHouse.API\`
2. កែប្រែ \`ConnectionStrings:DefaultConnection\` នៅក្នុង \`appsettings.json\` ឱ្យត្រូវនឹង SQL Server របស់អ្នក
3. បើក Terminal រួចវាយពាក្យបញ្ជា៖
   \`\`\`bash
   dotnet restore
   dotnet run
   \`\`\`
4. សាកល្បងចូលទៅកាន់ **Swagger UI**: \`https://localhost:7001/swagger\` ឬ \`http://localhost:5000/swagger\`

---

### ជំហានទី ៤៖ ការដំណើរការកម្មវិធីទូរស័ព្ទ Flutter (Step 4: Run Flutter Mobile App)
1. បើកថត \`anjali_house\` ក្នុង **VS Code** ឬ **Android Studio**
2. ដំណើរការទាញយក Packages៖
   \`\`\`bash
   flutter pub get
   \`\`\`
3. ភ្ជាប់ទូរស័ព្ទ Android ឬបើក Android Emulator រួចដំណើរការ៖
   \`\`\`bash
   flutter run
   \`\`\`

---

### ជំហានទី ៥៖ របៀបបង្កើត Android APK សម្រាប់ដំឡើងលើទូរស័ព្ទ (Step 5: Build Android APK)
ដើម្បីបង្កើតឯកសារ APK ផ្លូវការ (Release Build):
\`\`\`bash
flutter build apk --release --split-per-abi
\`\`\`
ឯកសារ APK នឹងស្ថិតនៅទីតាំង៖
\`anjali_house/build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk\`
\`anjali_house/build/app/outputs/flutter-apk/app-arm64-v8a-release.apk\`

លោកអ្នកអាចចម្លង APK នេះទៅដំឡើងលើទូរស័ព្ទដៃ Android របស់បុគ្គលិក និងលោកគ្រូអ្នកគ្រូបានភ្លាមៗ!
`
  }
];
