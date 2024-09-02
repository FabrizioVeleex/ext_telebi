Ext.onReady(function () {
    Ext.application({
        extend: "recpub.Application",
        name: "recpub",
        requires: [
            "recpub.view.start.Panel",
            "portal.v1.global.Vars",
            "portal.util.Locale",
        ],
        mainView: "recpub.view.start.Panel",
    });
});