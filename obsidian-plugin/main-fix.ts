import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
	WorkspaceLeaf,
	ItemView,
	Notice,
	MarkdownView
} from 'obsidian';

import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { StateField, StateEffect, Extension, Facet } from '@codemirror/state';

/**
 * Inverted Mirror Editor Plugin for Obsidian - FIXED VERSION
 * Problem solved: Editor state persists even when editor gets focus
 */

interface InvertedMirrorSettings {
	editorModeEnabled: boolean;
}

const DEFAULT_SETTINGS: InvertedMirrorSettings = {
	editorModeEnabled: false
}

const VIEW_TYPE_INVERTED_MIRROR = "inverted-mirror-view";
const INVERTED_EDITOR_CLASS = 'inverted-mirror-editor-mode';

// Create a facet to pass the plugin instance to the extension
const pluginFacet = Facet.define<InvertedMirrorPlugin, InvertedMirrorPlugin>({
	combine: values => values[0]
});

export default class InvertedMirrorPlugin extends Plugin {
	settings: InvertedMirrorSettings;

	async onload() {
		console.log('Inverted Mirror Editor: Loading plugin...');

		await this.loadSettings();

		// Register CodeMirror extension that has access to plugin
		this.registerEditorExtension([
			pluginFacet.of(this),
			this.createViewPlugin()
		]);

		// Command: Toggle inverted mode globally
		this.addCommand({
			id: 'toggle-inverted-mode-global',
			name: 'Toggle Inverted Mirror Mode',
			callback: () => {
				this.settings.editorModeEnabled = !this.settings.editorModeEnabled;
				this.saveSettings();
				// Force refresh by recreating all editor views
				this.app.workspace.updateOptions();
				new Notice(
					this.settings.editorModeEnabled
						? '✅ Inverted Mirror Mode: ON'
						: '❌ Inverted Mirror Mode: OFF'
				);
				console.log('Inverted Mirror Editor: Mode toggled to', this.settings.editorModeEnabled);
			}
		});

		this.addSettingTab(new InvertedMirrorSettingTab(this.app, this));

		console.log('Inverted Mirror Editor: Plugin loaded successfully');
	}

	createViewPlugin() {
		return ViewPlugin.fromClass(class {
			constructor(private view: EditorView) {
				this.checkAndApply();
			}

			update(update: ViewUpdate) {
				this.checkAndApply();
			}

			checkAndApply() {
				try {
					// Get plugin instance from facet
					const plugin = this.view.state.facet(pluginFacet);
					const shouldBeInverted = plugin?.settings?.editorModeEnabled || false;

					const editorElement = this.view.dom.closest('.cm-editor');
					if (editorElement) {
						const hasClass = editorElement.classList.contains(INVERTED_EDITOR_CLASS);
						
						if (shouldBeInverted && !hasClass) {
							editorElement.classList.add(INVERTED_EDITOR_CLASS);
							console.log('✅ Applied inverted class');
						} else if (!shouldBeInverted && hasClass) {
							editorElement.classList.remove(INVERTED_EDITOR_CLASS);
							console.log('❌ Removed inverted class');
						}
					}
				} catch (error) {
					console.error('Error in checkAndApply:', error);
				}
			}

			destroy() {
				const editorElement = this.view.dom.closest('.cm-editor');
				if (editorElement) {
					editorElement.classList.remove(INVERTED_EDITOR_CLASS);
				}
			}
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	onunload() {
		console.log('Inverted Mirror Editor: Unloading...');
	}
}

class InvertedMirrorSettingTab extends PluginSettingTab {
	plugin: InvertedMirrorPlugin;

	constructor(app: App, plugin: InvertedMirrorPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Inverted Mirror Editor' });

		new Setting(containerEl)
			.setName('Enable Inverted Mirror Mode')
			.setDesc('Turn on right-to-left writing mode for all editors')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.editorModeEnabled)
				.onChange(async (value) => {
					this.plugin.settings.editorModeEnabled = value;
					await this.plugin.saveSettings();
					this.plugin.app.workspace.updateOptions();
					new Notice(value ? '✅ Inverted mode ON' : '❌ Inverted mode OFF');
				}));
	}
}
