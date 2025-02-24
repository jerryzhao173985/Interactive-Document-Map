// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Setup __dirname for ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize lowdb with a default value.
const adapter = new JSONFile('db.json');
const db = new Low(adapter, { default: { documents: [] } });

// Read the database; this will populate db.data with the contents of db.json (or the default if empty)
await db.read();
// Ensure db.data exists
if (!db.data) {
  db.data = {};
}
// Ensure db.data.documents exists
if (!db.data.documents) {
  db.data.documents = [];
  await db.write();
}

const app = express();
const port = 3000;

// Your document data and functions (initialDocuments, importStructuredData, API endpoints, etc.) remain the same...

// Expanded placeholder document data
const initialDocuments = [
  {
    id: "doc1",
    name: "Core Sample Report 1",
    testType: "CRS",
    subType: "High",
    fileType: "pdf",
    externalLinks: ["https://example.com/core1"],
    details: "Core recovery of 95% recorded at Site A.",
    connections: ["doc2", "doc4"],
    bmsLink: "https://bms.example.com/doc1",
    sharepointLink: "https://sharepoint.example.com/doc1"
  },
  {
    id: "doc2",
    name: "Core Sample Report 2",
    testType: "CRS",
    subType: "Moderate",
    fileType: "pdf",
    externalLinks: ["https://example.com/core2"],
    details: "Core recovery of 80% recorded at Site A.",
    connections: ["doc1", "doc3"]
  },
  {
    id: "doc3",
    name: "Core Sample Report 3",
    testType: "CRS",
    subType: "Low",
    fileType: "pdf",
    externalLinks: ["https://example.com/core3"],
    details: "Core recovery of 65% recorded at Site B.",
    connections: ["doc2", "doc5"]
  },
  {
    id: "doc4",
    name: "Standard Penetration Test Report 1",
    testType: "SPT",
    subType: "High",
    fileType: "pdf",
    externalLinks: ["https://example.com/spt1"],
    details: "SPT shows high soil resistance at Site A.",
    connections: ["doc1", "doc6"]
  },
  {
    id: "doc5",
    name: "Standard Penetration Test Report 2",
    testType: "SPT",
    subType: "Low",
    fileType: "pdf",
    externalLinks: ["https://example.com/spt2"],
    details: "SPT indicates low resistance at Site B.",
    connections: ["doc3"]
  },
  {
    id: "doc6",
    name: "pH Measurement Report 1",
    testType: "pH",
    subType: "Neutral",
    fileType: "pdf",
    externalLinks: ["https://example.com/ph1"],
    details: "pH value of 7.0 at Site C.",
    connections: ["doc4", "doc7"]
  },
  {
    id: "doc7",
    name: "pH Measurement Report 2",
    testType: "pH",
    subType: "Acidic",
    fileType: "pdf",
    externalLinks: ["https://example.com/ph2"],
    details: "pH value of 5.5 at Site C.",
    connections: ["doc6"]
  }
];

// Function to import additional structured data from sample files.
function importStructuredData() {
  const sampleExcelPath = path.join(__dirname, 'data', 'sample_excel.json');
  const sampleWordPath = path.join(__dirname, 'data', 'sample_word.json');

  if (fs.existsSync(sampleExcelPath)) {
    const excelData = JSON.parse(fs.readFileSync(sampleExcelPath, 'utf8'));
    excelData.forEach(doc => {
      if (!db.data.documents.find(d => d.id === doc.id)) {
        db.data.documents.push(doc);
      }
    });
  }
  if (fs.existsSync(sampleWordPath)) {
    const wordData = JSON.parse(fs.readFileSync(sampleWordPath, 'utf8'));
    wordData.forEach(doc => {
      if (!db.data.documents.find(d => d.id === doc.id)) {
        db.data.documents.push(doc);
      }
    });
  }
  db.write(); // Persist changes
}

// Initialize DB if empty.
if (db.data.documents.length === 0) {
  initialDocuments.forEach(doc => db.data.documents.push(doc));
  importStructuredData();
  await db.write();
}

// API endpoint: Get all documents.
app.get('/api/documents', (req, res) => {
  res.json(db.data.documents);
});

// API endpoint: Get business rules.
app.get('/api/rules', (req, res) => {
  const rulesPath = path.join(__dirname, 'rules.json');
  fs.readFile(rulesPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading rules file:", err);
      res.status(500).json({ error: "Failed to load rules" });
      return;
    }
    try {
      const rules = JSON.parse(data);
      res.json(rules);
    } catch (parseError) {
      res.status(500).json({ error: "Failed to parse rules" });
    }
  });
});

// Serve static files from the 'public' directory.
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
