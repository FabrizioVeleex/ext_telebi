/**
 * Created by fabrizio on 16/06/22.
 */
Ext.define("bofpub.Application", {
  extend: "Ext.app.Application",
  name: "bofpub",

  requires: ["portal.util.Locale", "Ext.plugin.Viewport"],
  launch: function () {
    Ext.ariaWarn = Ext.emptyFn;
  },
  onAppUpdate: function () {
    window.location.reload();
  },
});
