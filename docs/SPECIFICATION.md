# Inverted Mirror Editor - Functional Specification
**Created:** 2025-12-25
**Last Updated:** 2025-12-25 (Final)
**Source:** Original concept document (Texteditor Funktion.rtf)

---

## Overview

This document defines WHAT the Inverted Mirror Editor should do. It contains no implementation details - only functional requirements and expected behaviors.

For the philosophical "WHY" behind this editor, see [CONCEPT.md](CONCEPT.md).

---

## 1. Core Principle

### Fixed Write Point
- The editor has a **fixed write point at the top-right corner**
- Every newly entered character appears **always at exactly this point** (top-right)
- Existing content **flows left** (horizontally) and **flows down** (vertically) from this point
- New text appears at the fixed point, old text is displaced left and eventually wraps to new lines below

### Visual Metaphor
Think of it as a stack where:
- The newest item is always on top (at the fixed write point)
- Older items are displaced downward
- You always add to the top of the stack

---

## 2. Insertion Rule (Time Flow)

- New input is **always inserted as the newest content**
- The editor behaves like a **stack (LIFO - Last In, First Out)**
- The newest content lies "on top" (at the fixed write point)
- Older content is displaced downward

**Example:**
```
User types: H
Display: H

User types: e
Display: e
         H

User types: l
Display: l
         e
         H
```

---

## 3. Visual Appearance / Direction

### Horizontal Mirroring
- The display is **horizontally mirrored** (characters appear flipped)
- Text appears to flow **right→left** (newest characters "enter" at the left fixed point, rest is visually displaced)
- The time flow appears **bottom→up** in the sense: "New = top, Old = bottom"

### Reading Experience
- The complete content remains scrollable and readable
- The mirrored appearance creates a unique visual identity
- Users need to mentally adapt to the inverted reading direction

---

## 4. Keyboard Behavior

### Normal Typing
- Each character is inserted as the newest content at the fixed point
- Characters appear immediately at the top-left corner
- Previous content shifts down

### Backspace
- Removes **always the most recently entered character** (the one at the fixed point)
- Does NOT remove arbitrary characters in the text
- Acts like "undo last character"

### Enter
- Inserts a **line break as the newest content** (at the fixed point)
- Remaining content slides down accordingly
- Creates vertical spacing in the stack

### Arrow Keys / Mouse Clicks
- Do **NOT change the write point**
- There is no freely movable cursor in the text
- Input always happens at the fixed point
- Scrolling for reading is allowed, but doesn't affect input position

---

## 5. Paste Behavior

### When Text is Pasted
- Text is inserted **as a block** as the newest content
- The **first character** of the pasted text lies **directly at the fixed point**
- The rest follows in the pasted order and displaces previous content downward

**Example:**
```
Clipboard: "ABC"
Editor before paste: X
                     Y

After paste:
A
B
C
X
Y
```

---

## 6. Display / Reading

### Visibility
- The complete content remains **scrollable and readable**
- The fixed point remains **always visible** during typing
- No automatic scroll away from the fixed point when typing

### Scroll Behavior
- User can scroll to read older content
- Scrolling does NOT move the write point
- New input always appears at the fixed point (scroll may auto-adjust to keep it visible)

---

## 7. Content Management

### Clear
- **Deletes all content** in the editor
- Resets to empty state
- Confirmation may be advisable (to prevent accidental data loss)

### Copy Raw
- Copies content in **"normal" character form** (not mirrored) to clipboard
- Output is readable as standard text
- Preserves line breaks and formatting

### Export Inverted
- Saves content as **text file** in raw inverted format (as stored)
- Content maintains the inverted structure
- File format: plain text (.txt)
- Filename generated with timestamp

### Export Normal
- Saves content as **text file** in traditional reading order
- Reverses both line order (oldest first) and character order within lines
- Output is readable in standard text editors without inversion
- File format: plain text (.txt)
- Filename generated with timestamp ("normal-text-YYYY-MM-DD...")

