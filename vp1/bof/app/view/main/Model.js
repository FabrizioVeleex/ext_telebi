/**
 * Created by fabrizio on 16/06/22.
 */
Ext.define("bofpub.view.main.Model", {
  extend: "portal.v1.view.main.ViewModel",
  alias: "viewmodel.main",
  data: {
    btn: {
      pak: false,
      ddt: true,
      fat: true,
      ntc: true,
    },
    name: "bofpub",
    tr: LOCALE.default,
    apptitle: Locale.t("bofpub.apptitle"),
    tag: "BOF",
  },
});
