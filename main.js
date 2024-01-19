const { Plugin, PluginSettingTab, Setting } = require('obsidian')

const DEFAULT_SETTINGS = {
	TODO: 'TODO',
}

module.exports = class GtdAgendas extends Plugin {
	async onload() {
		await this.loadSettings()
		this.app.workspace.onLayoutReady(this.initialize)
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings || DEFAULT_SETTINGS)
	}

	initialize = () => {
		//
	}
}

class GtdAgendasSettingTab extends PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin)
		this.plugin = plugin
	}
	display() {
		const { containerEl } = this
		containerEl.empty()
		new Setting(containerEl)
			.setName('TODO')
			.setDesc('TODO')
			.addText(
				text => text
					.setPlaceholder(DEFAULT_SETTINGS.TODO)
					.setValue(this.plugin.settings.TODO)
					.onChange(async (value) => {
						this.plugin.settings.TODO = value
						await this.plugin.saveSettings()
					})
			)
	}
}
