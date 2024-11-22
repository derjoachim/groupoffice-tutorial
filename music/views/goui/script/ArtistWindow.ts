import {Component, comp, fieldset, t, textfield} from "@intermesh/goui";
import {FormWindow, router} from "@intermesh/groupoffice-core";

export class ArtistWindow extends FormWindow {
	private avatarComp: Component;
	constructor() {
		super("Artist");

		this.title = t("Artist");

		this.stateId = "artist-dialog";
		this.maximizable = true;
		this.resizable = true;
		this.width = 640;

		this.form.on('beforesave', (form, data) => {
			debugger;

		});

		this.form.on("save", (form, data, isNew) => {
			if (isNew) {
				router.goto("artist/" + data.id);
			}
		})

		this.generalTab.items.add(
			fieldset({},

				textfield({
					name: "name",
					label: t("Name"),
					required: true
				}),
				comp({
				}, this.avatarComp = new go.form.ImageField({
					name: "photo"
				}))
			)
		)

		// this.addCustomFields();

	}


}