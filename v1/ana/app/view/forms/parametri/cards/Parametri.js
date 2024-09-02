/**
 * Created by luke on 30/05/2020.
 */
Ext.define('ana.view.forms.parametri.cards.Parametri', {
  extend: 'Ext.form.Panel',
  requires: ['Ext.container.Container', 'Ext.form.field.Number', 'Ext.form.field.ComboBox', 'Ext.layout.container.HBox'],
  scrollable: 'y',
  items: [
    {xtype: 'container', flex: 1,
      layout: {type: 'hbox'},
      defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
      items: [
        {xtype: 'numberfield', fieldLabel: Locale.t('ana.forms.parametri.fields.ggattivo'), width: 300,
          hideTrigger: true, allowDecimals: false, minValue: 0,
          bind: {readOnly: '{readOnly}', value: '{record.ggattivo}'}
        }
      ]
    },
    {xtype: 'container', flex: 1,
      layout: {type: 'hbox'},
      defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
      items: [
        {xtype: 'numberfield', fieldLabel: Locale.t('ana.forms.parametri.fields.ggattivofor'), width: 300,
          hideTrigger: true, allowDecimals: false, minValue: 0,
          bind: {readOnly: '{readOnly}', value: '{record.ggattivofor}'}
        }
      ]
    },
    {xtype: 'container', flex: 1,
      layout: {type: 'hbox'},
      defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
      items: [
        {xtype: 'combo', fieldLabel: Locale.t('ana.forms.parametri.fields.commercialeIT'), width: 600,
          displayField: 'nomecognome', minChars: 3, forceSelection: true, valueField: 'id', autoLoadOnValue: true,
          bind: {
            store: '{comboUtente}', value: '{record.commercialeIT}', readOnly: '{readOnly}'
          }
        }
      ]
    },
    {xtype: 'container', flex: 1,
      layout: {type: 'hbox'},
      defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
      items: [
        {xtype: 'combo', fieldLabel: Locale.t('ana.forms.parametri.fields.commercialeEE'), width: 600,
          displayField: 'nomecognome', minChars: 3, forceSelection: true, valueField: 'id', autoLoadOnValue: true,
          bind: {
            store: '{comboUtente2}', value: '{record.commercialeEE}', readOnly: '{readOnly}'
          }
        }
      ]
    },
    {xtype: 'container', flex: 1,
      layout: {type: "hbox"},
      defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
      items: [
        {
          xtype: 'combo', fieldLabel: Locale.t('ana.forms.parametri.fields.notificaordini'), width: 400,
          displayField: 'nome', valueField: 'id',
          queryMode: 'local', forceSelection: true,
          bind: {
            store: '{comboGruppo}', value: '{record.notificaordini}', readOnly: '{readOnly}'
          }
        }
      ]
    },
    {xtype: 'container', flex: 1,
      layout: {type: "hbox"},
      defaults: {margin: 5, labelAlign: 'top', msgTarget: 'side'},
      items: [
        {
          xtype: 'combo', fieldLabel: Locale.t('ana.forms.parametri.fields.notificatimbrature'), width: 400,
          displayField: 'nome', valueField: 'id',
          queryMode: 'local', forceSelection: true,
          bind: {
            store: '{comboAnomalie}', value: '{record.notificatimbrature}', readOnly: '{readOnly}'
          }
        }
      ]
    }
  ]
});
