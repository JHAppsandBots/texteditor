/**
 * Inverted Mirror Editor - Main Logic
 * Created: 2025-12-25
 * Updated: 2025-12-25
 *
 * Implements text editor with fixed write point (left) and horizontal growth.
 * New characters appear at fixed point, older text shifts right.
 * New lines appear above old lines (vertical inversion).
 * Everything is horizontally mirrored.
 *
 * See: ../docs/SPECIFICATION.md for functional requirements
 */

class InvertedMirrorEditor {
    constructor() {
        // DOM Elements
        this.editor = document.getElementById('editor');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.exportNormalBtn = document.getElementById('exportNormalBtn');
        this.importFile = document.getElementById('importFile');
        this.charCount = document.getElementById('charCount');
        this.lineCount = document.getElementById('lineCount');
        this.clipboardHelper = document.getElementById('clipboardHelper');

        // State: Array of lines, index 0 is the newest (top) line
        this.lines = [''];
        this.currentLineIndex = 0;

        // Initialize
        this.init();
    }

    init() {
        // Remove contenteditable, we'll handle input manually
        this.editor.contentEditable = false;
        this.editor.tabIndex = 0; // Make focusable

        // Keyboard handlers
        this.editor.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.editor.addEventListener('paste', this.handlePaste.bind(this));
        this.editor.addEventListener('focus', () => {
            // Keep editor focused for keyboard input
        });

        // Button handlers
        this.clearBtn.addEventListener('click', this.handleClear.bind(this));
        this.copyBtn.addEventListener('click', this.handleCopyRaw.bind(this));
        this.exportBtn.addEventListener('click', this.handleExport.bind(this));
        this.exportNormalBtn.addEventListener('click', this.handleExportNormal.bind(this));
        this.importFile.addEventListener('change', this.handleImport.bind(this));

        // Mirror toggle handlers
        const mirrorToggle = document.getElementById('mirrorToggle');
        if (mirrorToggle) {
            mirrorToggle.addEventListener('click', this.handleMirrorToggle.bind(this));
        }

        const charMirrorToggle = document.getElementById('charMirrorToggle');
        if (charMirrorToggle) {
            charMirrorToggle.addEventListener('click', this.handleCharMirrorToggle.bind(this));
        }

        // Initial state
        this.updateDisplay();
        this.updateStats();

        // Focus editor
        this.editor.focus();
    }

    /**
     * Handle keyboard input
     */
    handleKeyDown(e) {
        // Copy shortcut
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            this.handleCopyRaw();
            return;
        }

