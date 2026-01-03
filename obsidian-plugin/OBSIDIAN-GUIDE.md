# Inverted Mirror Editor - Obsidian Plugin Guide

**Version:** 0.1.0
**Created:** 2025-12-26
**Author:** Johannes Hahn

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Features](#features)
5. [Usage Guide](#usage-guide)
6. [Settings](#settings)
7. [How It Works](#how-it-works)
8. [Technical Details](#technical-details)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Overview

### What is the Inverted Mirror Editor?

The Inverted Mirror Editor is a revolutionary text editing paradigm for Obsidian where:

- **Cursor stays fixed** at the top-right corner
- **New text appears at a fixed position** (no cursor movement)
- **Old text flows away** downward and leftward
- **New lines appear at the top** of the document
- **Automatic line wrapping** cascades text downward

### Why Use It?

Traditional editors require constant eye tracking as the cursor moves. The Inverted Mirror Editor inverts this:

✅ **Zero eye movement** - Your focus stays in one place
✅ **Perfect context** - Earlier text always visible below
✅ **No scrolling needed** - Recent content always at fixed point
✅ **Natural flow** - Text grows like a stack, newest on top

### Perfect For

- **Writers** - Draft with context always visible
- **Note-takers** - Meeting notes with chronological flow
- **Researchers** - Build ideas with earlier references in view
- **Programmers** - Write code with previous functions visible

---

## Installation

### Prerequisites

- Obsidian 0.15.0 or later
- Node.js and npm (for building from source)

### Method 1: Manual Installation (Recommended)

1. **Navigate to plugin directory:**
   ```bash
   cd "/path/to/texteditor/obsidian-plugin"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the plugin:**
   ```bash
   npm run build
   ```

4. **Copy to your vault:**
   ```bash
   # Create plugin folder
   mkdir -p "/path/to/your-vault/.obsidian/plugins/inverted-mirror-editor"

   # Copy files
   cp main.js manifest.json styles.css "/path/to/your-vault/.obsidian/plugins/inverted-mirror-editor/"
   ```

5. **Enable in Obsidian:**
   - Restart Obsidian
   - Go to Settings → Community Plugins
   - Enable "Inverted Mirror Editor"

### Method 2: Development Mode

For plugin development with hot reload:

```bash
# Link plugin to vault (symbolic link)
ln -s "/path/to/texteditor/obsidian-plugin" "/path/to/your-vault/.obsidian/plugins/inverted-mirror-editor"

# Start development server
cd "/path/to/texteditor/obsidian-plugin"
npm run dev

# Reload Obsidian after changes: Cmd/Ctrl + R
```

### Verification

After installation:

1. Open Obsidian
2. Look for the edit icon (✏️) in the left ribbon
3. Click it - a new pane should open with the Inverted Mirror Editor

---

## Quick Start

### Opening Your First Inverted View

1. **Open any note** in Obsidian
2. **Open Command Palette:** `Cmd + P` (Mac) or `Ctrl + P` (Windows/Linux)
3. **Type:** "Open Current Note in Inverted Mirror Editor"
4. **Press Enter**

A new pane opens on the right side with your note in inverted format!

### Writing Your First Text

1. The cursor is fixed at the top-right corner (marked with ▶ and |)
2. Start typing - characters appear at the fixed point
3. Watch as older text flows left and down
4. Press Enter - a new line appears at the top
5. Continue typing - text automatically wraps when reaching the left edge

### Saving Your Work

The content automatically saves to your original .md file:

- **Auto-save:** Every 30 seconds (if enabled in settings)
- **Manual save:** `Cmd + S` (Mac) or `Ctrl + S` (Windows/Linux)
- **Save button:** Click "💾 Save" in the toolbar

**Important:** The file is saved in **normal format** - only the editing view is inverted!

---

## Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Fixed Write Point** | Cursor stays at top-right corner (▶\|) |
| **Stack-Based Insertion** | New lines appear at top, oldest at bottom |
| **Automatic Line Wrapping** | Text wraps at configurable line length |
| **File Integration** | Load and save actual Obsidian notes |
| **Auto-Save** | Configurable automatic saving |
| **Statistics Display** | Real-time character and line count |

### User Interface

#### Toolbar Buttons

- **💾 Save** - Manually save current content to file
- **📄 Save As New** - Create a new file with current content
- **🗑️ Clear** - Delete all content (with confirmation)
- **📋 Copy** - Copy content to clipboard in normal format

#### Visual Indicators

- **▶ Fixed Point Marker** - Shows where new text appears
- **| Cursor Marker** - Visual cursor at write point
- **Current Line Highlight** - Blue border around active line
- **Save Status** - 💾 (saved) or 📝 (unsaved) in stats

#### Statistics Bar

Shows at bottom of editor:
```
💾 Characters: 1234 | Lines: 45
```

---

## Usage Guide

### Opening Notes

#### Method 1: Open Current Note
1. Open any note in Obsidian
2. Press `Cmd + P` and type "Open Current Note in Inverted"
3. Or click the ribbon icon (✏️)

#### Method 2: Open New Editor
1. Press `Cmd + P` and type "Open New Inverted"
2. Starts with empty editor
3. Use "Save As New" to create a file

### Writing Workflow

#### Basic Typing
```
Type: H → ▶H|
Type: e → ▶He|
Type: l → ▶Hel|
Type: l → ▶Hell|
Type: o → ▶Hello|
```

#### Line Breaks
```
Current: ▶Hello|

Press Enter:
▶|           ← New line (current)
Hello        ← Previous line
```

#### Automatic Wrapping
```
Line reaches max length (e.g., 100 chars):
▶This is a very long line that reaches the maximum length configured in settings and will wrap|

Becomes:
▶and will wrap|                    ← Overflow moves down
This is a very long line that reaches the maximum length configured in settings
```

#### Backspace
```
Current: ▶Hello|
Press Backspace: ▶Hell|
Press Backspace: ▶Hel|

On empty line with content below:
▶|
Hello

Press Backspace → Deletes empty line, moves to line below
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + S` | Save to file |
| `Cmd/Ctrl + C` | Copy to clipboard |
| `Backspace/Delete` | Remove newest character |
| `Enter` | New line (appears at top) |
| Arrow Keys | Disabled (cursor is fixed) |
| `Home/End/PageUp/PageDown` | Disabled (no navigation) |

### Pasting Content

When you paste content:

1. The first line is added to the current line
2. Subsequent lines are inserted above (newest first)
3. All content follows inverted format

Example:
```
Clipboard:
Line 1
Line 2
Line 3

After paste:
▶Line 3|      ← Most recent
Line 2
Line 1
(previous content below)
```

### Saving and Exporting

#### Auto-Save

Enabled by default, saves every 30 seconds:
- Only saves if file is associated
- Shows save indicator (💾) in stats
- Can be disabled in settings

#### Manual Save

Press `Cmd/Ctrl + S` or click "💾 Save":
- Converts inverted format to normal format
- Saves to original .md file
- Shows notification on success

#### Save As New File

Click "📄 Save As New":
- Creates new file with timestamp: `inverted-2025-12-26T14-30-00.md`
- Saves in normal format
- Associates editor with new file

#### File Format

**Inverted format (internal):**
```typescript
lines = [
  "olleH",     // "Hello" reversed (newest line)
  "dlroW"      // "World" reversed (older line)
]
```

**Saved format (in .md file):**
```markdown
World
Hello
```

Everything is saved in **normal reading order** - only the editing experience is inverted!

---

## Settings

Access via: **Settings → Inverted Mirror Editor**

### Auto-Save

**Description:** Automatically save changes every 30 seconds
**Default:** ON
**Options:** Toggle ON/OFF

When enabled:
- Saves automatically in background
- Only works if file is associated
- Shows 💾 indicator in stats

### Max Line Length

**Description:** Maximum characters per line before wrapping
**Default:** 100
**Range:** 20-150
**Recommended:** 80-100 for most use cases

Effects:
- Longer values = fewer line breaks
- Shorter values = more vertical scrolling
- Automatic wrapping at this length

---

## How It Works

### The Concept

Traditional text editors:
```
Type: H → H|
Type: e → He|
Type: l → Hel|
```
The cursor **moves right**. Your eyes must follow.

Inverted Mirror Editor:
```
Type: H → ▶H|
Type: e → ▶eH|
Type: l → ▶leH|
```
The cursor **stays fixed**. Text flows left.

### Data Model

#### Internal Representation

```typescript
class InvertedMirrorView {
  lines: string[];           // Array of lines
  currentLineIndex: number;  // Always 0 (top line is current)

  // Example state:
  // lines = ["olleH", "dlroW"]
  //          ↑ newest    ↑ oldest
}
```

New text is **prepended** to the current line:
```typescript
insertCharacter(char: string) {
  // Prepend to line 0
  this.lines[0] = char + this.lines[0];
}
```

#### Display Transformation

```typescript
updateDisplay() {
  this.lines.forEach(line => {
    // Reverse for display (RTL)
    const displayText = line.split('').reverse().join('');

    // Render character by character with CSS mirror
    displayText.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'mirrored-char';
      span.textContent = char;
    });
  });
}
```

#### Save Transformation

```typescript
async saveToFile() {
  // 1. Reverse each line (internal → normal)
  // 2. Reverse line order (newest first → oldest first)
  const normalLines = this.lines
    .map(line => line.split('').reverse().join(''))
    .reverse();

  const content = normalLines.join('\n');
  await this.app.vault.modify(this.currentFile, content);
}
```

### CSS Styling

The visual effect is achieved through CSS:

```css
.mirrored-char {
  transform: scaleX(-1);        /* Mirror horizontally */
  display: inline-block;
}

.fixed-point-marker {
  position: fixed;
  top: 20px;
  right: 40px;
}

.inverted-mirror-editor {
  direction: rtl;               /* Right-to-left */
  text-align: right;
}
```

### Line Wrapping Algorithm

```typescript
checkLineWrap() {
  let lineIndex = this.currentLineIndex;

  while (lineIndex < this.lines.length) {
    const line = this.lines[lineIndex];

    if (line.length > this.maxLineLength) {
      // Split line
      const keep = line.substring(0, this.maxLineLength);
      const overflow = line.substring(this.maxLineLength);

      // Keep first part
      this.lines[lineIndex] = keep;

      // Move overflow to next line
      if (this.lines[lineIndex + 1]) {
        this.lines[lineIndex + 1] = overflow + this.lines[lineIndex + 1];
      } else {
        this.lines.splice(lineIndex + 1, 0, overflow);
      }

      lineIndex++;  // Check next line for overflow
    } else {
      break;
    }
  }
}
```

This creates a **cascading effect** where overflow can trigger multiple line splits.

---

## Technical Details

### Architecture

```
InvertedMirrorPlugin (Plugin)
    ├── registerView(InvertedMirrorView)
    ├── addCommand("open-current-note-inverted")
    ├── addCommand("open-inverted-mirror-editor")
    └── addSettingTab(InvertedMirrorSettingTab)

InvertedMirrorView (ItemView)
    ├── onOpen() - Setup UI
    ├── loadFile(file) - Load note
    ├── saveToFile() - Save to vault
    ├── handleKeyDown(e) - Input handling
    ├── insertCharacter(char) - Add character
    ├── handleBackspace() - Remove character
    ├── handleEnter() - New line
    ├── checkLineWrap() - Auto-wrap
    └── updateDisplay() - Render view
```

### File Locations

**Development:**
```
/path/to/texteditor/obsidian-plugin/
├── main.ts              # Source code
├── manifest.json        # Plugin metadata
├── styles.css           # Styling
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── esbuild.config.mjs   # Build config
```

**Installed in Vault:**
```
/path/to/vault/.obsidian/plugins/inverted-mirror-editor/
├── main.js              # Compiled plugin
├── manifest.json        # Plugin metadata
└── styles.css           # Styling
```

### Build System

**Development:**
```bash
npm run dev
```
- Watches for changes
- Rebuilds automatically
- Fast incremental builds

**Production:**
```bash
npm run build
```
- Runs TypeScript compiler
- Bundles with esbuild
- Minifies output

### Dependencies

```json
{
  "obsidian": "^1.0.0",
  "@codemirror/view": "^6.0.0",
  "@codemirror/state": "^6.0.0",
  "typescript": "^5.0.0",
  "esbuild": "^0.19.0"
}
```

### API Integration

#### Obsidian API Usage

```typescript
// Vault operations
this.app.vault.read(file)           // Read file content
this.app.vault.modify(file, content) // Save file
this.app.vault.create(path, content) // Create new file

// Workspace operations
this.app.workspace.getActiveViewOfType(MarkdownView)  // Get active note
this.app.workspace.getLeavesOfType(viewType)          // Find view
this.app.workspace.getLeaf('split')                   // Create pane

// View operations
leaf.setViewState({ type, active })  // Set view
workspace.revealLeaf(leaf)           // Focus view
```

#### Custom View Implementation

```typescript
class InvertedMirrorView extends ItemView {
  getViewType(): string {
    return VIEW_TYPE_INVERTED_MIRROR;
  }

  getDisplayText(): string {
    return this.currentFile
      ? `Inverted: ${this.currentFile.basename}`
      : "Inverted Mirror Editor";
  }

  async onOpen() {
    // Setup UI
  }

  async onClose() {
    // Cleanup and auto-save
  }
}
```

---

## Troubleshooting

### Plugin Not Appearing

**Symptoms:**
- Plugin not in Community Plugins list
- No ribbon icon

**Solutions:**
1. Check folder name is exactly `inverted-mirror-editor`
2. Verify `manifest.json` and `main.js` are present
3. Restart Obsidian completely (close all windows)
4. Check Console (Cmd/Ctrl + Shift + I) for errors

### Plugin Loads But Command Not Found

**Symptoms:**
- Plugin appears in list and is enabled
- Command palette doesn't show commands

**Solutions:**
1. Reload Obsidian: `Cmd/Ctrl + R`
2. Check Console for JavaScript errors
3. Verify plugin version is 0.1.0 or later
4. Disable and re-enable the plugin

### View Opens But Shows Blank

**Symptoms:**
- Command works
- New pane opens
- Nothing visible inside

**Solutions:**
1. Check browser console for errors
2. Try clicking in the pane area
3. Check if `styles.css` is loaded
4. Verify Obsidian version is 0.15.0+

### Text Not Appearing at Fixed Point

**Symptoms:**
- Can type but text appears wrong
- Cursor moves instead of staying fixed

**Solutions:**
1. Hard reload: Close Obsidian, delete cache
2. Check CSS is loading properly
3. Try different theme (some themes may conflict)
4. Check for conflicting plugins

### Save Not Working

**Symptoms:**
- Press Cmd+S but file doesn't update
- Auto-save not triggering

**Solutions:**
1. Check file permissions on vault
2. Verify file is associated (shows filename in header)
3. Check Console for save errors
4. Try "Save As New" to test save functionality

### Performance Issues

**Symptoms:**
- Typing feels slow
- Lag when editing
- High CPU usage

**Solutions:**
1. Reduce max line length in settings
2. Clear content and start fresh
3. Check for very long lines (>500 chars)
4. Disable auto-save temporarily

### Build Errors

**Error: Cannot find module 'obsidian'**
```bash
npm install
```

**Error: TypeScript compilation failed**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: Permission denied**
```bash
# Fix permissions
chmod +x node_modules/.bin/*
npm run build
```

---

## FAQ

### General Questions

**Q: Will this modify my original notes?**
A: Yes, but safely. The content is saved in **normal format** - only the editing view is inverted. Your notes remain readable in any other editor.

**Q: Can I use this with existing notes?**
A: Yes! Use "Open Current Note in Inverted Mirror Editor" to load any existing note.

**Q: Can other people read my notes?**
A: Absolutely! The files are saved in normal markdown format. The inverted view is just for editing.

**Q: Does it work on mobile?**
A: The plugin is compatible with Obsidian mobile, though the experience is optimized for desktop.

**Q: Can I use it with other plugins?**
A: Yes! The Inverted Mirror Editor is a separate view and doesn't interfere with other plugins.

### Feature Questions

**Q: Can I undo/redo?**
A: Not yet. Undo/redo is planned for a future release.

**Q: Can I use Vim keybindings?**
A: Not currently. The fixed cursor paradigm is incompatible with traditional Vim navigation.

**Q: Can I have multiple inverted editors open?**
A: Currently, only one inverted view at a time. Multiple views are planned.

**Q: Can I customize the colors?**
A: The editor uses your Obsidian theme colors. Custom themes are planned.

**Q: Can I adjust the fixed point position?**
A: Not yet. Customizable position is planned for future releases.

### Technical Questions

**Q: How is the data stored?**
A: Internally as reversed strings in an array, but saved as normal markdown.

**Q: Does it use additional storage?**
A: No, it uses the same .md files as regular Obsidian notes.

**Q: What happens if Obsidian crashes?**
A: If auto-save is enabled, most recent content (up to 30 seconds old) will be saved.

**Q: Can I sync with Obsidian Sync?**
A: Yes! Files are normal markdown and sync like any other note.

**Q: Is it safe for version control (Git)?**
A: Yes! Files are normal markdown, perfect for version control.

---

## Support & Feedback

### Reporting Issues

Found a bug? Please include:
- Obsidian version
- Plugin version
- Steps to reproduce
- Console errors (if any)

### Feature Requests

Have an idea? Describe:
- The feature
- Use case
- Why it's valuable

### Contributing

Interested in contributing?
- Check the main project README
- Look at open issues
- Submit pull requests

---

## Related Documentation

- [Main Project README](../README.md) - Overall project overview
- [Concept Documentation](../docs/CONCEPT.md) - Design philosophy
- [Specification](../docs/SPECIFICATION.md) - Technical spec
- [Web Version](../src/) - Browser-based implementation

---

## Credits

**Concept & Implementation:** Johannes Hahn
**Created:** 2025-12-26
**Based on:** Inverted Mirror Editor web version
**License:** MIT

---

**"The cursor should serve the writer, not the other way around."**

---

*Last updated: 2025-12-26*
