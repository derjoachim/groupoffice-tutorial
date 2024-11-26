import {Component, EntityID, Form, Notifier, Window, btn, combobox, comp, datefield, fieldset, form, t, tbar, textfield} from "@intermesh/goui";
import { jmapds } from "@intermesh/groupoffice-core";
export class AlbumWindow extends Window {

	private artistId: EntityID;
	private form: Form;
	constructor(artistId: EntityID) {
		super();
		this.artistId = artistId;
		Object.assign(this, {
				title: t("New album"),
				width: 800,
				height: 500,
				modal: true,
				resizable: false,
				maximizable: false
			}
		);
		this.form = form({
			flex: 1,
			cls: "vbox",
			handler: (albumfrm) => {
				// TODO: Save new album or update current
				debugger;
				const v = albumfrm.value;
				v.artistId = artistId;
				console.log(v);
				jmapds("Artist").update(artistId, {albums: [v]}).then((result) => {console.log(result);this.close();}).catch((e) => Notifier.error(e))
			}
			},
			fieldset({
					cls: "flow scroll",
					flex: 1
				},

				comp({cls: "vbox gap"},

					textfield({
						label: t("Title"),
						name: "name",
						required: true,
					}),

					datefield({
						name: "releaseDate",
						required: true,
						label: t("Release date"),
					}),

					combobox({
						name: "genreId",
						label: t("Genre"),
						required: true,
						dataSource: jmapds("Genre"),
					})
				),

			),
			tbar({}, "->", btn({type: "submit", text: t("Save")}))
		);

		this.items.add(this.form);
	}

	public load(record: any) {
		this.title = record.name;
		this.form.value = record;
	}
}