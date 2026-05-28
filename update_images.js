const fs = require('fs');
let content = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf8');

const projectImages = {
  'Event Ticketing DApp': '1459749411175-04bf5292ceea',
  'AI ChatBot': '1531746020798-e6953c6e8e04',
  'LearnSphere': '1501504905252-473c47e087f8',
  'Communication App': '1611162617474-5b21e879e113',
  'Dynamic Weather Dashboard': '1561484930-998b6a7b22e8',
  'To Do List App': '1484480974693-6ca0a78fb36b',
  'Moving Object Detection': '1507146426996-ef05306b995a',
  'PhishCatcher': '1550751827-4bd374c3f58b',
  'AI Assistant': '1518770660439-4636190af475',
  'Chennai Artisanal DApp': '1452860606245-08befc0ff44b',
  'Globe Trotter': '1451187580459-43490279c0fa',
  'VEXTA \u2013 Personalized IDP Generator': '1551288049-bebda4e38f71',
  'Money Manager App': '1554224155-6726b3ff858f',
  'Indian Constituency Dashboard': '1551288049-bebda4e38f71',
  'Machine Learning Climate Risk': '1454789548928-9efd52dc4031',
  'Global Terrorism Analysis': '1526304640581-d334cdbbf45e',
  'Event Ticketing & Registration': '1459749411175-04bf5292ceea'
};

for (const title of Object.keys(projectImages)) {
  const id = projectImages[title];
  const restr = '(title: "' + title + '",[\\s\\S]*?image: ")[^"]+\"';
  content = content.replace(new RegExp(restr, 'm'), "$1"https://images.unsplash.com/photo-" + id + "?w=800&q=80$\"2");
}

fs.writeFileSync('src/components/ProjectsSection.tsx', content);
console.log('Images applied.');