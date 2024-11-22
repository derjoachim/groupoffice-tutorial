import {
	Button,
	Component,
	DataSourceForm,
	avatar,
	btn,
	column,
	comp,
	datasourceform,
	datecolumn,
	fieldset,
	store,
	t,
	table,
	Table,
	tbar,
    menu,
    hr
} from "@intermesh/goui";
import {DetailPanel, img, jmapds, router} from "@intermesh/groupoffice-core";
import {ArtistWindow} from "./ArtistWindow.js";
import {Artist} from "./Artist.js";

export class ArtistDetail extends DetailPanel<Artist> {
	private form: DataSourceForm<Artist>;
	private avatarContainer: Component;
	private albumsTable: Table;

	constructor() {
		super("Artist");
		this.width = 500;
		this.itemId = "detail";
		this.stateId = "music-detail";

		this.scroller.items.add(
			this.form = datasourceform({
					dataSource: jmapds("Artist")
				},

				comp({cls: "card"},
					tbar({},
						this.titleCmp = comp({tagName: "h3", flex: 1}),
					),
					comp({cls: "hflow", flex: 1},
						this.avatarContainer = comp({
							cls: "go-detail-view-avatar pad",
							itemId: "avatar-container"
						}),
					),
				)
			),

			fieldset({legend: t("Albums")},
				tbar({}, "->", btn({icon: "add", cls: "primary", text: t("Add"), handler:() => {
					// TODO
					// const w = new AlbumWindow();
					// w.on("close", async () => {
					// 	this.load(this.entity!.id)
					// });
					// w.show();
				}})),
			this.albumsTable = table({
				fitParent: true,
				// headers: false,
				store: store({
					data: []
				}),
				columns: [
					column({
						id: "id",
						hidden: true,
					}),
					column({
						id: "name",
						header: t("Title"),
						resizable: true,
						sortable: true
					}),
					datecolumn({
						id: "releaseDate",
						header: t("Release date"),
						sortable: true
					}),
					column({
						resizable: true,
						id: "genreId",
						header: t("Genre"),
						renderer: async (v) => {
							const g = await jmapds("Genre").single(v);
							return g!.name;
						}
					}),
					column({
						resizable: false,
						// sticky: true,
						width: 32,
						id: "btn",
						renderer: (columnValue: any, record, td, table, rowIndex) => {

							return btn({
								icon: "more_vert", menu: menu({}, btn({
									icon: "edit", text: t("Edit"), handler: async (_btn) => {
										// TODO...
										// const dlg = new go.modules.community.tasks.AlbumDialog({
										// 	redirectOnSave: false
										// });
										//
										// const album = table.store.get(rowIndex)!;
										//
										// dlg.load(album.id);
										// dlg.show();
									}
								}), hr(), btn({
									icon: "delete", text: t("Delete"), handler: async (btn) => {
										// TODO...
									}
								}))
							})
						}
					})
				]
			})
			)
		);

		this.toolbar.items.add(
			btn({
				icon: "edit",
				title: t("Edit"),
				handler: (button, ev) => {
					const dlg = new ArtistWindow();
					void dlg.load(this.entity!.id);
					dlg.show();
				}
			}),
			 btn({
				icon: "delete",
				title: t("Delete"),
				handler: () => {
					jmapds("Artist").destroy(this.entity!.id).then(() => {
						router.goto("music");
					})
				}
			})
		)
		this.on("load", (pnl, entity) => {
			this.title = entity.name
			if (entity!.photo) {
				pnl.avatarContainer.items.replace(img({
					cls: "goui-avatar",
					blobId: entity.photo,
					title: entity.name
				}));
			} else {
				pnl.avatarContainer.items.replace(avatar({cls: "goui-avatar", displayName: entity.name}));
			}
			this.albumsTable.store.loadData(entity.albums, false);
		})
	}
}