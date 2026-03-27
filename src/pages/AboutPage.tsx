import { useParams, Link, Navigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Building2, Users, FileText, ShieldCheck, Landmark, Monitor, Briefcase, CheckCircle, BarChart, Heart, Network, FileSignature, Lightbulb, ChevronRight, BookOpen, Phone, MapPin, Mail, GraduationCap, Calendar, Search, MessageSquare, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, getDocs, addDoc, serverTimestamp, where, doc, getDoc, setDoc, onSnapshot, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const aboutSections = [
  { id: 'about-bmsce', title: 'About BMSCE', icon: Building2 },
  { id: 'governing-body', title: 'Governing Body', icon: Landmark },
  { id: 'administration', title: 'Administration', icon: Users },
  { id: 'academics', title: 'Academics', icon: Calendar },
  { id: 'alumni', title: 'Alumni', icon: GraduationCap },
  { id: 'staff-details', title: 'Staff Details', icon: Briefcase },
  { id: 'statutory-committee', title: 'Statutory Committee', icon: ShieldCheck },
  { id: 'executive-council', title: 'Executive Council', icon: Users },
  { id: 'e-governance', title: 'e-Governance', icon: Monitor },
  { id: 'institute-industry-interaction-cell-iiic', title: 'Institute Industry Interaction Cell (IIIC)', icon: Network },
  { id: 'internal-quality-assurance-cell-iqac', title: 'Internal Quality Assurance Cell (IQAC)', icon: CheckCircle },
  { id: 'annual-reports-finance', title: 'Annual Reports (Finance)', icon: BarChart },
  { id: 'life-at-bmsce', title: 'Life at BMSCE', icon: Heart },
  { id: 'group-institutions', title: 'Group Institutions', icon: Building2 },
  { id: 'tenders', title: 'Tenders', icon: FileText },
  { id: 'consultancy-page', title: 'Consultancy Page', icon: Lightbulb },
  { id: 'contact-us', title: 'Contact Us', icon: Phone },
];

// --- Sub-components for Academics ---
function AcademicCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const events = [
    { date: '2026-03-25', title: 'Semester End Exams Begin', type: 'exam' },
    { date: '2026-04-10', title: 'Good Friday Holiday', type: 'holiday' },
    { date: '2026-04-14', title: 'Ambedkar Jayanti Holiday', type: 'holiday' },
    { date: '2026-05-01', title: 'May Day Holiday', type: 'holiday' },
    { date: '2026-05-15', title: 'Semester Break Starts', type: 'break' },
    { date: '2026-06-01', title: 'New Semester Registration', type: 'academic' },
  ];

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 bg-navy-900 text-white flex justify-between items-center">
        <button onClick={prevMonth} className="p-1 hover:bg-navy-800 rounded">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h3 className="font-bold">{monthNames[month]} {year}</h3>
        <button onClick={nextMonth} className="p-1 hover:bg-navy-800 rounded">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-slate-800">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="bg-gray-50 dark:bg-slate-800 p-2 text-center text-xs font-bold text-gray-500">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white dark:bg-slate-900 p-4 min-h-[80px]"></div>
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEvents = events.filter(e => e.date === dateStr);
          
          return (
            <div key={day} className="bg-white dark:bg-slate-900 p-2 min-h-[80px] border-t border-gray-100 dark:border-slate-800">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</span>
              <div className="mt-1 space-y-1">
                {dayEvents.map((e, idx) => (
                  <div key={idx} className={`text-[10px] p-1 rounded leading-tight ${
                    e.type === 'exam' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                    e.type === 'holiday' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    e.type === 'break' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                    'bg-gold-100 text-gold-700 dark:bg-gold-900/20 dark:text-gold-400'
                  }`}>
                    {e.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Sub-components for Alumni ---
function AlumniSection() {
  const [activeTab, setActiveTab] = useState<'directory' | 'updates' | 'register'>('directory');
  const [user, setUser] = useState<any>(null);
  const [isAlumni, setIsAlumni] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const alumniDoc = await getDoc(doc(db, 'alumni', u.uid));
        setIsAlumni(alumniDoc.exists());
      } else {
        setIsAlumni(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Alumni Network</h2>
      
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-8">
        <button 
          onClick={() => setActiveTab('directory')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'directory' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-navy-900'}`}
        >
          <div className="flex items-center"><Search className="w-4 h-4 mr-2" /> Directory</div>
        </button>
        <button 
          onClick={() => setActiveTab('updates')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'updates' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-navy-900'}`}
        >
          <div className="flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> Updates</div>
        </button>
        {!isAlumni && (
          <button 
            onClick={() => setActiveTab('register')}
            className={`px-6 py-3 font-medium transition-colors border-b-2 ${activeTab === 'register' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-navy-900'}`}
          >
            <div className="flex items-center"><UserPlus className="w-4 h-4 mr-2" /> Register</div>
          </button>
        )}
      </div>

      {activeTab === 'directory' && <AlumniDirectory />}
      {activeTab === 'updates' && <AlumniUpdates user={user} isAlumni={isAlumni} />}
      {activeTab === 'register' && <AlumniRegister user={user} onComplete={() => { setIsAlumni(true); setActiveTab('directory'); }} />}
    </div>
  );
}

function AlumniDirectory() {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'alumni'));
        const querySnapshot = await getDocs(q);
        const alumniData: any[] = [];
        
        // We need to join with UserProfile to get names
        for (const alumniDoc of querySnapshot.docs) {
          const data = alumniDoc.data();
          const userDoc = await getDoc(doc(db, 'users', data.uid));
          if (userDoc.exists()) {
            alumniData.push({ ...data, ...userDoc.data() });
          }
        }
        setAlumni(alumniData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const filteredAlumni = alumni.filter(a => 
    a.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.currentCompany?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search by name, department, or company..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading alumni directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlumni.map((a, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-sm hover:border-gold-500 transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-navy-100 dark:bg-navy-900 flex items-center justify-center text-navy-900 dark:text-white font-bold text-xl mr-4">
                  {a.displayName?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 dark:text-white">{a.displayName}</h4>
                  <p className="text-xs text-gold-600 dark:text-gold-400">Class of {a.graduationYear} • {a.department}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Current:</strong> {a.currentPosition} at {a.currentCompany}</p>
                {a.bio && <p className="italic line-clamp-2">"{a.bio}"</p>}
              </div>
              {a.linkedinUrl && (
                <a href={a.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium">LinkedIn Profile →</a>
              )}
            </div>
          ))}
          {filteredAlumni.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">No alumni found matching your search.</div>
          )}
        </div>
      )}
    </div>
  );
}

function AlumniUpdates({ user, isAlumni }: { user: any, isAlumni: boolean }) {
  const [updates, setUpdates] = useState<any[]>([]);
  const [newUpdate, setNewUpdate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'alumniUpdates'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUpdates(updatesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdate.trim() || !user) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      await addDoc(collection(db, 'alumniUpdates'), {
        authorUid: user.uid,
        authorName: userData?.displayName || 'Anonymous Alumni',
        content: newUpdate,
        createdAt: serverTimestamp()
      });
      setNewUpdate('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {isAlumni && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="font-bold text-navy-900 dark:text-white mb-4">Share an Update</h3>
          <textarea 
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none transition-all mb-4"
            placeholder="What's new in your professional or personal life?"
            value={newUpdate}
            onChange={(e) => setNewUpdate(e.target.value)}
          ></textarea>
          <button type="submit" className="bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 font-bold py-2 px-6 rounded-lg hover:bg-navy-800 dark:hover:bg-gold-600 transition-colors">Post Update</button>
        </form>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading updates...</div>
        ) : (
          updates.map((update) => (
            <div key={update.id} className="p-6 border-b border-gray-100 dark:border-slate-800 last:border-0">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-navy-900 dark:text-white font-bold mr-3">
                  {update.authorName?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 dark:text-white">{update.authorName}</h4>
                  <p className="text-xs text-gray-500">{update.createdAt?.toDate ? new Date(update.createdAt.toDate()).toLocaleDateString() : 'Just now'}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{update.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AlumniRegister({ user, onComplete }: { user: any, onComplete: () => void }) {
  const [formData, setFormData] = useState({
    graduationYear: new Date().getFullYear(),
    department: '',
    currentCompany: '',
    currentPosition: '',
    linkedinUrl: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Please log in to register as alumni.</p>
        <Link to="/login" className="bg-navy-900 text-white px-6 py-2 rounded-lg font-bold">Log In</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Update User Role
      await setDoc(doc(db, 'users', user.uid), { role: 'alumni' }, { merge: true });
      
      // 2. Create Alumni Profile
      await setDoc(doc(db, 'alumni', user.uid), {
        uid: user.uid,
        ...formData,
        graduationYear: parseInt(formData.graduationYear.toString())
      });

      onComplete();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-gray-100 dark:border-slate-700">
      <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Join the Alumni Network</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Graduation Year</label>
            <input 
              type="number" 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none"
              value={formData.graduationYear}
              onChange={(e) => setFormData({...formData, graduationYear: parseInt(e.target.value)})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
            <select 
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Science">Information Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Company</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none"
              value={formData.currentCompany}
              onChange={(e) => setFormData({...formData, currentCompany: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Position</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none"
              value={formData.currentPosition}
              onChange={(e) => setFormData({...formData, currentPosition: e.target.value})}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
          <input 
            type="url" 
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Bio</label>
          <textarea 
            rows={2}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          ></textarea>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-gold-500 text-navy-900 font-bold py-3 rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
}

const contentMap: Record<string, React.ReactNode> = {
  'academics': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Academics</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8">BMSCE offers a rigorous academic environment with a focus on innovation and practical learning. Stay updated with our academic schedule below.</p>
      
      <div className="mb-10">
        <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-gold-500" /> Academic Calendar 2026
        </h3>
        <AcademicCalendar />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700">
          <h4 className="font-bold text-navy-900 dark:text-white mb-2">Exam Schedules</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Download the latest end-semester and internal assessment schedules.</p>
          <button className="text-gold-600 font-medium hover:underline flex items-center text-sm">Download PDF <ChevronRight className="w-4 h-4 ml-1" /></button>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700">
          <h4 className="font-bold text-navy-900 dark:text-white mb-2">Semester Breaks</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">View the planned vacation periods for the current academic year.</p>
          <button className="text-gold-600 font-medium hover:underline flex items-center text-sm">View Details <ChevronRight className="w-4 h-4 ml-1" /></button>
        </div>
      </div>
    </div>
  ),
  'alumni': <AlumniSection />,
  'contact-us': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-gold-50 dark:bg-gold-900/20 p-3 rounded-lg mr-4">
              <MapPin className="w-6 h-6 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 dark:text-white mb-1">Address</h3>
              <p className="text-gray-600 dark:text-gray-400">Bull Temple Rd, Basavanagudi, Bengaluru, Karnataka 560004, India</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gold-50 dark:bg-gold-900/20 p-3 rounded-lg mr-4">
              <Phone className="w-6 h-6 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 dark:text-white mb-1">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+91-80-26622130, +91-80-26622135</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-gold-50 dark:bg-gold-900/20 p-3 rounded-lg mr-4">
              <Mail className="w-6 h-6 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 dark:text-white mb-1">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">info@bmsce.ac.in, principal@bmsce.ac.in</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Quick Inquiry</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-gold-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 font-bold py-2 rounded-lg hover:bg-navy-800 dark:hover:bg-gold-600 transition-colors">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  ),
  'about-bmsce': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">About B.M.S. College of Engineering</h2>
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <p className="mb-4">B.M.S. College of Engineering (BMSCE) was Founded in the year 1946 by Late Sri. B. M. Sreenivasaiah a great visionary and philanthropist and nurtured by his illustrious son Late Sri. B. S. Narayan. BMSCE is the first private sector initiative in engineering education in India.</p>
        <p className="mb-4">BMSCE has completed 75+ years of dedicated service in the field of Engineering Education. Started with only 3 undergraduate courses, BMSCE today offers 14 Undergraduate & 15 Postgraduate courses both in conventional and emerging areas.</p>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-navy-800 dark:text-gray-100">Vision</h3>
        <p className="mb-4">Promoting Prosperity of mankind by elegantly blending traditional institutional values with global contemporary advancements.</p>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-navy-800 dark:text-gray-100">Mission</h3>
        <p className="mb-4">Accomplish excellence in the field of Technical Education through Education, Research and Service needs of society.</p>
      </div>
    </div>
  ),
  'governing-body': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Governing Body</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">The Governing Body of BMSCE comprises eminent personalities from academia, industry, and administration, guiding the institution towards excellence.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800 text-navy-900 dark:text-white border-b border-gray-200 dark:border-slate-700">
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Designation</th>
              <th className="p-4 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-100 dark:border-slate-800"><td className="p-4">Dr. P. Dayananda Pai</td><td className="p-4">Chairman, Century Group</td><td className="p-4">Chairman</td></tr>
            <tr className="border-b border-gray-100 dark:border-slate-800"><td className="p-4">Sri. Aviram Sharma</td><td className="p-4">Trustee, BMSET</td><td className="p-4">Member</td></tr>
            <tr className="border-b border-gray-100 dark:border-slate-800"><td className="p-4">Sri. Ravi Venkatesam</td><td className="p-4">Trustee, BMSET</td><td className="p-4">Member</td></tr>
            <tr className="border-b border-gray-100 dark:border-slate-800"><td className="p-4">Dr. Bheemsha Arya</td><td className="p-4">Principal, BMSCE</td><td className="p-4">Member Secretary</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
  'administration': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Administration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Dr. Bheemsha Arya</h3>
          <p className="text-gold-600 dark:text-gold-400 font-medium mb-4">Principal</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Providing leadership and vision to maintain BMSCE's position as a premier engineering institution.</p>
        </div>
        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Dr. Suresh Ramaswwamyreddy</h3>
          <p className="text-gold-600 dark:text-gold-400 font-medium mb-4">Vice Principal (Academic)</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Overseeing academic programs, curriculum development, and student performance.</p>
        </div>
        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Dr. B. Kanmani</h3>
          <p className="text-gold-600 dark:text-gold-400 font-medium mb-4">Dean (Academics)</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Managing academic regulations, examinations, and quality assurance in teaching.</p>
        </div>
        <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Dr. R. S. Geetha</h3>
          <p className="text-gold-600 dark:text-gold-400 font-medium mb-4">Dean (Student Affairs)</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Ensuring student welfare, managing clubs, and organizing extracurricular activities.</p>
        </div>
      </div>
    </div>
  ),
  'staff-details': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Staff Details</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">BMSCE takes pride in its highly qualified and dedicated faculty members who are committed to providing quality education and mentoring students.</p>
      <div className="space-y-4">
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-gold-500 transition-colors cursor-pointer group">
          <div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold-600">Teaching Staff Directory</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View profiles of our professors, associate professors, and assistant professors.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gold-500" />
        </div>
        <div className="p-6 border border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-between hover:border-gold-500 transition-colors cursor-pointer group">
          <div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold-600">Non-Teaching Staff Directory</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">View details of our administrative, technical, and support staff.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gold-500" />
        </div>
      </div>
    </div>
  ),
  'statutory-committee': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Statutory Committees</h2>
      <div className="space-y-6 text-gray-700 dark:text-gray-300">
        <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-gold-500" /> Anti-Ragging Committee</h3>
          <p className="mb-4">BMSCE has a zero-tolerance policy towards ragging. The committee ensures compliance with UGC regulations and maintains a safe campus environment.</p>
          <button className="text-sm bg-navy-900 text-white px-4 py-2 rounded hover:bg-navy-800">View Members & Policy</button>
        </div>
        <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 flex items-center"><Users className="w-5 h-5 mr-2 text-gold-500" /> Internal Complaints Committee (ICC)</h3>
          <p className="mb-4">Constituted as per the POSH Act, the ICC addresses grievances related to sexual harassment and ensures a safe workplace for women.</p>
          <button className="text-sm bg-navy-900 text-white px-4 py-2 rounded hover:bg-navy-800">View Details</button>
        </div>
        <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 flex items-center"><FileSignature className="w-5 h-5 mr-2 text-gold-500" /> Grievance Redressal Committee</h3>
          <p className="mb-4">Provides a mechanism for students and staff to raise concerns regarding academic or administrative matters.</p>
          <button className="text-sm bg-navy-900 text-white px-4 py-2 rounded hover:bg-navy-800">Submit Grievance</button>
        </div>
      </div>
    </div>
  ),
  'executive-council': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Executive Council</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">The Executive Council of BMS Educational Trust oversees the strategic direction and financial management of all BMS institutions.</p>
      <ul className="space-y-4">
        <li className="flex items-start p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
          <div className="w-12 h-12 rounded-full bg-navy-100 dark:bg-navy-900 flex items-center justify-center text-navy-900 dark:text-white font-bold text-xl mr-4 shrink-0">DP</div>
          <div>
            <h4 className="font-bold text-navy-900 dark:text-white text-lg">Dr. P. Dayananda Pai</h4>
            <p className="text-gold-600 dark:text-gold-400 text-sm">Chairman, BMS Educational Trust</p>
          </div>
        </li>
        <li className="flex items-start p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
          <div className="w-12 h-12 rounded-full bg-navy-100 dark:bg-navy-900 flex items-center justify-center text-navy-900 dark:text-white font-bold text-xl mr-4 shrink-0">AS</div>
          <div>
            <h4 className="font-bold text-navy-900 dark:text-white text-lg">Sri. Aviram Sharma</h4>
            <p className="text-gold-600 dark:text-gold-400 text-sm">Trustee, BMS Educational Trust</p>
          </div>
        </li>
        <li className="flex items-start p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
          <div className="w-12 h-12 rounded-full bg-navy-100 dark:bg-navy-900 flex items-center justify-center text-navy-900 dark:text-white font-bold text-xl mr-4 shrink-0">RM</div>
          <div>
            <h4 className="font-bold text-navy-900 dark:text-white text-lg">Sri. Ravi Venkatesam</h4>
            <p className="text-gold-600 dark:text-gold-400 text-sm">Trustee, BMS Educational Trust</p>
          </div>
        </li>
      </ul>
    </div>
  ),
  'e-governance': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">e-Governance</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8">BMSCE implements comprehensive e-governance solutions to ensure transparency, efficiency, and seamless administration across all departments.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 dark:border-slate-700 p-6 rounded-xl hover:shadow-md transition-shadow">
          <Monitor className="w-8 h-8 text-gold-500 mb-4" />
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Campus ERP</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Integrated system for student lifecycle management, attendance tracking, and academic records.</p>
          <a href="https://erp.bmsce.ac.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">Access ERP Portal →</a>
        </div>
        <div className="border border-gray-200 dark:border-slate-700 p-6 rounded-xl hover:shadow-md transition-shadow">
          <BookOpen className="w-8 h-8 text-gold-500 mb-4" />
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Learning Management System</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Digital platform for course materials, assignments, online assessments, and collaborative learning.</p>
          <a href="https://lms.bmsce.ac.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">Access LMS →</a>
        </div>
      </div>
    </div>
  ),
  'institute-industry-interaction-cell-iiic': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Institute Industry Interaction Cell (IIIC)</h2>
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <p className="mb-4">The IIIC at BMSCE bridges the gap between academia and industry. It facilitates collaborations, internships, and joint research initiatives to ensure our curriculum remains relevant to industry needs.</p>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-navy-800 dark:text-gray-100">Key Objectives</h3>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>To cultivate strong links with industry and professional bodies.</li>
          <li>To promote industrial training for students and faculty.</li>
          <li>To encourage industry experts to participate in curriculum design.</li>
          <li>To facilitate consultancy and sponsored research projects.</li>
        </ul>
        <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
          <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Partner Industries</h4>
          <p className="text-sm">BMSCE has active MoUs with over 50 leading companies including TCS, Infosys, IBM, Bosch, Volvo, and Dassault Systèmes.</p>
        </div>
      </div>
    </div>
  ),
  'internal-quality-assurance-cell-iqac': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Internal Quality Assurance Cell (IQAC)</h2>
      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        <p className="mb-4">The IQAC is a vital part of the institution's system and works towards realizing the goals of quality enhancement and sustenance. It develops a system for conscious, consistent, and catalytic improvement in the overall performance of the institution.</p>
        <h3 className="text-xl font-semibold mt-6 mb-3 text-navy-800 dark:text-gray-100">Functions</h3>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>Development and application of quality benchmarks/parameters for various academic and administrative activities.</li>
          <li>Facilitating the creation of a learner-centric environment conducive to quality education.</li>
          <li>Arrangement for feedback response from students, parents, and other stakeholders on quality-related institutional processes.</li>
          <li>Preparation of the Annual Quality Assurance Report (AQAR) as per guidelines and parameters of NAAC.</li>
        </ul>
        <div className="mt-6 flex gap-4">
          <button className="bg-navy-900 text-white px-4 py-2 rounded hover:bg-navy-800 flex items-center text-sm"><FileText className="w-4 h-4 mr-2" /> Download AQAR 2022-23</button>
          <button className="bg-gray-200 dark:bg-slate-700 text-navy-900 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-slate-600 flex items-center text-sm"><FileText className="w-4 h-4 mr-2" /> View All Reports</button>
        </div>
      </div>
    </div>
  ),
  'annual-reports-finance': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Annual Reports (Finance)</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8">Transparency and accountability are core values at BMSCE. Access our audited financial statements and annual reports below.</p>
      <div className="space-y-4">
        {[
          { year: '2022-2023', size: '2.4 MB' },
          { year: '2021-2022', size: '2.1 MB' },
          { year: '2020-2021', size: '1.8 MB' },
          { year: '2019-2020', size: '1.9 MB' },
        ].map((report) => (
          <div key={report.year} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-gold-500 transition-colors">
            <div className="flex items-center">
              <BarChart className="w-6 h-6 text-navy-900 dark:text-gold-400 mr-4" />
              <div>
                <h4 className="font-bold text-navy-900 dark:text-white">Audited Financial Statement {report.year}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF Document • {report.size}</p>
              </div>
            </div>
            <button className="text-blue-600 hover:underline text-sm font-medium px-4 py-2">Download</button>
          </div>
        ))}
      </div>
    </div>
  ),
  'life-at-bmsce': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Life at BMSCE</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8">Life at BMSCE goes beyond classrooms and laboratories. It's a vibrant ecosystem of cultural, technical, and sports activities that foster holistic development.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl overflow-hidden relative group h-64">
          <img src="https://picsum.photos/seed/utsav/800/600" alt="Utsav Cultural Fest" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-1">UTSAV</h3>
            <p className="text-gray-200 text-sm">South India's largest student-managed cultural extravaganza.</p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden relative group h-64">
          <img src="https://picsum.photos/seed/phaseshift/800/600" alt="Phase Shift Tech Fest" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-1">Phase Shift</h3>
            <p className="text-gray-200 text-sm">Annual national-level technical symposium.</p>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Student Clubs</h3>
      <div className="flex flex-wrap gap-2">
        {['Mountaineering Club', 'Photography Club', 'Dance Club', 'Music Club', 'Coding Club', 'Robotics Club', 'Aerospace Club', 'Debate Society'].map(club => (
          <span key={club} className="px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-slate-700">{club}</span>
        ))}
      </div>
    </div>
  ),
  'group-institutions': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Group Institutions</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">The BMS Educational Trust manages several premier institutions across Bangalore, offering education from kindergarten to doctoral programs.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "B.M.S. College of Engineering (BMSCE)",
          "B.M.S. Institute of Technology and Management (BMSIT&M)",
          "B.M.S. College for Women (BMSCW)",
          "B.M.S. College of Law (BMSCL)",
          "B.M.S. College of Architecture (BMSCA)",
          "B.M.S. College of Commerce & Management (BMSCCM)",
          "B.M.S. School of Architecture (BMSSA)",
          "B.M.S. Evening College of Engineering",
          "B.M.S. Evening College of Arts & Commerce"
        ].map((inst, idx) => (
          <div key={idx} className="p-4 border border-gray-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg flex items-start">
            <Building2 className="w-5 h-5 text-gold-500 mr-3 shrink-0 mt-0.5" />
            <span className="text-navy-900 dark:text-gray-200 font-medium">{inst}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  'tenders': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Active Tenders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800 text-navy-900 dark:text-white border-b border-gray-200 dark:border-slate-700">
              <th className="p-4 font-semibold">Tender No.</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold">Last Date</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-100 dark:border-slate-800">
              <td className="p-4 font-mono text-sm">BMSCE/TEN/2026/01</td>
              <td className="p-4">Procurement of Desktop Computers for CS Dept</td>
              <td className="p-4">15 Apr 2026</td>
              <td className="p-4"><button className="text-blue-600 hover:underline text-sm">Download PDF</button></td>
            </tr>
            <tr className="border-b border-gray-100 dark:border-slate-800">
              <td className="p-4 font-mono text-sm">BMSCE/TEN/2026/02</td>
              <td className="p-4">Renovation of Mechanical Engineering Block Labs</td>
              <td className="p-4">22 Apr 2026</td>
              <td className="p-4"><button className="text-blue-600 hover:underline text-sm">Download PDF</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
  'consultancy-page': (
    <div>
      <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Consultancy Services</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-8">BMSCE offers expert consultancy services to industries, government organizations, and private sectors across various engineering domains.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Civil Engineering</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm list-disc list-inside">
            <li>Structural Design & Vetting</li>
            <li>Soil Testing & Geotechnical Investigation</li>
            <li>Material Testing (Concrete, Steel, etc.)</li>
            <li>Environmental Impact Assessment</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Mechanical Engineering</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm list-disc list-inside">
            <li>CAD/CAM/CAE Services</li>
            <li>Material Characterization</li>
            <li>Thermal Analysis</li>
            <li>Rapid Prototyping (3D Printing)</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Electrical & Electronics</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm list-disc list-inside">
            <li>Power Quality Analysis</li>
            <li>Energy Auditing</li>
            <li>Embedded Systems Design</li>
            <li>IoT Solutions Development</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 p-6 bg-navy-50 dark:bg-slate-800/50 rounded-xl border border-navy-100 dark:border-slate-700 text-center">
        <h4 className="font-bold text-navy-900 dark:text-white mb-2">Need our expertise?</h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Contact our R&D cell to discuss your consultancy requirements.</p>
        <button className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-2 px-6 rounded transition-colors">Contact R&D Cell</button>
      </div>
    </div>
  ),
};

export function AboutPage() {
  const { section } = useParams<{ section: string }>();
  
  const currentSection = aboutSections.find(s => s.id === section);

  if (!currentSection && section) {
    return <Navigate to="/about/about-bmsce" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      {/* Page Header */}
      <div className="bg-navy-900 py-12 border-t border-navy-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About Us</h1>
          <div className="flex items-center text-sm text-gray-300">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>About Us</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gold-400">{currentSection?.title || 'About BMSCE'}</span>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-32">
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-navy-900 dark:text-white">In this section</h3>
              </div>
              <nav className="flex flex-col py-2">
                {aboutSections.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === (section || 'about-bmsce');
                  return (
                    <Link
                      key={item.id}
                      to={`/about/${item.id}`}
                      className={`flex items-center px-4 py-3 text-sm transition-colors ${
                        isActive 
                          ? 'bg-gold-50 dark:bg-gold-900/10 text-gold-700 dark:text-gold-400 border-l-4 border-gold-500 font-medium' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-navy-900 dark:hover:text-white border-l-4 border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-gold-500' : 'text-gray-400'}`} />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 min-h-[600px]">
              {currentSection ? contentMap[currentSection.id] : contentMap['about-bmsce']}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}