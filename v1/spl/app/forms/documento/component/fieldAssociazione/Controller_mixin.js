Ext.define("spl.forms.documento.component.fieldAssociazione.Controller_mixin", {
  onSelectComboSogg: function (combo, rec) {
    let vm = this.getViewModel(), record = vm.get('record')
    record.set('idsoggettonew', rec.data.id);
    record.set('codice', rec.data.codice);
  },

  onChangeRadioTipoSogg: function (radio, newValue, oldValue) {
    let vm = this.getViewModel(), record = vm.get('record');
    this.getView().down('#comboSogg').setValue('');
    if (newValue !== undefined && newValue !== "X") {
      this.getView().down('#comboSogg').enable();
    } else {
      if (record.data.tipo_sogg !== 'C' && record.data.tipo !== 'F') {
        this.getView().down('#comboSogg').disable();
      } else {
        this.getView().down('#comboSogg').enable();
      }
    }
    record.set('idsoggettonew', "");
    record.set('codice', "");
  },
  //----------------------------------------------------------------
  // Store Combo Associa soggetto
  onBeforeLoadComboSogg: function (store) {
    if (store.isLoading()) return false;
    let vm = this.getViewModel(), record = vm.get('record');
    store.getProxy().extraParams.tipo_sogg = record.data.tipo_sogg;
  },
});