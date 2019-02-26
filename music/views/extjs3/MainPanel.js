go.modules.tutorial.music.MainPanel = Ext.extend(go.modules.ModulePanel, {

	// Will make a single item fit in this panel. We'll change this later.
	layout: "fit",

	initComponent: function () {

		//create the genre filter component
		this.genreFilter = new go.modules.tutorial.music.GenreFilter({
			tbar: [{
					xtype: "tbtitle",
					text: t("Genres")
				}]
		});

		//add it to the main panel's items.
		this.items = [this.genreFilter];

		go.modules.tutorial.music.MainPanel.superclass.initComponent.call(this);

		this.on("afterrender", function () {

			//when this panel renders, load the filter.
			this.genreFilter.store.load();

		}, this);
	}
});
