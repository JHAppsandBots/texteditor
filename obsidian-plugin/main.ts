import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
	WorkspaceLeaf,
	ItemView,
	TFile,
	Notice,
	MarkdownView
} from 'obsidian';

/**
 * Inverted Mirror Editor Plugin for Obsidian
 *
 * Opens current note in a separate view with full inverted mirror editing:
 * - Fixed cursor at top-right
 * - Text flows left and down
 * - New lines appear at top
 * - Saves normally to .md files
 *
 * Created: 2025-12-25
 */

interface InvertedMirrorSettings {
	autoSave: boolean;
	maxLineLength: number;
	liveSyncInterval: number;
}

const DEFAULT_SETTINGS: InvertedMirrorSettings = {
	autoSave: true,
	maxLineLength: 100,
	liveSyncInterval: 200
}

const VIEW_TYPE_INVERTED_MIRROR = "inverted-mirror-view";

export default class InvertedMirrorPlugin extends Plugin {
	settings: InvertedMirrorSettings;

	async onload() {
		console.log('Inverted Mirror Editor: Loading plugin...');

		await this.loadSettings();

		// Register the inverted mirror view
		this.registerView(
			VIEW_TYPE_INVERTED_MIRROR,
			(leaf) => new InvertedMirrorView(leaf, this)
		);

		// Add ribbon icon
		this.addRibbonIcon('edit-3', 'Inverted Mirror Editor', () => {
			this.openInvertedView();
		});

		// Command: Open current note in inverted mirror editor
		this.addCommand({
			id: 'open-current-note-inverted',
			name: 'Open Current Note in Inverted Mirror Editor',
			checkCallback: (checking: boolean) => {
				const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView) {
					if (!checking) {
						this.openInvertedView(activeView.file ?? undefined);
					}
					return true;
				}
				return false;
			}
		});

		// Command: Open new inverted mirror editor
		this.addCommand({
			id: 'open-inverted-mirror-editor',
			name: 'Open New Inverted Mirror Editor',
			callback: () => {
				this.openInvertedView();
			}
		});

		this.addSettingTab(new InvertedMirrorSettingTab(this.app, this));

