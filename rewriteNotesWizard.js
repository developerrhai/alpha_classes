const fs = require('fs');
let content = fs.readFileSync('components/teacher/NotesWizard.tsx', 'utf8');

// 1. STEP_LABELS and ADD_LABELS
content = content.replace(
  /const STEP_LABELS = \[[\s\S]*?\];/,
  'const STEP_LABELS = [\n  "Select Batch",\n  "Select Board",\n  "Select Standard",\n  "Select Subject",\n  "Select Chapter",\n  "Notes",\n];'
);
content = content.replace(
  /const ADD_LABELS = \[[\s\S]*?\];/,
  'const ADD_LABELS = [\n  "Add Batch",\n  "Add Board",\n  "Add Standard",\n  "Add Subject",\n  "Add Chapter",\n  "Add Note",\n];'
);

// 2. loadBranches logic
content = content.replace(
  /const loadBranches = async \(\) => \{[\s\S]*?toast\.error\("Failed to load branches"\); \}\n  \};/,
  \const loadBranches = async () => {
    try {
      const data = await getBranches();
      const brs = data?.data?.branches || data?.branches || [];
      if (brs.length > 0) {
        setSelectedBranch(brs[0]);
        fetchBatches(brs[0].branch_id);
      }
    } catch (err) { toast.error("Failed to load branches"); }
  };\.trim()
);

// 3. handleSuccessAddition logic
content = content.replace(
  /const handleSuccessAddition = \(\) => \{[\s\S]*?\n  \};/,
  \const handleSuccessAddition = () => {
    setOpen(false);
    if (step === 1 && selectedBranch) fetchBatches(selectedBranch.branch_id);
    if (step === 2) loadBoards();
    if (step === 3 && selectedBoard && selectedBatch) fetchStandards(selectedBoard.board_id, selectedBatch.batch_id, selectedBranch?.branch_id);
    if (step === 4 && selectedStandard) fetchSubjects(selectedStandard.stand_id, selectedBranch?.branch_id, selectedBatch?.batch_id, selectedBoard?.board_id);
    if (step === 5 && selectedSubject) fetchChapters(selectedSubject.sub_id, selectedStandard?.stand_id, selectedBranch?.branch_id, selectedBatch?.batch_id, selectedBoard?.board_id);
    if (step === 6 && selectedChapter) fetchNotes(selectedChapter.chap_id, selectedSubject.sub_id, selectedStandard?.stand_id, selectedBranch?.branch_id, selectedBatch?.batch_id, selectedBoard?.board_id);
  };\.trim()
);

// 4. UI Steps shifting (Main UI)
content = content.replace(/\{\/\* Step 1: Branch \*\/\}[\s\S]*?\{\/\* Step 2: Batch \*\/\}/, '{/* Step 1: Batch */}');
content = content.replace(/step === 2 && \(/g, 'step === 1 && (');
content = content.replace(/setStep\(3\)/g, 'setStep(2)');

content = content.replace(/\{\/\* Step 3: Board \*\/\}/g, '{/* Step 2: Board */}');
content = content.replace(/step === 3 && \(/g, 'step === 2 && (');
content = content.replace(/setStep\(4\)/g, 'setStep(3)');

content = content.replace(/\{\/\* Step 4: Standard \*\/\}/g, '{/* Step 3: Standard */}');
content = content.replace(/step === 4 && \(/g, 'step === 3 && (');
content = content.replace(/setStep\(5\)/g, 'setStep(4)');

content = content.replace(/\{\/\* Step 5: Subject \*\/\}/g, '{/* Step 4: Subject */}');
content = content.replace(/step === 5 && \(/g, 'step === 4 && (');
content = content.replace(/setStep\(6\)/g, 'setStep(5)');

content = content.replace(/\{\/\* Step 6: Chapter \*\/\}/g, '{/* Step 5: Chapter */}');
content = content.replace(/step === 6 && \(/g, 'step === 5 && (');
content = content.replace(/setStep\(7\)/g, 'setStep(6)');

content = content.replace(/\{\/\* Step 7: Notes \*\/\}/g, '{/* Step 6: Notes */}');
content = content.replace(/step === 7 && \(/g, 'step === 6 && (');

// 5. AddNoteForm Submission logic
content = content.replace(
  /if \(step === 1\) \{ \/\/ Branch[\s\S]*?else if \(step === 2\) \{ \/\/ Batch/,
  'if (step === 1) { // Batch'
);
content = content.replace(/else if \(step === 3\) \{ \/\/ Board/, 'else if (step === 2) { // Board');
content = content.replace(/else if \(step === 4\) \{ \/\/ Standard/, 'else if (step === 3) { // Standard');
content = content.replace(/else if \(step === 5\) \{ \/\/ Subject/, 'else if (step === 4) { // Subject');
content = content.replace(/else if \(step === 6\) \{ \/\/ Chapter/, 'else if (step === 5) { // Chapter');
content = content.replace(/else if \(step === 7\) \{ \/\/ Notes/, 'else if (step === 6) { // Notes');

// 6. AddNoteForm other occurrences of step
content = content.replace(/if \(step === 5\) \{/g, 'if (step === 4) {');

content = content.replace(/step <= 6 &&/g, 'step <= 5 &&');

content = content.replace(
  /step === 1 \? "Branch Name" : step === 2 \? "Batch Name" : step === 3 \? "Board Name" : [\s\S]*?step === 4 \? "Standard Name" : step === 5 \? "Subject Name" : "Chapter Name"/,
  'step === 1 ? "Batch Name" : step === 2 ? "Board Name" : step === 3 ? "Standard Name" : step === 4 ? "Subject Name" : "Chapter Name"'
);

fs.writeFileSync('components/teacher/NotesWizard.tsx', content);
console.log("Updated NotesWizard successfully");