        // Paste shortcut
        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            // Let paste event handle it
            return;
        }

        // Prevent cut
        if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
            e.preventDefault();
            return;
        }

        // Prevent arrow keys (no cursor movement)
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
            e.preventDefault();
            return;
        }

        // Handle Backspace
        if (e.key === 'Backspace') {
            e.preventDefault();
            this.handleBackspace();
            return;
        }

        // Handle Enter
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleEnter();
            return;
        }

        // Handle Delete key
        if (e.key === 'Delete') {
            e.preventDefault();
            this.handleBackspace();
            return;
        }

        // Handle printable characters
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            e.preventDefault();
            this.insertCharacter(e.key);
            return;
        }
    }

    /**
     * Insert a character at the current line
     * Characters are prepended - newest always appears at fixed position (top-right)
     * Auto-wrap: If line reaches left edge, move overflow down
     */
    insertCharacter(char) {
        this.lines[this.currentLineIndex] = char + this.lines[this.currentLineIndex];

        this.updateDisplay();
        this.checkLineWrap();
        this.updateStats();
    }

    /**
     * Check if lines are too wide and need wrapping
     * Cascades through ALL lines (domino effect)
     */
    checkLineWrap() {
        if (!this.maxLineLength) {
            // Calculate max line length once based on editor width
            // Monospace font: approximately 8-10 pixels per character at 1rem
            const editorWidth = this.editor.clientWidth;
            const availableWidth = editorWidth - 80; // Reserve space for cursor/marker/padding
            const charWidth = 10; // Approximate pixels per character for monospace
            this.maxLineLength = Math.floor(availableWidth / charWidth);

            // Ensure minimum and maximum
            this.maxLineLength = Math.max(20, Math.min(this.maxLineLength, 150));

            console.log('Max line length calculated:', this.maxLineLength);
        }

        // Check ALL lines starting from current, cascade overflow down
        let lineIndex = this.currentLineIndex;
        let hasChanges = false;

        while (lineIndex < this.lines.length) {
            const line = this.lines[lineIndex];

            // If line exceeds max length, wrap to next line
            if (line.length > this.maxLineLength) {
                hasChanges = true;

                // Move the oldest character(s) to a new line below
                const keepInCurrent = line.substring(0, this.maxLineLength);
                const moveToNext = line.substring(this.maxLineLength);

                this.lines[lineIndex] = keepInCurrent;

                // Check if there's already a line below
                if (this.lines.length > lineIndex + 1) {
                    // Prepend to existing line below
                    this.lines[lineIndex + 1] = moveToNext + this.lines[lineIndex + 1];
                } else {
                    // Create new line below
                    this.lines.splice(lineIndex + 1, 0, moveToNext);
                }

                // Continue to next line to check if IT now overflows (domino effect)
                lineIndex++;
            } else {
                // This line is okay, stop checking
                break;
            }
        }

        // Re-render if there were changes
        if (hasChanges) {
            this.updateDisplay();
        }
    }

    /**
     * Handle paste event
     */
    handlePaste(e) {
        e.preventDefault();

        const pastedText = e.clipboardData.getData('text/plain');
        if (pastedText) {
            // Split pasted text into lines
            const pastedLines = pastedText.split('\n');

            // Add first line to current line
            this.lines[this.currentLineIndex] += pastedLines[0];

            // If there are more lines, insert them above
            for (let i = 1; i < pastedLines.length; i++) {
                this.lines.unshift(pastedLines[i]);
                this.currentLineIndex++;
            }

            this.updateDisplay();
            this.updateStats();
        }
    }

    /**
     * Handle Backspace
     * Removes the newest character (first in string, appears at fixed position right)
     */
    handleBackspace() {
        const currentLine = this.lines[this.currentLineIndex];

        if (currentLine.length > 0) {
            // Remove first character (newest, at fixed position right)
            this.lines[this.currentLineIndex] = currentLine.slice(1);
        } else if (this.lines.length > 1 && this.currentLineIndex < this.lines.length - 1) {
            // Current line is empty, merge with line below
            this.lines.splice(this.currentLineIndex, 1);
            if (this.currentLineIndex > 0) {
                this.currentLineIndex--;
            }
        }

        this.updateDisplay();
        this.updateStats();
    }

    /**
     * Handle Enter key
     * Creates a new line ABOVE the current line
     */
    handleEnter() {
        // Insert new empty line at the top (index 0)
        this.lines.unshift('');
        // Current line index stays 0 (we're now on the new line)
        this.currentLineIndex = 0;

        this.updateDisplay();
        this.updateStats();
    }

    /**
     * Update the editor display
     * Reverses string and mirrors each character individually
     */
    updateDisplay() {
        // Clear editor
        this.editor.innerHTML = '';

        // Create display for each line
        this.lines.forEach((line, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'editor-line';

            // Mark current line for styling
            if (index === this.currentLineIndex) {
                lineDiv.classList.add('current-line');
            }

            // Add line content - reverse string so newest (first) appears right
            const displayText = line.split('').reverse().join('');

            // Wrap each character in a span to mirror individually
            displayText.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'mirrored-char';

                // Replace space with non-breaking space to preserve it
                if (char === ' ') {
                    charSpan.innerHTML = '&nbsp;';
                } else {
                    charSpan.textContent = char;
                }

                lineDiv.appendChild(charSpan);
            });

            // Add placeholder if empty
            if (line.length === 0) {
                const placeholder = document.createElement('span');
                placeholder.textContent = '\u00A0';
                lineDiv.appendChild(placeholder);
            }

            this.editor.appendChild(lineDiv);
        });
    }

    /**
     * Update character and line statistics
     */
    updateStats() {
        // Character count (total across all lines)
        const chars = this.lines.join('').length;
        this.charCount.textContent = chars;

        // Line count
        this.lineCount.textContent = this.lines.length;
    }

    /**
     * Clear all content
     */
    handleClear() {
        const totalChars = this.lines.join('').length;
        if (totalChars === 0) {
            return;
        }

        // Confirm before clearing (prevent accidental data loss)
        if (confirm('Clear all content? This cannot be undone.')) {
            this.lines = [''];
            this.currentLineIndex = 0;
            this.updateDisplay();
            this.updateStats();
            this.editor.focus();
        }
    }

    /**
     * Toggle horizontal mirror mode
     * Flips entire display visually without changing functionality
     */
    handleMirrorToggle() {
        this.editor.classList.toggle('mirrored');

        // Update button text to show current state
        const mirrorToggle = document.getElementById('mirrorToggle');
        if (this.editor.classList.contains('mirrored')) {
            mirrorToggle.textContent = '🔄 Unmirror Display';
        } else {
            mirrorToggle.textContent = '🔄 Mirror Display';
        }

        // Keep editor focused
        this.editor.focus();
    }

    /**
     * Toggle character mirroring
     * Mirrors individual characters while keeping position/flow
     */
    handleCharMirrorToggle() {
        this.editor.classList.toggle('mirrored-chars');

        // Update button text to show current state
        const charMirrorToggle = document.getElementById('charMirrorToggle');
        if (this.editor.classList.contains('mirrored-chars')) {
            charMirrorToggle.textContent = '🔤 Unmirror Characters';
        } else {
            charMirrorToggle.textContent = '🔤 Mirror Characters';
        }

        // Keep editor focused
        this.editor.focus();
    }

    /**
     * Copy raw (unmirrored) text to clipboard
     */
    async handleCopyRaw() {
        const content = this.lines.join('\n');

        if (content.length === 0) {
            alert('Nothing to copy - editor is empty.');
            return;
        }

        try {
            // Modern clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(content);
                this.showFeedback('Copied to clipboard!');
            } else {
                // Fallback for older browsers
                this.clipboardHelper.value = content;
                this.clipboardHelper.select();
                document.execCommand('copy');
                this.showFeedback('Copied to clipboard!');
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard. Please try again.');
        }
    }

    /**
     * Export content as text file (inverted format - as stored)
     */
    handleExport() {
        const content = this.lines.join('\n');

        if (content.length === 0) {
            alert('Nothing to export - editor is empty.');
            return;
        }

        // Create blob with raw content
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        link.download = `inverted-mirror-${timestamp}.txt`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);

        this.showFeedback('File exported!');
    }

    /**
     * Export content as normal text file (traditional reading order)
     * Reverses both line order and character order within lines
     */
    handleExportNormal() {
        if (this.lines.join('').length === 0) {
            alert('Nothing to export - editor is empty.');
            return;
        }

        // Reverse line order (oldest first) AND reverse characters within each line
        const normalLines = this.lines
            .slice()  // Create copy to avoid mutating original
            .reverse()  // Oldest line first
            .map(line => line.split('').reverse().join(''));  // Reverse characters in each line

        const content = normalLines.join('\n');

        // Create blob with normal content
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        link.download = `normal-text-${timestamp}.txt`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);

        this.showFeedback('Normal format exported!');
    }

    /**
     * Import text file
     */
    handleImport(e) {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        // Confirm if editor has content
        const totalChars = this.lines.join('').length;
        if (totalChars > 0) {
            if (!confirm('Import will replace current content. Continue?')) {
                e.target.value = ''; // Reset file input
                return;
            }
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            const text = event.target.result;

            // Import: Lines appear in file order (first line on top)
            this.lines = text.split('\n');
            if (this.lines.length === 0) {
                this.lines = [''];
            }
            this.currentLineIndex = 0;

            this.updateDisplay();
            this.updateStats();
            this.editor.focus();
            this.showFeedback('File imported!');

            // Reset file input
            e.target.value = '';
        };

        reader.onerror = () => {
            alert('Failed to read file. Please try again.');
            e.target.value = '';
        };

        reader.readAsText(file);
    }

    /**
     * Show temporary feedback message
     */
    showFeedback(message) {
        // Simple feedback: temporarily change button text
        // In a more complex app, you'd use a toast notification

        const originalText = this.copyBtn.textContent;

        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 500;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        feedback.textContent = message;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
            style.remove();
        }, 2000);
    }
}

