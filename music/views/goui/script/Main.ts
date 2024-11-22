import {
	btn,
	comp,
	Component,
	EntityID,
	mstbar,
	Notifier,
	paginator,
	searchbtn,
	splitter,
	t,
	tbar
} from "@intermesh/goui";
import {
	authManager,
	router,
	FilterCondition,
} from "@intermesh/groupoffice-core";
import {ArtistTable} from "./ArtistTable.js";
import {GenreTable} from "./GenreTable.js";
import { ArtistDetail } from "./ArtistDetail.js";
import {ArtistWindow} from "./ArtistWindow.js";

export class Main extends Component {
	private artistTable: ArtistTable;


	private genreTable!: GenreTable;
	private west: Component;
	private center: Component;
	private east: ArtistDetail;

	constructor() {
		super("section");

		this.id = "music";
		this.cls = "vbox fit";
		this.on("render", async () => {
			try {
				await authManager.requireLogin();
			} catch (e) {
				console.warn(e);
				Notifier.error(t("Login is required on this page"));
			}

			await this.genreTable.store.load();
			await this.artistTable.store.load();
		});


		this.artistTable = new ArtistTable();
		this.artistTable.on("navigate", async (table: ArtistTable, rowIndex: number) => {
			await router.goto("music/" + table.store.get(rowIndex)!.id);
		});

		this.west = this.createWest();
		this.items.add(
			comp({
					flex: 1, cls: "hbox mobile-cards"
				},

				this.west,

				splitter({
					stateId: "music-splitter-west",
					resizeComponentPredicate: this.west
				}),

				this.center = comp({
						cls: 'active vbox',
						itemId: 'table-container',
						flex: 1,
						style: {
							minWidth: "365px", //for the resizer's boundaries
							maxWidth: "850px"
						}
					},

					tbar({},
						btn({
							cls: "for-small-device",
							title: t("Menu"),
							icon: "menu",
							handler: (button, ev) => {
								this.activatePanel(this.west);
							}
						}),

						'->',

						searchbtn({
							listeners: {
								input: (sender, text) => {

									(this.artistTable.store.queryParams.filter as FilterCondition).text = text;
									this.artistTable.store.load();

								}
							}
						}),

						mstbar({table: this.artistTable}),

						btn({
							itemId: "add",
							icon: "add",
							cls: "filled primary",
							handler: async () => {
								const w = new ArtistWindow();
								w.on("close", async () => {
									debugger;
								});
								w.show();

							}
						})
					),

					comp({
							flex: 1,
							stateId: "music",
							cls: "scroll border-top main"
						},
						this.artistTable
					),


					paginator({
						store: this.artistTable.store
					})
				),


				splitter({
					stateId: "music-splitter",
					resizeComponentPredicate: "table-container"
				}),

				this.east = new ArtistDetail()
			)
		);
	}

	private activatePanel(active: Component) {
		this.center.el.classList.remove("active");
		this.east.el.classList.remove("active");
		this.west.el.classList.remove("active");

		active.el.classList.add("active");
	}

	private createWest(): Component {
		this.genreTable = new GenreTable();
		this.genreTable.rowSelectionConfig = {
			multiSelect: true,
			listeners: {
				selectionchange: (tableRowSelect) => {
					const genreIds = tableRowSelect.selected.map((index: number) => tableRowSelect.list.store.get(index)!.id);
					(this.artistTable.store.queryParams.filter as FilterCondition).genres = genreIds;
					this.artistTable.store.load();
				}
			}
		}

		return comp({
				cls: "vbox scroll",
				width: 300
			},
			tbar({
					cls: "border-bottom"
				},
				comp({
					tagName: "h3",
					text: t("Genre"),
					flex: 1
				}),
				'->',
				btn({
					cls: "for-small-device",
					title: t("Close"),
					icon: "close",
					handler: (button, ev) => {
						this.activatePanel(this.center);
					}
				})
			),
			this.genreTable
		);
	}

	async load(id?: EntityID) {
		if(id) {
			void this.east.load(id);
			this.activatePanel(this.east);
		} else {
			this.activatePanel(this.center);
		}

	}

}
