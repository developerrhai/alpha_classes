const fs = require('fs');
let content = fs.readFileSync('components/teacher/NotesDropdownView.tsx', 'utf8');

// 1. loadBranches
content = content.replace(
  /const loadBranches = async \(\) => \{[\s\S]*?toast\.error\("Failed to load branches"\); \}\n  \};/,
  \const loadBranches = async () => {
    try {
      const data = await getBranches();
      const brs = data?.data?.branches || data?.branches || [];
      setBranches(brs);
      if (brs.length > 0) {
        const id = String(brs[0].branch_id);
        setSelectedBranchId(id);
        fetchBatches(Number(id));
      }
    } catch (err) { toast.error("Failed to load branches"); }
  };\.trim()
);

// 2. Hide Branch UI in dropdown
content = content.replace(
  /\{\/\* Branch Select \*\/\}[\s\S]*?<\/div>/,
  '{/* Branch Select hidden */}'
);

// 3. Hide Branch option from Manage Modal
content = content.replace(
  /<option value="branch">Branch<\/option>\n\s*/,
  ''
);
// And change default addType to batch
content = content.replace(
  /const \[addType, setAddType\] = useState<"branch" \| "batch" \| "board" \| "standard" \| "subject" \| "chapter" \| "note">\("branch"\);/,
  'const [addType, setAddType] = useState<"branch" | "batch" | "board" | "standard" | "subject" | "chapter" | "note">("batch");'
);

// 4. Hide "Parent Branch" from batch form
content = content.replace(
  /\{addType === "batch" && \([\s\S]*?<\/div>\n\s*\)\}/,
  ''
);

// 5. In handleReset, do not clear Branch
content = content.replace(
  /setSelectedBranchId\(""\);\n\s*/,
  ''
);

fs.writeFileSync('components/teacher/NotesDropdownView.tsx', content);
console.log("Updated NotesDropdownView successfully");
