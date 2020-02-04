go.modules.tutorial.music.ArtistDetail = Ext.extend(go.detail.Panel, {

	// The entity store is connected. The detail view is automatically updated.
	entityStore: "Artist",

	//set to true to enable state saving
	stateful: false,
	stateId: 'music-contact-detail',

	// Fetch these relations for this view
	relations: ["albums.genre"],

	initComponent: function () {
		this.tbar = this.initToolbar();

		Ext.apply(this, {
			// all items are updated automatically if they have a "tpl" (Ext.XTemplate) property or an "onLoad" function. The panel is passed as argument.
			items: [

				//Artist name component
				{
					cls: 'content',
					xtype: 'box',
					tpl: '<h3>{name}</h3>'
				},

				//Render the avatar
				{
					xtype: "box",
					cls: "content",
					tpl: new Ext.XTemplate('<div class="go-detail-view-avatar">\
						<div class="avatar" style="width:120px;height:120px;{[this.getStyle(values.photo)]}"></div></div>',
						{
							getCls: function (isOrganization) {
								return isOrganization ? "organization" : "";
							},
							getStyle: function (photoBlobId) {
								return photoBlobId ? 'background-image: url(' + go.Jmap.downloadUrl(photoBlobId) + ')"' : "";
							}
						})
				},

				// Albums component
				{
					collapsible: true,
					title: t("Albums"),
					xtype: "panel",
					tpl: '<div class="icons">\
                          <tpl for="albums">\
                          <p class="s6"><tpl if="xindex == 1"><i class="icon label">album</i></tpl>\
                          <span>{name}</span>\
                          <label>{[go.util.Format.date(values.releaseDate)]} - <tpl for="genre">{name}</tpl></label>\
                          </p>\
                          </tpl>\
                          </div>'
				}
			]
		});

		go.modules.tutorial.music.ArtistDetail.superclass.initComponent.call(this);

	},

	onLoad: function () {

		// Enable edit button according to permission level.
		this.getTopToolbar().getComponent("edit").setDisabled(this.data.permissionLevel < go.permissionLevels.write);
		this.deleteItem.setDisabled(this.data.permissionLevel < go.permissionLevels.writeAndDelete);

		go.modules.tutorial.music.ArtistDetail.superclass.onLoad.call(this);
	},

	initToolbar: function () {

		var items = this.tbar || [];

		items = items.concat([
			'->',
			{
				itemId: "edit",
				iconCls: 'ic-edit',
				tooltip: t("Edit"),
				handler: function (btn, e) {
					var dlg = new go.modules.tutorial.music.ArtistDialog();
					dlg.show();
					dlg.load(this.data.id);
				},
				scope: this
			},

			{

				iconCls: 'ic-more-vert',
				menu: [
					{
						iconCls: "ic-print",
						text: t("Print"),
						handler: function () {
							this.body.print({title: this.data.name});
						},
						scope: this
					},
					'-',
					this.deleteItem = new Ext.menu.Item({
						itemId: "delete",
						iconCls: 'ic-delete',
						text: t("Delete"),
						handler: function () {
							Ext.MessageBox.confirm(t("Confirm delete"), t("Are you sure you want to delete this item?"), function (btn) {
								if (btn != "yes") {
									return;
								}
								this.entityStore.set({destroy: [this.currentId]});
							}, this);
						},
						scope: this
					})

				]
			}]);

		var tbarCfg = {
			disabled: true,
			items: items
		};

		return new Ext.Toolbar(tbarCfg);
	}
});