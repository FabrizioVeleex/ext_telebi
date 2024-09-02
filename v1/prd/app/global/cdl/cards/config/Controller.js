Ext.define("prd.global.cdl.cards.config.Controller", {
  config_mc: function () {

  },
  onSaveConfig: function () {
    try {
      let me = this,
        vm = me.getViewModel(),
        record = vm.get("record");

      record.save({
        success: function () {
          bdFunctions.bdTips.msg("Config", Locale.t('global.form.salvataggiook'), "PRD-64");
          record.load();
        }
      });

    } catch (error) {

    }
  },
  onConfigAfterRender: function (panel) {

  }
})