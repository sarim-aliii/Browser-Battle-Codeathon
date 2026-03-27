import React from 'react';
import { BookOpen, Users, FileText, ShieldCheck, Landmark, Monitor, Briefcase, CheckCircle, BarChart, Heart, Network, FileSignature, Lightbulb, Building2, FlaskConical, Globe, Award, Target, Zap, Microscope, GraduationCap, Calendar, Download, Phone, Mail, MapPin, ImageIcon, ExternalLink } from 'lucide-react';
import { ExamSchedule } from '../components/academics/ExamSchedule';

export const sectionsData: Record<string, {
  title: string;
  items: { id: string; title: string; icon: React.ElementType; content: React.ReactNode }[];
}> = {
  'about': {
    title: 'About Us',
    items: [
      {
        id: 'about-bmsce',
        title: 'About BMSCE',
        icon: Building2,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">About BMSCE</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              B.M.S. College of Engineering (BMSCE) was founded in the year 1946 by Late Sri. B. M. Sreenivasaiah, a great visionary and philanthropist. It is the first private sector initiative in engineering education in India.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Promoting Prosperity of mankind by augmenting Human Resource Capital through Quality Technical Education & Training.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Accomplish Excellence in the field of Technical Education through Education, Research and Service needs of society.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'governing-body',
        title: 'Governing Body',
        icon: Users,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Governing Body</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Governing Body of BMSCE consists of eminent personalities from academia, industry, and administration who guide the institution towards excellence.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Key Members</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Chairman, Council of Trustees</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Representatives from AICTE and State Government</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Industry Experts and Alumni Representatives</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Principal (Ex-Officio Member Secretary)</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'administration',
        title: 'Administration',
        icon: Briefcase,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Administration</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The administrative team at BMSCE ensures the smooth functioning of academic and non-academic activities, providing a conducive environment for learning and growth.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="font-bold text-navy-900 dark:text-white text-lg">Principal</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Head of the Institution</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="font-bold text-navy-900 dark:text-white text-lg">Vice Principal</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Academic Affairs</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="font-bold text-navy-900 dark:text-white text-lg">Registrar</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Administrative Operations</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="font-bold text-navy-900 dark:text-white text-lg">Deans</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">Various Faculties</div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'staff-details',
        title: 'Staff Details',
        icon: Users,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Staff Details</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE takes pride in its highly qualified and dedicated faculty and staff members who are committed to nurturing the next generation of engineers.
            </p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mt-6">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Faculty Directory</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our faculty members hold advanced degrees from reputed institutions and have extensive experience in teaching, research, and industry.
              </p>
              <button className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-lg transition-colors">
                View Complete Directory
              </button>
            </div>
          </div>
        )
      },
      {
        id: 'statutory-committee',
        title: 'Statutory Committee',
        icon: ShieldCheck,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Statutory Committees</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Various statutory committees are established as per the guidelines of regulatory bodies to ensure transparency, discipline, and welfare on campus.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {['Anti-Ragging Committee', 'Internal Complaints Committee (ICC)', 'Grievance Redressal Committee', 'SC/ST Cell', 'OBC Cell', 'Minority Cell'].map(committee => (
                <div key={committee} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-gold-500 mr-3 shrink-0" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{committee}</span>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        id: 'executive-council',
        title: 'Executive Council',
        icon: Users,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Executive Council</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Executive Council plays a crucial role in the strategic planning and execution of institutional policies and initiatives.
            </p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mt-6">
              <p className="text-gray-600 dark:text-gray-400">
                It comprises senior management, deans, and heads of departments who meet regularly to discuss academic progress, infrastructure development, and student welfare.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'e-governance',
        title: 'e-Governance',
        icon: Monitor,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">e-Governance</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE has implemented comprehensive e-governance systems to streamline administrative processes, enhance transparency, and improve efficiency.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Key Portals</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Student Information System (SIS)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Faculty Information System (FIS)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Online Fee Payment Portal</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Digital Library Access</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'institute-industry-interaction-cell-iiic',
        title: 'Institute Industry Interaction Cell (IIIC)',
        icon: Network,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Institute Industry Interaction Cell (IIIC)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The IIIC bridges the gap between academia and industry by facilitating collaborative research, internships, expert lectures, and industrial visits.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Objectives</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Foster industry partnerships</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Facilitate student internships</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Organize joint workshops and seminars</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Outcomes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enhanced employability of students, industry-relevant curriculum updates, and successful execution of sponsored projects.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'internal-quality-assurance-cell-iqac',
        title: 'Internal Quality Assurance Cell (IQAC)',
        icon: ShieldCheck,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Internal Quality Assurance Cell (IQAC)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The IQAC is responsible for developing a system for conscious, consistent, and catalytic improvement in the overall performance of the institution.
            </p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mt-6">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Functions</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Development and application of quality benchmarks.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Facilitating the creation of a learner-centric environment.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Arrangement for feedback response from students, parents, and other stakeholders.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Preparation of the Annual Quality Assurance Report (AQAR).</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'annual-reports-finance',
        title: 'Annual Reports (Finance)',
        icon: FileText,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Annual Reports (Finance)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE maintains transparency in its financial operations. The annual financial reports and audited statements are available for reference.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {['Financial Year 2022-23', 'Financial Year 2021-22', 'Financial Year 2020-21', 'Financial Year 2019-20'].map(year => (
                <div key={year} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center justify-between hover:border-gold-500 transition-colors cursor-pointer group">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-gold-500 mr-3" />
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-navy-900 dark:group-hover:text-white">{year}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-gold-500" />
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        id: 'life-at-bmsce',
        title: 'Life at BMSCE',
        icon: Heart,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Life at BMSCE</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Campus life at BMSCE is vibrant, diverse, and enriching. Students engage in a multitude of cultural, technical, and sports activities that foster holistic development.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <Users className="w-10 h-10 text-gold-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Clubs & Societies</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Over 40 active student clubs catering to diverse interests.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <Target className="w-10 h-10 text-gold-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Utsav</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">The annual cultural extravaganza, one of the largest in the region.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <Building2 className="w-10 h-10 text-gold-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">Campus Facilities</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Lush green campus with modern amenities and recreational spaces.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'group-institutions',
        title: 'Group Institutions',
        icon: Building2,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">BMS Group of Institutions</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE is the flagship institution of the BMS Educational Trust, which manages several other premier educational institutions.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> BMS Institute of Technology and Management (BMSIT&M)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> BMS College of Architecture (BMSCA)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> BMS College of Law (BMSCL)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> BMS College of Commerce & Management (BMSCCM)</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'tenders',
        title: 'Tenders',
        icon: FileText,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Active Tenders</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Information regarding ongoing tenders, procurement notices, and related documents.
            </p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">There are currently no active tenders.</p>
            </div>
          </div>
        )
      },
      {
        id: 'consultancy-page',
        title: 'Consultancy Page',
        icon: Briefcase,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Consultancy Services</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our expert faculty members provide consultancy services to various industries, government bodies, and organizations, leveraging their technical expertise to solve real-world problems.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Areas of Expertise</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Structural Design & Testing</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Environmental Impact Assessment</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Software Development & Auditing</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Energy Auditing</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Contact for Consultancy</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Email:</strong> consultancy@bmsce.ac.in
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Phone:</strong> +91-80-26622130
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'contact-us',
        title: 'Contact Us',
        icon: Phone,
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-6">
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
        )
      }
    ]
  },
  'academics': {
    title: 'Academics',
    items: [
      { 
        id: 'civil-engineering', 
        title: 'Civil Engineering', 
        icon: Building2, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Civil Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Department of Civil Engineering at BMSCE is one of the oldest and most prestigious departments, established in 1946. It offers comprehensive programs covering structural, geotechnical, environmental, and transportation engineering.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 flex items-center"><Award className="w-5 h-5 mr-2 text-gold-500" /> Programs Offered</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>B.E. in Civil Engineering</li>
                  <li>M.Tech in Construction Technology</li>
                  <li>M.Tech in Environmental Engineering</li>
                  <li>M.Tech in Transportation Engineering</li>
                  <li>Ph.D. Research Programs</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 flex items-center"><Microscope className="w-5 h-5 mr-2 text-gold-500" /> Key Facilities</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Advanced Structural Engineering Lab</li>
                  <li>Geotechnical Engineering Lab</li>
                  <li>Environmental Engineering Lab</li>
                  <li>Highway Materials Testing Lab</li>
                  <li>CAD and Computing Center</li>
                </ul>
              </div>
            </div>
            <ExamSchedule department="Civil Engineering" />
          </div>
        ) 
      },
      { 
        id: 'mechanical-engineering', 
        title: 'Mechanical Engineering', 
        icon: Zap, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Mechanical Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Mechanical Engineering department focuses on design, analysis, manufacturing, and maintenance of mechanical systems. It is equipped with state-of-the-art laboratories and research centers.
            </p>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Research Areas</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Thermal Engineering', 'Design Engineering', 'Manufacturing Science', 'Robotics & Automation', 'Materials Science', 'Fluid Mechanics'].map(area => (
                  <div key={area} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 flex items-center">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <ExamSchedule department="Mechanical Engineering" />
          </div>
        ) 
      },
      { 
        id: 'electrical-and-electronics-engineering', 
        title: 'Electrical and Electronics Engineering', 
        icon: Zap, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Electrical and Electronics Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Department of Electrical and Electronics Engineering offers a comprehensive curriculum that covers power systems, control systems, electronics, and renewable energy technologies.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Core Areas</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Power Systems & Smart Grids</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Power Electronics & Drives</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Control Systems & Automation</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Renewable Energy Systems</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Labs & Facilities</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Advanced Power System Simulation Lab</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> High Voltage Engineering Lab</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Microcontroller & Embedded Systems Lab</li>
                </ul>
              </div>
            </div>
            <ExamSchedule department="Electrical and Electronics Engineering" />
          </div>
        ) 
      },
      { 
        id: 'electronics-and-communication-engineering', 
        title: 'Electronics and Communication Engineering', 
        icon: Network, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Electronics and Communication Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The ECE department specializes in communication systems, signal processing, VLSI design, and embedded systems, preparing students for the rapidly evolving electronics industry.
            </p>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Specializations</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['VLSI Design', 'Embedded Systems', 'Signal & Image Processing', 'Wireless Communication', 'Optical Networks', 'IoT Systems'].map(area => (
                  <div key={area} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center">
                    <Zap className="w-5 h-5 text-gold-500 mr-3" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <ExamSchedule department="Electronics and Communication Engineering" />
          </div>
        ) 
      },
      { 
        id: 'computer-science-and-engineering', 
        title: 'Computer Science and Engineering', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Computer Science and Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Dedicated to advancing the field of computing through innovative teaching and cutting-edge research. The department offers a dynamic environment for learning modern software development, algorithms, and system design.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Core Competencies</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Artificial Intelligence & Machine Learning</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Cloud Computing & Distributed Systems</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Cybersecurity & Cryptography</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Data Science & Big Data Analytics</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Internet of Things (IoT)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Software Engineering & Architecture</li>
              </ul>
            </div>
            <ExamSchedule department="Computer Science and Engineering" />
          </div>
        ) 
      },
      { 
        id: 'information-science-and-engineering', 
        title: 'Information Science and Engineering', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Information Science and Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The ISE department focuses on information processing, software engineering, data management, and computer networks, equipping students with the skills to build robust software systems.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Key Focus Areas</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Database Management Systems</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Web Technologies & Cloud Computing</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Software Testing & Quality Assurance</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Computer Networks & Security</li>
              </ul>
            </div>
            <ExamSchedule department="Information Science and Engineering" />
          </div>
        ) 
      },
      { 
        id: 'artificial-intelligence-and-data-science', 
        title: 'Artificial Intelligence and Data Science', 
        icon: Lightbulb, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Artificial Intelligence and Data Science</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This cutting-edge program prepares students for the future of AI, machine learning, and big data analytics. It combines foundational computer science with advanced mathematical modeling.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Curriculum Highlights</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Deep Learning & Neural Networks</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Natural Language Processing</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Computer Vision</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Big Data Analytics</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Career Prospects</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Graduates are highly sought after for roles such as Data Scientist, AI Engineer, Machine Learning Architect, and Business Intelligence Analyst in top tech companies.
                </p>
              </div>
            </div>
            <ExamSchedule department="Artificial Intelligence and Data Science" />
          </div>
        ) 
      },
      { 
        id: 'aerospace-engineering', 
        title: 'Aerospace Engineering', 
        icon: Globe, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Aerospace Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Aerospace Engineering program covers aerodynamics, propulsion, aerospace structures, and flight mechanics, preparing students for the dynamic aviation and space sectors.
            </p>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Key Study Areas</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Aerodynamics', 'Flight Dynamics & Control', 'Aerospace Propulsion', 'Aircraft Structures', 'Spacecraft Dynamics', 'Avionics'].map(area => (
                  <div key={area} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center">
                     <Globe className="w-5 h-5 text-gold-500 mr-3" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <ExamSchedule department="Aerospace Engineering" />
          </div>
        ) 
      },
      { 
        id: 'bio-technology', 
        title: 'Bio-Technology', 
        icon: FlaskConical, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Bio-Technology</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Integrating biology with technology, this department focuses on developing innovative solutions in healthcare, agriculture, and environmental conservation.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Research Facilities</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Molecular Biology Lab</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Bioprocess Engineering Lab</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Bioinformatics Center</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Plant Tissue Culture Lab</li>
              </ul>
            </div>
            <ExamSchedule department="Bio-Technology" />
          </div>
        ) 
      },
      { 
        id: 'master-of-business-administration', 
        title: 'Master of Business Administration', 
        icon: Briefcase, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Master of Business Administration (MBA)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The MBA program is designed to develop future business leaders and entrepreneurs with a strong foundation in management principles and practical industry insights.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Specializations</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Finance</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Marketing</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Human Resources</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Business Analytics</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Program Highlights</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Case-study based learning</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Industry internships</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Guest lectures by corporate leaders</li>
                </ul>
              </div>
            </div>
            <ExamSchedule department="Master of Business Administration" />
          </div>
        ) 
      },
      { 
        id: 'master-of-computer-applications', 
        title: 'Master of Computer Applications', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Master of Computer Applications (MCA)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The MCA program offers advanced studies in computer applications, software development, and IT management, preparing students for high-level roles in the software industry.
            </p>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4">Core Subjects</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['Advanced Java Programming', 'Cloud Architecture', 'Mobile App Development', 'Software Project Management', 'Data Warehousing & Mining', 'Full Stack Development'].map(area => (
                  <div key={area} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center">
                    <Monitor className="w-5 h-5 text-gold-500 mr-3" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{area}</span>
                  </div>
                ))}
              </div>
            </div>
            <ExamSchedule department="Master of Computer Applications" />
          </div>
        ) 
      },
      { 
        id: 'industrial-engineering-and-management', 
        title: 'Industrial Engineering and Management', 
        icon: Briefcase, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Industrial Engineering and Management</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The IEM department focuses on optimizing complex processes, systems, or organizations by developing, improving and implementing integrated systems of people, money, knowledge, information and equipment.
            </p>
            <ExamSchedule department="Industrial Engineering and Management" />
          </div>
        ) 
      },
      { 
        id: 'electronics-and-telecommunication-engineering', 
        title: 'Electronics and Telecommunication Engineering', 
        icon: Network, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Electronics and Telecommunication Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This department provides comprehensive education in telecommunication networks, wireless communication, and signal processing.
            </p>
            <ExamSchedule department="Electronics and Telecommunication Engineering" />
          </div>
        ) 
      },
      { 
        id: 'electronics-and-instrumentation-engineering', 
        title: 'Electronics and Instrumentation Engineering', 
        icon: Zap, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Electronics and Instrumentation Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Focuses on the design, configuration and automation of systems and processes in various industries.
            </p>
            <ExamSchedule department="Electronics and Instrumentation Engineering" />
          </div>
        ) 
      },
      { 
        id: 'medical-electronics-engineering', 
        title: 'Medical Electronics Engineering', 
        icon: Heart, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Medical Electronics Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Bridging the gap between engineering and medicine, this department focuses on developing advanced medical devices and healthcare technologies.
            </p>
            <ExamSchedule department="Medical Electronics Engineering" />
          </div>
        ) 
      },
      { 
        id: 'chemical-engineering', 
        title: 'Chemical Engineering', 
        icon: FlaskConical, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Chemical Engineering</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Dedicated to the study of chemical processes, materials science, and sustainable engineering practices.
            </p>
            <ExamSchedule department="Chemical Engineering" />
          </div>
        ) 
      },
      { 
        id: 'computer-applications-mca', 
        title: 'Computer Applications (MCA)', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Computer Applications (MCA)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The MCA program offers advanced studies in computer applications, software development, and IT management, preparing students for high-level roles in the software industry.
            </p>
            <ExamSchedule department="Computer Applications (MCA)" />
          </div>
        ) 
      },
      { 
        id: 'management-studies-and-research-centre', 
        title: 'Management Studies and Research Centre', 
        icon: Briefcase, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Management Studies and Research Centre</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Offers comprehensive management programs designed to develop future business leaders and entrepreneurs.
            </p>
            <ExamSchedule department="Management Studies and Research Centre" />
          </div>
        ) 
      },
      { 
        id: 'mathematics-department', 
        title: 'Mathematics Department', 
        icon: BookOpen, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Mathematics Department</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Provides strong foundational knowledge in applied mathematics essential for all engineering disciplines.
            </p>
            <ExamSchedule department="Mathematics Department" />
          </div>
        ) 
      },
      { 
        id: 'physics-department', 
        title: 'Physics Department', 
        icon: Lightbulb, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Physics Department</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Focuses on fundamental physics concepts and their applications in modern engineering and technology.
            </p>
            <ExamSchedule department="Physics Department" />
          </div>
        ) 
      },
      { 
        id: 'chemistry-department', 
        title: 'Chemistry Department', 
        icon: FlaskConical, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Chemistry Department</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Offers courses in engineering chemistry, focusing on materials, environmental chemistry, and industrial applications.
            </p>
            <ExamSchedule department="Chemistry Department" />
          </div>
        ) 
      },
      { 
        id: 'machine-learning-ai-and-ml', 
        title: 'Machine Learning (AI and ML)', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Machine Learning (AI and ML)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A specialized program focusing on advanced artificial intelligence algorithms, machine learning models, and their real-world applications.
            </p>
            <ExamSchedule department="Machine Learning (AI and ML)" />
          </div>
        ) 
      },
      { 
        id: 'computer-science-and-engineering-ds', 
        title: 'Computer Science and Engineering (DS)', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Computer Science and Engineering (Data Science)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Specializes in data analytics, big data technologies, and extracting actionable insights from complex datasets.
            </p>
            <ExamSchedule department="Computer Science and Engineering (DS)" />
          </div>
        ) 
      },
      { 
        id: 'computer-science-and-engineering-iot-and-cs', 
        title: 'Computer Science and Engineering (IoT and CS)', 
        icon: Network, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Computer Science and Engineering (IoT and Cyber Security)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Focuses on the architecture of Internet of Things devices and securing networks and systems against cyber threats.
            </p>
            <ExamSchedule department="Computer Science and Engineering (IoT and CS)" />
          </div>
        ) 
      },
      { 
        id: 'computer-science-and-business-systems', 
        title: 'Computer Science and Business Systems', 
        icon: Briefcase, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Computer Science and Business Systems</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A unique program blending core computer science with business management principles, designed to produce industry-ready professionals.
            </p>
            <ExamSchedule department="Computer Science and Business Systems" />
          </div>
        ) 
      },
    ]
  },
  'admissions': {
    title: 'Admissions',
    items: [
      { 
        id: 'under-graduation', 
        title: 'Under Graduation', 
        icon: GraduationCap, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Undergraduate Admissions (B.E.)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMS College of Engineering offers 4-year Bachelor of Engineering (B.E.) programs across various disciplines. Admission is based on merit and entrance examination scores.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Eligibility Criteria</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" /> Passed 10+2 / PUC or equivalent examination.</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" /> Minimum 45% aggregate marks in Physics and Mathematics along with Chemistry / Bio-Technology / Biology / Electronics / Computer (40% for SC/ST/OBC).</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Entrance Exams Accepted</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 shrink-0" /> <strong>KCET:</strong> Karnataka Common Entrance Test (for Karnataka candidates).</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 shrink-0" /> <strong>COMEDK UGET:</strong> Consortium of Medical, Engineering and Dental Colleges of Karnataka.</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 shrink-0" /> <strong>Management Quota:</strong> Direct admission based on merit.</li>
                </ul>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'post-graduation', 
        title: 'Post Graduation', 
        icon: GraduationCap, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Postgraduate Admissions (M.Tech, MBA, MCA)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE offers a wide range of postgraduate programs designed to provide advanced knowledge and research opportunities in various engineering and management disciplines.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Admission Process</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> <strong>M.Tech:</strong> Admission through PGCET (Karnataka) or valid GATE score.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> <strong>MBA:</strong> Admission through PGCET, KMAT, CMAT, MAT, or PGCET.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> <strong>MCA:</strong> Admission through PGCET or KMAT.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> <strong>Management Quota:</strong> Available for all PG programs based on merit.</li>
              </ul>
            </div>
          </div>
        ) 
      },
      { 
        id: 'ph-d', 
        title: 'Ph.D', 
        icon: BookOpen, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Ph.D Admissions</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE is a recognized research center under Visvesvaraya Technological University (VTU). We offer Ph.D. programs across all major engineering, science, and management departments.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Eligibility</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Master's degree in the relevant field with a minimum of 60% marks (or equivalent CGPA).</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Qualification in VTU Eligibility Test for Research (ULR) or equivalent (GATE/NET).</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Fellowships</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Full-time research scholars may be eligible for the B S Narayan Ph.D. Fellowship or other government/industry-sponsored fellowships based on merit and research area.
                </p>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'international-admissions', 
        title: 'International Admissions', 
        icon: Globe, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">International Admissions</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE welcomes students from across the globe. We have a dedicated International Student Center to facilitate the admission process for NRI, PIO, OCI, and Foreign National candidates.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Categories</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><Globe className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> <strong>NRI/PIO/OCI:</strong> Admissions are handled directly by the institution based on merit in the qualifying examination.</li>
                <li className="flex items-start"><Globe className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> <strong>Foreign Nationals:</strong> Admissions are subject to clearance from the Ministry of Education, Government of India, and AIU equivalence.</li>
              </ul>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                For detailed guidelines, fee structure, and application forms, please contact the International Admissions Office at <a href="mailto:international@bmsce.ac.in" className="text-navy-600 dark:text-navy-400 underline">international@bmsce.ac.in</a>.
              </p>
            </div>
          </div>
        ) 
      },
      { 
        id: 'admission-process', 
        title: 'Admission Process', 
        icon: FileText, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Admission Process</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The admission process at BMSCE is transparent and strictly adheres to the guidelines set by the Government of Karnataka and VTU.
            </p>
            <div className="mt-6 space-y-4">
              {[
                { step: '1', title: 'Eligibility Check', desc: 'Ensure you meet the academic criteria for your desired program.' },
                { step: '2', title: 'Entrance Exam', desc: 'Appear for the relevant entrance exam (KCET, COMEDK, PGCET, GATE, etc.).' },
                { step: '3', title: 'Counseling/Application', desc: 'Participate in the centralized counseling process or apply directly for management quota.' },
                { step: '4', title: 'Document Verification', desc: 'Submit original documents for verification at the college.' },
                { step: '5', title: 'Fee Payment & Enrollment', desc: 'Pay the prescribed fees to confirm your admission and complete the enrollment process.' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy-900 dark:bg-navy-700 text-white flex items-center justify-center font-bold text-lg mr-4">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) 
      },
      { 
        id: 'syllabus', 
        title: 'Syllabus', 
        icon: BookOpen, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Syllabus</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Access the detailed syllabus for all undergraduate and postgraduate programs offered at BMSCE.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <p className="text-gray-600 dark:text-gray-400">
                The syllabus is regularly updated to align with industry standards and technological advancements.
              </p>
            </div>
          </div>
        ) 
      },
    ]
  },
  'research': {
    title: 'Research',
    items: [
      { 
        id: 'about-r-d', 
        title: 'About R & D', 
        icon: Microscope, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Research & Development at BMSCE</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE has a strong focus on Research and Development. The institution encourages faculty and students to engage in innovative research projects that address real-world challenges and contribute to technological advancement.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl border border-navy-100 dark:border-slate-700 text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Landmark className="w-8 h-8 text-navy-600 dark:text-gold-400" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">50+</h3>
                <p className="text-gray-600 dark:text-gray-400">Funded Research Projects</p>
              </div>
              <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl border border-navy-100 dark:border-slate-700 text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FileText className="w-8 h-8 text-navy-600 dark:text-gold-400" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">2000+</h3>
                <p className="text-gray-600 dark:text-gray-400">Journal Publications</p>
              </div>
              <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl border border-navy-100 dark:border-slate-700 text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <ShieldCheck className="w-8 h-8 text-navy-600 dark:text-gold-400" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">100+</h3>
                <p className="text-gray-600 dark:text-gray-400">Patents Filed</p>
              </div>
              <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl border border-navy-100 dark:border-slate-700 text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Award className="w-8 h-8 text-navy-600 dark:text-gold-400" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">14</h3>
                <p className="text-gray-600 dark:text-gray-400">Research Centers</p>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'funded-research-projects', 
        title: 'Funded Research Projects', 
        icon: Landmark, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Funded Research Projects</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our faculty members actively engage in research funded by prestigious national and international agencies, contributing to technological advancements and societal solutions.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Major Funding Agencies</h3>
              <ul className="grid md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 shrink-0" /> DST</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 shrink-0" /> AICTE</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 shrink-0" /> DRDO</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 shrink-0" /> ISRO</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 shrink-0" /> VGST</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 shrink-0" /> CSIR</li>
              </ul>
            </div>
          </div>
        ) 
      },
      { 
        id: 'journal-publications', 
        title: 'Journal Publications', 
        icon: FileText, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Journal Publications</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE faculty and students regularly publish their research findings in high-impact national and international journals, contributing to the global body of knowledge.
            </p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mt-6">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Publication Highlights</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Over 2000+ publications in Scopus/Web of Science indexed journals.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> High citation index reflecting the quality of research.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Collaborative publications with international universities and industry partners.</li>
              </ul>
            </div>
          </div>
        ) 
      },
      { 
        id: 'patents-filed', 
        title: 'Patents Filed', 
        icon: ShieldCheck, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Patents & Intellectual Property</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE encourages its faculty and students to protect their innovative ideas and inventions. The institution provides support for filing patents and managing intellectual property.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="text-4xl font-bold text-gold-500 mb-2">150+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Patents Filed</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="text-4xl font-bold text-navy-900 dark:text-white mb-2">45+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Patents Granted</div>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'r-d-committee', 
        title: 'R & D Committee', 
        icon: Users, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">R & D Committee</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Research and Development Committee oversees and promotes research activities across all departments.
            </p>
          </div>
        ) 
      },
      { 
        id: 'staff', 
        title: 'Staff', 
        icon: Users, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Research Staff</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Meet our dedicated research staff and principal investigators leading various projects.
            </p>
          </div>
        ) 
      },
      { 
        id: 'application-downloads', 
        title: 'Application Downloads', 
        icon: Download, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Application Downloads</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Download necessary forms and applications for research grants, fellowships, and Ph.D. enrollment.
            </p>
          </div>
        ) 
      },
      { 
        id: 'research-centers', 
        title: 'Research Centers', 
        icon: Building2, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Research Centers</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Explore our specialized research centers recognized by VTU and other academic bodies, dedicated to advancing knowledge and innovation.
            </p>
            
            <div className="grid gap-6 mt-8">
              {[
                {
                  name: "B.S. Narayan Centre for Nano-Materials & Displays",
                  focus: "Nanotechnology, Display Materials, Smart Coatings",
                  description: "A premier center focusing on the synthesis and characterization of nanomaterials for next-generation display technologies."
                },
                {
                  name: "Centre for Innovation, Incubation and Entrepreneurship (CIIE)",
                  focus: "Startups, Product Development, Mentorship",
                  description: "Fosters a culture of entrepreneurship by providing infrastructure and mentorship to student-led startups."
                },
                {
                  name: "Centre of Excellence in Advanced Materials Research",
                  focus: "Composite Materials, Smart Structures, Material Characterization",
                  description: "Dedicated to the development and testing of advanced materials for aerospace and structural applications."
                },
                {
                  name: "Centre of Excellence in Internet of Things (IoT)",
                  focus: "Smart Cities, Healthcare IoT, Industrial Automation",
                  description: "Researching secure and efficient IoT architectures for real-world applications in various sectors."
                },
                {
                  name: "Centre of Excellence in Cyber Security",
                  focus: "Network Security, Cryptography, Digital Forensics",
                  description: "Focuses on developing robust security frameworks and training professionals in cyber defense."
                }
              ].map((center, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 group hover:border-navy-200 dark:hover:border-slate-600 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white group-hover:text-navy-600 dark:group-hover:text-gold-400 transition-colors">
                      {center.name}
                    </h3>
                    <a href="https://bmsce.ac.in/research" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-slate-700 rounded-lg text-gray-400 hover:text-navy-600 dark:hover:text-gold-400 transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {center.description}
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="font-semibold text-navy-900 dark:text-white mr-2">Focus Area:</span>
                    <span className="text-gray-500 dark:text-gray-400 italic">{center.focus}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-700">
                    <a href="https://bmsce.ac.in/research" target="_blank" rel="noopener noreferrer" className="text-navy-600 dark:text-gold-400 font-medium hover:underline inline-flex items-center">
                      View Center Details <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) 
      },
      { 
        id: 'innovative-labs', 
        title: 'Innovative Labs', 
        icon: FlaskConical, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Innovative Labs</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              State-of-the-art laboratories equipped with the latest technology to foster innovation.
            </p>
          </div>
        ) 
      },
      { 
        id: 'mou-s-with-industries-research-center', 
        title: "MoU's With Industries & Research Center", 
        icon: Network, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">MoU's With Industries & Research Center</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Details of Memorandums of Understanding signed with leading industries and research organizations.
            </p>
          </div>
        ) 
      },
      { 
        id: 'list-of-ph-d-awarded', 
        title: 'List of Ph.D Awarded', 
        icon: Award, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">List of Ph.D Awarded</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A comprehensive list of scholars who have successfully completed their Ph.D. from our research centers.
            </p>
          </div>
        ) 
      },
      { 
        id: 'list-of-m-sc-awarded', 
        title: 'List of M.Sc Awarded', 
        icon: Award, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">List of M.Sc Awarded</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A comprehensive list of scholars who have successfully completed their M.Sc. (Engineering) by Research.
            </p>
          </div>
        ) 
      },
      { 
        id: 'ph-d-enrollment-in-research-centres', 
        title: 'Ph.D Enrollment in Research Centres', 
        icon: BookOpen, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Ph.D Enrollment in Research Centres</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Information regarding current Ph.D. scholars enrolled across various research centers.
            </p>
          </div>
        ) 
      },
      { 
        id: 'b-s-narayan-ph-d-fellowship', 
        title: 'B S Narayan Ph.D Fellowship', 
        icon: Award, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">B S Narayan Ph.D Fellowship</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Details about the prestigious B S Narayan Ph.D. Fellowship program for meritorious research scholars.
            </p>
          </div>
        ) 
      },
      { 
        id: 'b-s-narayan-centre-for-nano-materials-displays', 
        title: 'B S Narayan Centre for Nano-Materials & Displays', 
        icon: Microscope, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">B S Narayan Centre for Nano-Materials & Displays</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A center of excellence dedicated to advanced research in nano-materials and display technologies.
            </p>
          </div>
        ) 
      },
      { 
        id: 'gallery', 
        title: 'Gallery', 
        icon: ImageIcon, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Gallery</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Visual highlights of research activities, lab facilities, and events.
            </p>
          </div>
        ) 
      },
      { 
        id: 'irins-portal', 
        title: 'IRINS Portal', 
        icon: Globe, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">IRINS Portal</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Access the Indian Research Information Network System (IRINS) portal for BMSCE faculty profiles and publications.
            </p>
          </div>
        ) 
      },
      { 
        id: 'contact-us', 
        title: 'Contact Us', 
        icon: Phone, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Contact Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Get in touch with the Research and Development cell for inquiries and collaborations.
            </p>
          </div>
        ) 
      },
    ]
  },
  'facilities': {
    title: 'Facilities',
    items: [
      { 
        id: 'library', 
        title: 'Library', 
        icon: BookOpen, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Central Library</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The BMSCE Central Library is a hub of knowledge, offering an extensive collection of books, journals, and digital resources to support the academic and research needs of students and faculty.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Resources</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-2"><span>Printed Books</span> <span className="font-bold text-navy-900 dark:text-white">1,50,000+</span></li>
                  <li className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-2"><span>E-Books</span> <span className="font-bold text-navy-900 dark:text-white">50,000+</span></li>
                  <li className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-2"><span>E-Journals</span> <span className="font-bold text-navy-900 dark:text-white">10,000+</span></li>
                  <li className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-2"><span>Print Journals</span> <span className="font-bold text-navy-900 dark:text-white">150+</span></li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Facilities</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Digital Library with high-speed internet</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Spacious reading halls with 500+ seating capacity</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Automated issue and return system</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Access to IEEE, Springer, ScienceDirect, etc.</li>
                </ul>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'bms-hospital', 
        title: 'BMS Hospital', 
        icon: Heart, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">BMS Hospital</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The BMS Hospital, located adjacent to the campus, provides comprehensive healthcare services to students, staff, and the general public.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Facilities & Services</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> 24/7 Emergency Care</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Outpatient Department (OPD)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Diagnostic Laboratory</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Pharmacy</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Specialized Consultations</li>
              </ul>
            </div>
          </div>
        ) 
      },
      { 
        id: 'hostel', 
        title: 'Hostel', 
        icon: Building2, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Hostel Facilities</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE provides comfortable and secure accommodation for both boys and girls. The hostels are equipped with modern amenities to ensure a conducive environment for study and living.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Amenities</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Wi-Fi enabled campus</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> 24/7 Security and CCTV surveillance</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Hygienic mess facility with varied menu</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Reading rooms and recreation areas</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Accommodation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Separate blocks for boys and girls with options for single, double, and triple occupancy rooms. Rooms are well-furnished and well-ventilated.
                </p>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'sports', 
        title: 'Sports', 
        icon: Target, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Sports & Athletics</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We believe in the holistic development of our students. BMSCE boasts excellent sports infrastructure to encourage physical fitness and competitive spirit.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Facilities Available</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Indoor Stadium (Badminton, Table Tennis)</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Basketball Courts</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Volleyball Courts</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Multi-gymnasium</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Cricket Ground</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Football Field</li>
              </ul>
            </div>
          </div>
        ) 
      },
      { 
        id: 'data-center', 
        title: 'Data Center', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Data Center</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The campus is equipped with a state-of-the-art Data Center providing high-speed internet connectivity and robust IT infrastructure to support academic and research activities.
            </p>
          </div>
        ) 
      },
      { 
        id: 'counselling-center', 
        title: 'Counselling Center', 
        icon: Heart, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Counselling Center</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Dedicated professional counsellors are available on campus to support the mental health and emotional well-being of our students.
            </p>
          </div>
        ) 
      },
    ]
  },
  'placements': {
    title: 'Placements',
    items: [
      { 
        id: 'about-placements', 
        title: 'About Placements', 
        icon: Briefcase, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Placement Cell</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The Placement Cell at BMSCE acts as a bridge between students and the corporate world. It is dedicated to providing excellent career opportunities and ensuring that students are industry-ready.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-6 rounded-xl text-white text-center shadow-lg">
                <h3 className="text-4xl font-bold text-gold-400 mb-2">95%+</h3>
                <p className="text-gray-300">Placement Rate</p>
              </div>
              <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-6 rounded-xl text-white text-center shadow-lg">
                <h3 className="text-4xl font-bold text-gold-400 mb-2">350+</h3>
                <p className="text-gray-300">Recruiting Companies</p>
              </div>
              <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-6 rounded-xl text-white text-center shadow-lg">
                <h3 className="text-4xl font-bold text-gold-400 mb-2">50 LPA</h3>
                <p className="text-gray-300">Highest Package</p>
              </div>
            </div>
            <div className="mt-8 bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Top Recruiters</h3>
              <div className="flex flex-wrap gap-4">
                {['Microsoft', 'Amazon', 'Atlassian', 'Cisco', 'Oracle', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Intel', 'Texas Instruments'].map(company => (
                  <span key={company} className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'placement-training', 
        title: 'Placement Training', 
        icon: Users, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Placement Training</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To ensure our students are industry-ready, the Placement Cell organizes comprehensive training programs starting from the pre-final year.
            </p>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 mt-6">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Training Modules</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> <strong>Aptitude Training:</strong> Quantitative, logical reasoning, and verbal ability.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> <strong>Technical Skills:</strong> Coding challenges, domain-specific workshops, and hackathons.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> <strong>Soft Skills:</strong> Communication, teamwork, leadership, and personality development.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> <strong>Interview Preparation:</strong> Mock interviews, group discussions, and resume building.</li>
              </ul>
            </div>
          </div>
        ) 
      },
      { 
        id: 'placement-statistics', 
        title: 'Placement Statistics', 
        icon: BarChart, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Placement Statistics</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE has a consistent track record of excellent placements. Our graduates are highly sought after by top-tier companies across various sectors.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="text-4xl font-bold text-gold-500 mb-2">90%+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Placement Rate</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="text-4xl font-bold text-navy-900 dark:text-white mb-2">350+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Visiting Companies</div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">₹48 LPA</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Highest Package</div>
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'recruiting-companies', 
        title: 'Recruiting Companies', 
        icon: Building2, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Top Recruiting Companies</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We have strong industry linkages, and leading multinational companies regularly visit our campus for recruitment.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Major Recruiters</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Microsoft', 'Amazon', 'Google', 'Cisco', 'Intel', 'IBM', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Bosch', 'Texas Instruments'].map(company => (
                  <div key={company} className="bg-white dark:bg-slate-800 p-3 rounded-lg text-center border border-gray-100 dark:border-slate-700 shadow-sm font-medium text-gray-700 dark:text-gray-300">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) 
      },
      { 
        id: 'placement-achievements', 
        title: 'Placement Achievements', 
        icon: Award, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Placement Achievements</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Highlighting the remarkable success stories and top placements of our students in leading global organizations.
            </p>
          </div>
        ) 
      },
      { 
        id: 'staff', 
        title: 'Staff', 
        icon: Users, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Placement Cell Staff</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Meet the dedicated team of professionals working tirelessly to bridge the gap between students and the corporate world.
            </p>
          </div>
        ) 
      },
      { 
        id: 'placement-activities', 
        title: 'Placement Activities', 
        icon: Briefcase, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Placement Activities</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              A comprehensive overview of the various activities, workshops, and seminars organized by the Placement Cell throughout the academic year.
            </p>
          </div>
        ) 
      },
      { 
        id: 'gallery', 
        title: 'Gallery', 
        icon: ImageIcon, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Gallery</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Visual highlights of placement drives, training sessions, and corporate interactions.
            </p>
          </div>
        ) 
      },
      { 
        id: 'contact-us', 
        title: 'Contact Us', 
        icon: Phone, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Contact Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Get in touch with the Placement Cell for recruitment inquiries and student support.
            </p>
          </div>
        ) 
      },
    ]
  },
  'innovation': {
    title: 'Innovation',
    items: [
      { 
        id: 'overview', 
        title: 'Innovation Overview', 
        icon: Lightbulb, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Innovation & Entrepreneurship</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE is committed to fostering a culture of innovation and entrepreneurship among its students. We provide the necessary ecosystem, mentorship, and resources to transform innovative ideas into successful startups.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Incubation Center</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our state-of-the-art incubation center provides workspace, high-speed internet, and access to labs for student startups.
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Mentorship from industry experts</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Seed funding assistance</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Networking opportunities</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Key Initiatives</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Hackathons and Ideathons</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Entrepreneurship Awareness Camps</li>
                  <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-2 mt-0.5 shrink-0" /> Maker Space for prototyping</li>
                </ul>
              </div>
            </div>
          </div>
        ) 
      }
    ]
  },
  'skill-labs': {
    title: 'Skill Labs',
    items: [
      { 
        id: 'overview', 
        title: 'Skill Labs Overview', 
        icon: Monitor, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Advanced Skill Labs</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              To bridge the gap between academia and industry, BMSCE has established several advanced skill labs in collaboration with leading technology companies.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-6">
              {[
                { name: 'IoT & Embedded Systems Lab', partner: 'Texas Instruments' },
                { name: 'Cloud Computing Lab', partner: 'AWS Academy' },
                { name: 'Robotics & Automation Lab', partner: 'ABB' },
                { name: 'Data Science & AI Lab', partner: 'IBM' }
              ].map((lab, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{lab.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">In collaboration with <span className="font-semibold text-gold-600 dark:text-gold-400">{lab.partner}</span></p>
                </div>
              ))}
            </div>
          </div>
        ) 
      }
    ]
  },
  'coe': {
    title: 'Center of Excellence',
    items: [
      { 
        id: 'overview', 
        title: 'COE Overview', 
        icon: Award, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Centers of Excellence (CoE)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE hosts several Centers of Excellence dedicated to advanced research and development in niche technology areas. These centers facilitate interdisciplinary research and industry collaboration.
            </p>
            <div className="space-y-4 mt-6">
              {[
                { title: 'CoE in Advanced Materials Research', desc: 'Focuses on nanomaterials, composites, and smart materials.' },
                { title: 'CoE in Internet of Things (IoT)', desc: 'Dedicated to developing smart solutions for healthcare, agriculture, and smart cities.' },
                { title: 'CoE in Cyber Security', desc: 'Research in cryptography, network security, and digital forensics.' }
              ].map((coe, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-start">
                  <Award className="w-6 h-6 text-gold-500 mr-4 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{coe.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{coe.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) 
      }
    ]
  },
  'teqip': {
    title: 'TEQIP',
    items: [
      { 
        id: 'overview', 
        title: 'TEQIP Overview', 
        icon: FileText, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">TEQIP (Technical Education Quality Improvement Programme)</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              BMSCE has been actively participating in the TEQIP phases, a World Bank-assisted project by the Government of India to improve the quality of technical education system in the country.
            </p>
            <div className="bg-navy-50 dark:bg-slate-800/50 p-6 rounded-xl mt-6 border border-navy-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Key Achievements under TEQIP</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Upgradation of laboratories with state-of-the-art equipment.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Enhanced faculty development programs and pedagogical training.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Increased research output and industry-institute interaction.</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 text-gold-500 mr-3 mt-0.5 shrink-0" /> Implementation of academic and non-academic reforms.</li>
              </ul>
            </div>
          </div>
        ) 
      }
    ]
  },
  'documents': {
    title: 'Documents',
    items: [
      { 
        id: 'overview', 
        title: 'Important Documents', 
        icon: Download, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Important Documents & Downloads</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Access essential forms, academic calendars, policy documents, and other resources.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                'Academic Calendar 2023-24',
                'Student Handbook',
                'Anti-Ragging Policy',
                'Hostel Rules & Regulations',
                'Examination Guidelines',
                'Scholarship Application Form'
              ].map((doc, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between hover:border-gold-500 transition-colors cursor-pointer group">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-gold-500 mr-3" />
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-navy-900 dark:group-hover:text-white">{doc}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-gold-500" />
                </div>
              ))}
            </div>
          </div>
        ) 
      }
    ]
  },
  'activities': {
    title: 'Activities',
    items: [
      { 
        id: 'overview', 
        title: 'Student Activities', 
        icon: Users, 
        content: (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white border-b pb-4">Student Activities & Clubs</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Life at BMSCE goes beyond academics. We encourage students to participate in various extracurricular activities, technical clubs, and cultural events for holistic development.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Technical Clubs</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><Monitor className="w-4 h-4 mr-2 text-gold-500" /> Coding Club</li>
                  <li className="flex items-center"><Zap className="w-4 h-4 mr-2 text-gold-500" /> Robotics Society</li>
                  <li className="flex items-center"><Globe className="w-4 h-4 mr-2 text-gold-500" /> Aero BMSCE</li>
                  <li className="flex items-center"><Network className="w-4 h-4 mr-2 text-gold-500" /> IEEE Student Branch</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Cultural & Arts</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center"><Users className="w-4 h-4 mr-2 text-gold-500" /> Utsav (Annual Cultural Fest)</li>
                  <li className="flex items-center"><Heart className="w-4 h-4 mr-2 text-gold-500" /> Fine Arts Club</li>
                  <li className="flex items-center"><FileSignature className="w-4 h-4 mr-2 text-gold-500" /> Literary Society</li>
                  <li className="flex items-center"><Target className="w-4 h-4 mr-2 text-gold-500" /> Photography Club</li>
                </ul>
              </div>
            </div>
          </div>
        ) 
      }
    ]
  }
};