### Import
- Loads a **text file** (raw) and displays it in the editor
- Content is imported in inverted format (maintains the editor's structure)
- The newest content lies at the fixed point
- Older content appears below

---

## 8. Auto-Wrapping

### Line Wrapping Behavior
- When text reaches the **left edge** of the editor, it automatically wraps to a new line
- The overflow content moves to a line **below** the current line
- Wrapping cascades through all lines (domino effect)
- Line length is calculated based on editor width and monospace font character width

### Cascading Overflow
- When line 1 overflows, content moves to line 2
- If line 2 now overflows, content moves to line 3
- This continues until all lines fit within the editor width
- Maintains consistent visual layout across all content

### Implementation Requirements
- Calculate maximum line length based on editor dimensions
- Reserve space for fixed point marker and cursor (approximately 80px)
- Use character-based calculation for monospace font
- Minimum line length: 20 characters
- Maximum line length: 150 characters

---

## 9. Display Options

### Mirror Display Toggle
- **Purpose:** Horizontally flips the entire editor display
- **Effect:** Visual inversion without changing functionality
- **Use case:** Experimentation with different visual modes
- **Default:** Not mirrored (normal display orientation)
- **Toggle:** Button in control panel
- **Animation:** Smooth transition (0.3s ease)

### Mirror Characters Toggle
- **Purpose:** Mirrors individual characters while keeping text flow
- **Effect:** Each character is horizontally flipped
- **Use case:** Aesthetic preference or visual experimentation
- **Default:** Normal characters (not mirrored)
- **Toggle:** Button in control panel
- **Animation:** Smooth transition (0.3s ease)

### Independence
- Both toggles are **independent** of each other
- Can be used separately or in combination
- Creates four possible viewing modes:
  1. Normal display, normal characters (default)
  2. Normal display, mirrored characters
  3. Mirrored display, normal characters
  4. Mirrored display, mirrored characters

---

## 10. Optional Features

### Undo / Redo
- Makes recent inputs reversible and restorable
- Follows the stack principle consistently
- Undo: Remove newest content (like Backspace but for blocks)
- Redo: Restore previously removed content

**Implementation Note:** This requires maintaining a history stack of editor states.

---

## Edge Cases & Clarifications

### Empty Editor
- Fixed point is visible and ready for input
- First character appears at the top-left corner

### Very Long Content
- Content extends downward beyond viewport
- Scrollbar appears
- Fixed point remains at top

### Multi-line Paste
- Each line of pasted content is inserted in order
- First line at fixed point, subsequent lines below

### Import File Behavior (Needs Decision)
- **Option A:** First line of file = newest (at fixed point)
- **Option B:** Last line of file = newest (at fixed point)
- **Recommended:** Option B (last line = newest), mimics chronological writing

---

## Non-Functional Requirements

### Performance
- Should handle documents up to 100,000 characters without lag
- Typing should feel instantaneous (< 16ms response time)

### Accessibility
- Mirroring may cause issues for screen readers
- Should provide "raw view" option for accessibility

### Browser Support (Web Version)
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Last 2 versions minimum

---

## Success Criteria

The specification is fulfilled when:
1. ✅ Fixed write point always remains at top-right
2. ✅ New characters always appear at the fixed point
3. ✅ Old content flows left (horizontally) and down (vertically)
4. ✅ Automatic line wrapping with cascading overflow works correctly
5. ✅ Backspace removes newest character
6. ✅ Arrow keys/clicks don't move write point
7. ✅ All management functions (Clear, Copy, Export Inverted, Export Normal, Import) work correctly
8. ✅ Content is scrollable and readable
9. ✅ Display options (Mirror Display, Mirror Characters) toggle correctly
10. ✅ Default display shows normal characters (not mirrored)
11. ✅ Smooth transitions between display modes

---

## Future Considerations

- **Multi-user collaboration:** How would simultaneous editing work?
- **Syntax highlighting:** Useful for code editing?
- **Search function:** How to navigate in a mirrored, inverted document?
- **Mobile version:** Touch-specific interactions?

---

**Version History:**
- **2025-12-25:** Initial specification based on original concept document
- **2025-12-25 (Final):** Updated with implemented features:
  - Fixed write point corrected to top-right
  - Added auto-wrapping functionality
  - Added display options (Mirror Display, Mirror Characters)
  - Added Export Normal function
  - Updated success criteria
