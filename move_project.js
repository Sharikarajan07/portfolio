const fs = require('fs');
let content = fs.readFileSync('src/components/ProjectsSection.tsx', 'utf8');

// Find the start of the array
const arrayStartIdx = content.indexOf('const allProjects = [');
if (arrayStartIdx === -1) {
  console.log("Could not find allProjects array.");
  process.exit(1);
}

// Extract the project object string
const targetTitle = "Event Ticketing & Registration";
const projectRegex = new RegExp(`\\s*\\{[\\s\\S]*?title: "${targetTitle}"[\\s\\S]*?\\},?`, 'm');

const match = content.match(projectRegex);

if (match) {
  let projectString = match[0];
  
  // Remove the project from its current location
  content = content.replace(projectString, '');
  
  // Clean up trailing comma if needed on the extracted string
  if (!projectString.trim().endsWith(',')) {
    projectString += ',';
  }
  
  // Ensure it has a leading newline and spaces for formatting
  projectString = `\n  {` + projectString.substring(projectString.indexOf('{') + 1);

  // Insert it right after the array opening bracket
  const insertPos = content.indexOf('[', arrayStartIdx) + 1;
  content = content.slice(0, insertPos) + projectString + content.slice(insertPos);
  
  // Small cleanup for double commas
  content = content.replace(/,\s*,/g, ',');
  
  fs.writeFileSync('src/components/ProjectsSection.tsx', content);
  console.log("Successfully moved project to top.");
} else {
  console.log("Could not find project: " + targetTitle);
}
