go.Modules.register("tutorial", "music", {
     mainPanel: "go.modules.tutorial.music.MainPanel",

     //The title is shown in the menu and tab bar
     title: t("Music"),

     //All module entities must be defined here. Stores will be created for them.
     entities: ["Genre", "Artist"],

     //Put code to initialize the module here after the user is authenticated 
		 //and has access to the module.
     initModule: function () {}
});