// Initialize editor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const editor = new InvertedMirrorEditor();

    // Focus editor on load
    editor.editor.focus();

    // Expose to window for debugging
    window.invertedMirrorEditor = editor;
});

/**
 * Development Notes:
 *
 * 1. Content Model: Array of lines, where index 0 is the current (newest) line.
 *    Characters are appended to the current line (normal string append).
 *    New lines are inserted at index 0 (vertical stack behavior).
 *
 * 2. Cursor: Visual cursor marker (|) appears at the END of current line (right side).
 *    This is where new characters appear (newest position).
 *    No actual DOM cursor/selection since we handle input manually.
 *
 * 3. Mirroring: Done purely with CSS (scaleX(-1)), so the DOM contains
 *    normal text (e.g., "HELLO") but it appears mirrored visually.
 *
 * 4. Horizontal Growth:
 *    - Text is typed forward (H-E-L-L-O)
 *    - Stored as normal string ("HELLO")
 *    - Displayed mirrored AND right-aligned (direction: rtl)
 *    - Result: Newest character appears on the right, text grows right-to-left
 *
 * 5. Vertical Inversion: New lines appear above old lines (newest at top).
 *
 * 6. Backspace: Removes last character (newest, rightmost).
 *
 * 7. Import Strategy: Lines imported in file order (first line at top).
 *
 * 8. Performance: Simple array operations work well for typical documents.
 *    For very large documents (>10k lines), consider virtualizing the display.
 */
