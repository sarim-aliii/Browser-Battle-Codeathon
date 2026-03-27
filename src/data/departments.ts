export const departmentsData: Record<string, any> = {
  "computer-science": {
    id: "computer-science",
    name: "Computer Science & Engineering",
    description: "The Department of Computer Science & Engineering is dedicated to advancing the field of computing through innovative teaching, cutting-edge research, and industry collaboration. Our curriculum is designed to meet the ever-evolving demands of the tech industry.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop",
    faculty: [
      { 
        id: "alan-turing",
        name: "Dr. Alan Turing", 
        role: "Professor & Head", 
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Alan Turing is a pioneer in computer science, focusing on theoretical computation and artificial intelligence.",
        researchInterests: ["Theoretical Computer Science", "Artificial Intelligence", "Cryptography"],
        publications: [
          "On Computable Numbers, with an Application to the Entscheidungsproblem (1936)",
          "Computing Machinery and Intelligence (1950)"
        ]
      },
      { 
        id: "grace-hopper",
        name: "Dr. Grace Hopper", 
        role: "Associate Professor", 
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Grace Hopper is a pioneer of computer programming who invented one of the first linkers.",
        researchInterests: ["Compilers", "Programming Languages", "Software Engineering"],
        publications: [
          "The Education of a Computer (1952)",
          "A Manual of Operation for the Automatic Sequence Controlled Calculator (1946)"
        ]
      },
      { 
        id: "john-von-neumann",
        name: "Dr. John von Neumann", 
        role: "Assistant Professor", 
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. John von Neumann made major contributions to a number of fields, including mathematics, physics, computer science, and statistics.",
        researchInterests: ["Computer Architecture", "Game Theory", "Quantum Mechanics"],
        publications: [
          "First Draft of a Report on the EDVAC (1945)",
          "Theory of Games and Economic Behavior (1944)"
        ]
      }
    ],
    courses: [
      { name: "B.Tech in Computer Science", duration: "4 Years", type: "Undergraduate" },
      { name: "M.Tech in Artificial Intelligence", duration: "2 Years", type: "Postgraduate" },
      { name: "Ph.D. in Computer Science", duration: "3-5 Years", type: "Doctoral" }
    ],
    research: ["Artificial Intelligence", "Machine Learning", "Cybersecurity", "Cloud Computing", "Data Science"]
  },
  "mechanical-engineering": {
    id: "mechanical-engineering",
    name: "Mechanical Engineering",
    description: "The Mechanical Engineering department focuses on the design, analysis, manufacturing, and maintenance of mechanical systems. We equip students with the skills to tackle complex engineering challenges in robotics, automotive, and aerospace industries.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2940&auto=format&fit=crop",
    faculty: [
      { 
        id: "nikola-tesla",
        name: "Dr. Nikola Tesla", 
        role: "Professor & Head", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Nikola Tesla is known for his contributions to the design of the modern alternating current (AC) electricity supply system.",
        researchInterests: ["Electromagnetism", "Wireless Power Transfer", "Robotics"],
        publications: [
          "A New System of Alternating Current Motors and Transformers (1888)",
          "The Problem of Increasing Human Energy (1900)"
        ]
      },
      { 
        id: "marie-curie",
        name: "Dr. Marie Curie", 
        role: "Associate Professor", 
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Marie Curie conducted pioneering research on radioactivity.",
        researchInterests: ["Radioactivity", "Materials Science", "Thermodynamics"],
        publications: [
          "Recherches sur les substances radioactives (1903)",
          "Traité de Radioactivité (1910)"
        ]
      }
    ],
    courses: [
      { name: "B.Tech in Mechanical Engineering", duration: "4 Years", type: "Undergraduate" },
      { name: "M.Tech in Thermal Engineering", duration: "2 Years", type: "Postgraduate" },
      { name: "Ph.D. in Mechanical Engineering", duration: "3-5 Years", type: "Doctoral" }
    ],
    research: ["Robotics & Automation", "Thermal Sciences", "Fluid Mechanics", "Advanced Manufacturing"]
  },
  "electrical-engineering": {
    id: "electrical-engineering",
    name: "Electrical Engineering",
    description: "Our Electrical Engineering department provides comprehensive education in power systems, electronics, control systems, and signal processing. We prepare students to innovate in renewable energy, smart grids, and telecommunications.",
    image: "https://images.unsplash.com/photo-1620283085068-5aab1b565093?q=80&w=2940&auto=format&fit=crop",
    faculty: [
      { 
        id: "thomas-edison",
        name: "Dr. Thomas Edison", 
        role: "Professor & Head", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Thomas Edison developed many devices in fields such as electric power generation, mass communication, sound recording, and motion pictures.",
        researchInterests: ["Power Systems", "Direct Current", "Telecommunications"],
        publications: [
          "Improvements in Electric Lamps (1880)",
          "System of Electrical Distribution (1883)"
        ]
      },
      { 
        id: "hedy-lamarr",
        name: "Dr. Hedy Lamarr", 
        role: "Associate Professor", 
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Hedy Lamarr was an inventor who pioneered the technology that would one day form the basis for today's WiFi, GPS, and Bluetooth communication systems.",
        researchInterests: ["Spread Spectrum", "Wireless Communications", "Signal Processing"],
        publications: [
          "Secret Communication System (1942)"
        ]
      }
    ],
    courses: [
      { name: "B.Tech in Electrical Engineering", duration: "4 Years", type: "Undergraduate" },
      { name: "M.Tech in Power Systems", duration: "2 Years", type: "Postgraduate" },
      { name: "Ph.D. in Electrical Engineering", duration: "3-5 Years", type: "Doctoral" }
    ],
    research: ["Smart Grids", "Renewable Energy", "Control Systems", "Power Electronics"]
  },
  "civil-engineering": {
    id: "civil-engineering",
    name: "Civil Engineering",
    description: "The Civil Engineering department is committed to developing sustainable infrastructure solutions. Our programs cover structural engineering, transportation, environmental engineering, and construction management.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2940&auto=format&fit=crop",
    faculty: [
      { 
        id: "gustave-eiffel",
        name: "Dr. Gustave Eiffel", 
        role: "Professor & Head", 
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Gustave Eiffel was a civil engineer and architect, best known for the world-famous Eiffel Tower.",
        researchInterests: ["Structural Engineering", "Aerodynamics", "Steel Structures"],
        publications: [
          "La Tour de Trois Cents Mètres (1900)",
          "Recherches expérimentales sur la résistance de l'air (1907)"
        ]
      },
      { 
        id: "emily-roebling",
        name: "Dr. Emily Roebling", 
        role: "Associate Professor", 
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
        bio: "Dr. Emily Roebling is known for her contribution to the completion of the Brooklyn Bridge.",
        researchInterests: ["Bridge Construction", "Materials Engineering", "Project Management"],
        publications: [
          "Notes on the Construction of the Brooklyn Bridge (1883)"
        ]
      }
    ],
    courses: [
      { name: "B.Tech in Civil Engineering", duration: "4 Years", type: "Undergraduate" },
      { name: "M.Tech in Structural Engineering", duration: "2 Years", type: "Postgraduate" },
      { name: "Ph.D. in Civil Engineering", duration: "3-5 Years", type: "Doctoral" }
    ],
    research: ["Sustainable Infrastructure", "Structural Health Monitoring", "Transportation Systems", "Environmental Engineering"]
  }
};
