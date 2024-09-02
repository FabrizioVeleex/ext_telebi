/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.enableAriaPanels = false; //ARIA regions
Ext.define("sdcpub.Application", {
  extend: "Ext.app.Application",
  name: "sdcpub",
  requires: [
      "portal.util.Locale",
      "Ext.plugin.Viewport"
  ],
  launch: function () {
    Ext.ariaWarn = Ext.emptyFn
  },
  onAppUpdate: function () {
    window.location.reload();
  },
});
