/**
 * Created by fabri on 08/10/2022.
 */
Ext.define('orf.forms.documento.component.radioTipoSogg.radioTipoSogg', {
  extend: 'Ext.form.RadioGroup',
  xtype: 'v1-orf-form-documento-radiotiposoggetto',
  bind: {
    value: '{record.tipo_sogg}',
  },
  style: { 'margin-right': "5px" },
  items: [
    { boxLabel: 'Cliente ', name: 'rb', inputValue: 'C' },
    { boxLabel: 'Fornitore ', name: 'rb', inputValue: 'F', checked: true },
  ],
  simpleValue: true,
  fieldLabel: Locale.t('orf.forms.documento.btn.associa.tipo_sogg'),
  labelWidth: 40,
  listeners: {
    change: "onChangeRadioTipoSogg"
  }
});