		console.log('Inverted Mirror Editor: Plugin loaded successfully');
	}

	async openInvertedView(file?: TFile) {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_INVERTED_MIRROR);

		if (leaves.length > 0) {
			// Reuse existing leaf
			leaf = leaves[0];
		} else {
			// Create new leaf in split
			leaf = workspace.getLeaf('split', 'vertical');
			await leaf.setViewState({
				type: VIEW_TYPE_INVERTED_MIRROR,
				active: true,
			});
		}

		if (leaf && leaf.view instanceof InvertedMirrorView) {
			workspace.revealLeaf(leaf);

			// Load file if provided
			if (file) {
				await (leaf.view as InvertedMirrorView).loadFile(file);
			}
		}
	}

	onunload() {
		console.log('Inverted Mirror Editor: Unloading...');
		this.app.workspace.detachLeavesOfType(VIEW_TYPE_INVERTED_MIRROR);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// ============================================================================
// INVERTED MIRROR VIEW
// ============================================================================

class InvertedMirrorView extends ItemView {
	plugin: InvertedMirrorPlugin;
	lines: string[];
	currentLineIndex: number;
	editorEl: HTMLDivElement;
	statsEl: HTMLDivElement;
	headerEl: HTMLElement;
	maxLineLength: number;
	currentFile: TFile | null = null;

	// Performance optimization
	private displayUpdatePending: boolean = false;
	private statsUpdatePending: boolean = false;
	private lastStatsUpdate: number = 0;

	// Live sync to normal editor
	private liveSyncEnabled: boolean = false;
	private liveSyncInterval: number | null = null;
	private liveSyncButton: HTMLButtonElement | null = null;

	constructor(leaf: WorkspaceLeaf, plugin: InvertedMirrorPlugin) {
		super(leaf);
		this.plugin = plugin;
		this.lines = [''];
		this.currentLineIndex = 0;
		this.maxLineLength = 0;
	}

	getViewType(): string {
		return VIEW_TYPE_INVERTED_MIRROR;
	}

	getDisplayText(): string {
		return this.currentFile ? `Inverted: ${this.currentFile.basename}` : "Inverted Mirror Editor";
	}

	getIcon(): string {
		return "edit-3";
	}

	async loadFile(file: TFile) {
		try {
			this.currentFile = file;
			const content = await this.app.vault.read(file);

			// Parse content into inverted format
			const fileLines = content.split('\n');
			// Reverse lines so newest appears first in our array
			this.lines = fileLines.reverse().map(line =>
				line.split('').reverse().join('')
			);

			if (this.lines.length === 0) {
				this.lines = [''];
			}

			this.currentLineIndex = 0;
			this.updateDisplay();
			this.updateStats();
			this.updateHeader();

			new Notice(`Loaded: ${file.basename}`);
		} catch (error) {
			console.error('Error loading file:', error);
			new Notice('Error loading file');
		}
	}

	async saveToFile() {
		if (!this.currentFile) {
			return this.saveAsNewFile();
		}

		try {
			// Convert inverted format back to normal
			const normalLines = this.lines
				.slice()
				.map(line => line.split('').reverse().join(''))
				.reverse();

			const content = normalLines.join('\n');
			await this.app.vault.modify(this.currentFile, content);

			new Notice(`Saved: ${this.currentFile.basename}`);
		} catch (error) {
			console.error('Error saving file:', error);
			new Notice('Error saving file');
		}
	}

	async saveAsNewFile() {
		const normalLines = this.lines
			.slice()
			.map(line => line.split('').reverse().join(''))
			.reverse();

		const content = normalLines.join('\n');
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
		const filename = `inverted-${timestamp}.md`;

		try {
			const file = await this.app.vault.create(filename, content);
			this.currentFile = file;
			this.updateHeader();
			new Notice(`Created: ${filename}`);
		} catch (error) {
			console.error('Error creating file:', error);
			new Notice('Error creating file');
		}
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.addClass('inverted-mirror-container');

		// Header
		const header = container.createDiv({ cls: 'inverted-mirror-header' });
		this.headerEl = header.createEl('h4', { text: 'Inverted Mirror Editor' });

		// Toolbar
		const toolbar = container.createDiv({ cls: 'inverted-mirror-toolbar' });

		const saveBtn = toolbar.createEl('button', { text: '💾 Save', cls: 'mod-cta' });
		saveBtn.onclick = () => this.saveToFile();

		const saveAsBtn = toolbar.createEl('button', { text: '📄 Save As New' });
		saveAsBtn.onclick = () => this.saveAsNewFile();

		const clearBtn = toolbar.createEl('button', { text: '🗑️ Clear', cls: 'mod-warning' });
		clearBtn.onclick = () => this.handleClear();

		const copyBtn = toolbar.createEl('button', { text: '📋 Copy' });
		copyBtn.onclick = () => this.handleCopy();

		// Live Sync Toggle
		this.liveSyncButton = toolbar.createEl('button', { text: '🔄 Live Sync' });
		this.liveSyncButton.onclick = () => this.toggleLiveSync();

		// Editor wrapper
		const editorWrapper = container.createDiv({ cls: 'inverted-mirror-editor-wrapper' });

		editorWrapper.createDiv({ cls: 'fixed-point-marker', text: '▶' });
		editorWrapper.createDiv({ cls: 'fixed-cursor-marker', text: '|' });

		this.editorEl = editorWrapper.createDiv({ cls: 'inverted-mirror-editor' });
		this.editorEl.tabIndex = 0;

		// Stats
		this.statsEl = container.createDiv({ cls: 'inverted-mirror-stats' });
		this.updateStats();

		// Event listeners
		this.editorEl.addEventListener('keydown', this.handleKeyDown.bind(this));
		this.editorEl.addEventListener('paste', this.handlePaste.bind(this));

		// Auto-save on change
		if (this.plugin.settings.autoSave) {
			this.registerInterval(
				window.setInterval(() => {
					if (this.currentFile) {
						this.saveToFile();
					}
				}, 30000) // Auto-save every 30 seconds
			);
		}

		this.updateDisplay();
		this.editorEl.focus();
	}

	updateHeader() {
		if (this.headerEl) {
			const title = this.currentFile
				? `Inverted: ${this.currentFile.basename}`
				: 'Inverted Mirror Editor (New)';
			this.headerEl.setText(title);
		}
	}

	handleKeyDown(e: KeyboardEvent) {
		// Save shortcut
		if ((e.ctrlKey || e.metaKey) && e.key === 's') {
			e.preventDefault();
			this.saveToFile();
			return;
		}

		// Copy shortcut
		if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
			e.preventDefault();
			this.handleCopy();
			return;
		}

		// Prevent arrow keys
		if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
			e.preventDefault();
			return;
		}

		// Backspace
		if (e.key === 'Backspace' || e.key === 'Delete') {
			e.preventDefault();
			this.handleBackspace();
			return;
		}

		// Enter
		if (e.key === 'Enter') {
			e.preventDefault();
			this.handleEnter();
			return;
		}

		// Printable characters
		if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			e.preventDefault();
			this.insertCharacter(e.key);
			return;
		}
	}

	insertCharacter(char: string) {
		this.lines[this.currentLineIndex] = char + this.lines[this.currentLineIndex];
		this.scheduleDisplayUpdate();
		this.checkLineWrap();
		this.scheduleStatsUpdate();
	}

	checkLineWrap() {
		if (!this.maxLineLength) {
			const editorWidth = this.editorEl.clientWidth;
			const availableWidth = editorWidth - 80;
			const charWidth = 10;
			this.maxLineLength = Math.floor(availableWidth / charWidth);
			this.maxLineLength = Math.max(20, Math.min(this.maxLineLength, this.plugin.settings.maxLineLength));
		}

		let lineIndex = this.currentLineIndex;
		let hasChanges = false;

		while (lineIndex < this.lines.length) {
			const line = this.lines[lineIndex];

			if (line.length > this.maxLineLength) {
				hasChanges = true;

				const keepInCurrent = line.substring(0, this.maxLineLength);
				const moveToNext = line.substring(this.maxLineLength);

				this.lines[lineIndex] = keepInCurrent;

				if (this.lines.length > lineIndex + 1) {
					this.lines[lineIndex + 1] = moveToNext + this.lines[lineIndex + 1];
				} else {
					this.lines.splice(lineIndex + 1, 0, moveToNext);
				}

				lineIndex++;
			} else {
				break;
			}
		}

		if (hasChanges) {
			this.updateDisplay();
		}
	}

	handleBackspace() {
		const currentLine = this.lines[this.currentLineIndex];

		if (currentLine.length > 0) {
			this.lines[this.currentLineIndex] = currentLine.slice(1);
		} else if (this.lines.length > 1 && this.currentLineIndex < this.lines.length - 1) {
			this.lines.splice(this.currentLineIndex, 1);
			if (this.currentLineIndex > 0) {
				this.currentLineIndex--;
			}
		}

		this.scheduleDisplayUpdate();
		this.scheduleStatsUpdate();
	}

	handleEnter() {
		this.lines.unshift('');
		this.currentLineIndex = 0;
		this.scheduleDisplayUpdate();
		this.scheduleStatsUpdate();
	}

	handlePaste(e: ClipboardEvent) {
		e.preventDefault();

		const pastedText = e.clipboardData?.getData('text/plain');
		if (pastedText) {
			const pastedLines = pastedText.split('\n');
			this.lines[this.currentLineIndex] += pastedLines[0];

			for (let i = 1; i < pastedLines.length; i++) {
				this.lines.unshift(pastedLines[i]);
				this.currentLineIndex++;
			}

			this.scheduleDisplayUpdate();
			this.scheduleStatsUpdate();
		}
	}

	scheduleDisplayUpdate() {
		if (this.displayUpdatePending) return;

		this.displayUpdatePending = true;
		requestAnimationFrame(() => {
			this.updateDisplay();
			this.displayUpdatePending = false;
		});
	}

	scheduleStatsUpdate() {
		const now = Date.now();
		// Throttle stats updates to max once per 100ms
		if (now - this.lastStatsUpdate < 100) {
			if (!this.statsUpdatePending) {
				this.statsUpdatePending = true;
				setTimeout(() => {
					this.updateStats();
					this.statsUpdatePending = false;
					this.lastStatsUpdate = Date.now();
				}, 100);
			}
			return;
		}

		this.updateStats();
		this.lastStatsUpdate = now;
	}

	updateDisplay() {
		this.editorEl.empty();

		this.lines.forEach((line, index) => {
			const lineDiv = this.editorEl.createDiv({ cls: 'editor-line' });

			if (index === this.currentLineIndex) {
				lineDiv.addClass('current-line');
			}

			const displayText = line.split('').reverse().join('');

			// Optimized: Create single text node with CSS for mirroring
			const textContainer = lineDiv.createSpan({ cls: 'mirrored-text' });
			textContainer.textContent = displayText || '\u00A0';
		});
	}

	updateStats() {
		const chars = this.lines.join('').length;
		const lines = this.lines.length;
		const saved = this.currentFile ? '💾' : '📝';
		this.statsEl.setText(`${saved} Characters: ${chars} | Lines: ${lines}`);
	}

	handleClear() {
		const totalChars = this.lines.join('').length;
		if (totalChars === 0) return;

		this.lines = [''];
		this.currentLineIndex = 0;
		this.updateDisplay();
		this.updateStats();
		new Notice('Content cleared');
	}

	handleCopy() {
		const normalLines = this.lines
			.slice()
			.map(line => line.split('').reverse().join(''))
			.reverse();

		const content = normalLines.join('\n');

		if (content.length === 0) {
			new Notice('Nothing to copy');
			return;
		}

		navigator.clipboard.writeText(content).then(() => {
			new Notice('Copied to clipboard');
		});
	}

	toggleLiveSync() {
		if (this.liveSyncEnabled) {
			this.stopLiveSync();
		} else {
			this.startLiveSync();
		}
	}

	startLiveSync() {
		if (!this.currentFile) {
			new Notice('No file open - cannot start live sync');
			return;
		}

		this.liveSyncEnabled = true;

		// Update button style
		if (this.liveSyncButton) {
			this.liveSyncButton.addClass('mod-cta');
			this.liveSyncButton.setText('🔄 Live Sync (ON)');
		}

		// Start sync interval
		const interval = this.plugin.settings.liveSyncInterval;
		this.liveSyncInterval = window.setInterval(() => {
			this.syncToNormalEditor();
		}, interval);

		// Do initial sync
		this.syncToNormalEditor();

		new Notice(`Live sync started (${interval}ms interval)`);
	}

	stopLiveSync() {
		this.liveSyncEnabled = false;

		// Clear interval
		if (this.liveSyncInterval !== null) {
			window.clearInterval(this.liveSyncInterval);
			this.liveSyncInterval = null;
		}

		// Update button style
		if (this.liveSyncButton) {
			this.liveSyncButton.removeClass('mod-cta');
			this.liveSyncButton.setText('🔄 Live Sync');
		}

		new Notice('Live sync stopped');
	}

	syncToNormalEditor() {
		if (!this.currentFile) return;

		try {
			// Convert to normal format: normal character order, normal line order (oldest first)
			const normalLines = this.lines
				.slice()
				.map(line => line.split('').reverse().join(''))
				.reverse();  // Reverse to oldest-first (normal document order)

			// Plain text, no HTML formatting
			const formattedContent = normalLines.join('\n');

			// Find the markdown view for this file
			const leaves = this.plugin.app.workspace.getLeavesOfType('markdown');
			for (const leaf of leaves) {
				const view = leaf.view;
				if (view instanceof MarkdownView && view.file === this.currentFile) {
					// Get the editor
					const editor = view.editor;
					if (editor) {
						// Store cursor position
						const cursor = editor.getCursor();

						// Replace content
						editor.setValue(formattedContent);

						// Restore cursor (best effort)
						try {
							editor.setCursor(cursor);
						} catch (e) {
							// Cursor position might be invalid, ignore
						}
					}
					break;
				}
			}
		} catch (error) {
			console.error('Live sync error:', error);
		}
	}

	async onClose() {
		// Stop live sync
		this.stopLiveSync();

		// Save if auto-save is enabled and there's a file
		if (this.plugin.settings.autoSave && this.currentFile) {
			await this.saveToFile();
		}
	}
}

