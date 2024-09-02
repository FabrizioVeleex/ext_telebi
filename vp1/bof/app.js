Ext.onReady(function () {
  Ext.application({
    extend: "bofpub.Application",
    name: "bofpub",
    requires: ["bofpub.view.start.Panel", "portal.v1.global.Vars", "portal.util.Locale"],
    mainView: "bofpub.view.start.Panel",
  });
});
