/**
 * Created by fabrizio on 16/06/22.
 */
Ext.define("bofpub.view.start.Model", {
  extend: "portal.v1.view.main.start.Model",
  alias: "viewmodel.start",
  data: {
    tag: "BOFPUB",
    title: Locale.t("bofpub.apptitle"),
  },
});