// ============================================================================
// SETTINGS TAB
// ============================================================================

class InvertedMirrorSettingTab extends PluginSettingTab {
	plugin: InvertedMirrorPlugin;

	constructor(app: App, plugin: InvertedMirrorPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Inverted Mirror Editor Settings' });

		new Setting(containerEl)
			.setName('Auto-save')
			.setDesc('Automatically save changes every 30 seconds')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoSave)
				.onChange(async (value) => {
					this.plugin.settings.autoSave = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Max Line Length')
			.setDesc('Maximum characters per line before wrapping (20-150)')
			.addText(text => text
				.setPlaceholder('100')
				.setValue(String(this.plugin.settings.maxLineLength))
				.onChange(async (value) => {
					const num = parseInt(value);
					if (!isNaN(num) && num >= 20 && num <= 150) {
						this.plugin.settings.maxLineLength = num;
						await this.plugin.saveSettings();
					}
				}));

		new Setting(containerEl)
			.setName('Live Sync Interval')
			.setDesc('Update interval for live sync to normal editor in milliseconds (50-5000)')
			.addText(text => text
				.setPlaceholder('200')
				.setValue(String(this.plugin.settings.liveSyncInterval))
				.onChange(async (value) => {
					const num = parseInt(value);
					if (!isNaN(num) && num >= 50 && num <= 5000) {
						this.plugin.settings.liveSyncInterval = num;
						await this.plugin.saveSettings();
					}
				}));

		containerEl.createEl('h3', { text: 'Usage' });

		const usage = containerEl.createEl('div', { cls: 'setting-item-description' });
		usage.createEl('p', { text: '📝 Open current note in inverted mirror mode:' });
		usage.createEl('p', { text: 'Command Palette → "Open Current Note in Inverted Mirror Editor"' });
		usage.createEl('p', { text: '💾 Save: Cmd/Ctrl + S or use Save button' });
		usage.createEl('p', { text: '📋 Copy: Cmd/Ctrl + C or use Copy button' });
	}
}
