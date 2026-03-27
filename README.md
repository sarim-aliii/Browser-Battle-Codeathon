BMSCE Digital Excellence Portal
Engineering • Innovation • Excellence
🚀 The Vision
The BMSCE Digital Excellence Portal is a next-generation institutional platform designed to bridge the gap between traditional academic administration and modern digital experiences. Built for the Browser Battle Codeathon, this portal prioritizes high-performance data handling, immersive UI/UX, and AI-driven student support.

✨ Killer Features
🤖 1. Multilingual AI Academic Advisor
Powered by Google Gemini Pro, our integrated chatbot isn't just a search tool—it's a counselor.

Native Support: Switch between English, Kannada, Hindi, and Telugu.

Context-Aware: Secrets-injected prompting allows the AI to accurately answer BMSCE-specific queries regarding departments and labs.

🧪 2. Propel Labs Innovation Hub
A dedicated, immersive showcase of BMSCE’s high-tech labs.

COE Integration: Highlights the NVIDIA DGX A100 CoE and Robotics (Propel-1) labs.

Interactive Stats: Real-time visibility into lab achievements and industry partners (ARM, ISRO, MediaTek).

⚡ 3. Enterprise Admin Dashboard
A robust "Command Center" for institutional heads.

Scalable Queries: Uses Firebase getCountFromServer() for optimized, low-cost data counting.

Role-Based Access: Secure routes for managing Users, Departments, and Course Catalogs.

🎨 4. Premium "Glassmorphic" UI
Magnetic Components: Interactive buttons and logos using physical-simulated magnetic pull.

Fluid Motion: Staggered list reveals and layout animations powered by Framer Motion.

Dark Mode Excellence: A fully reactive theme system designed for long-form academic reading.

🛠️ Technical Stack
Category	Technology
Frontend	React 18, TypeScript, Vite
Styling	Tailwind CSS v4, Framer Motion, Lucide Icons
Backend	Firebase (Firestore, Auth, Hosting)
AI/ML	Google Gemini API (Generative AI SDK)
Performance	GSAP, React-Zoom-Pan-Pinch
🏗️ Architecture
Plaintext
src/
├── components/
│   ├── admin/      # Management Systems (Users, Courses)
│   ├── chat/       # Gemini AI Multilingual Chatbot
│   ├── layout/     # Navigation, Mega-Menus, Sticky Headers
│   └── ui/         # Magnetic & Framer Motion primitives
├── data/           # Static institutional data (Departments, Labs)
├── lib/            # Firebase config & Gemini API wrappers
└── pages/          # Immersive Landing, Catalog, & Detail views
🏁 Getting Started
1. Clone the repository
Bash
git clone https://github.com/your-username/browser-battle-codeathon.git
cd browser-battle-codeathon
2. Install Dependencies
Bash
npm install
3. Setup Environment Variables
Create a .env file in the root and add your keys:

Code snippet
VITE_FIREBASE_API_KEY=your_key
VITE_GEMINI_API_KEY=your_key
4. Run Development Server
Bash
npm run dev


👨‍💻 Developed By
Team Pexpo

Developed for the Browser Battle Codeathon 2026