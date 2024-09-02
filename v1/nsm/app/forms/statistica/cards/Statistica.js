Ext.define('nsm.forms.statistica.cards.Statistica', {
  extend: 'Ext.form.Panel',
  requires: [
    'Ext.container.Container',
    'Ext.form.FieldSet',
    'Ext.form.TextField',
    'Ext.form.field.Checkbox',
    'Ext.form.field.ComboBox',
    'Ext.layout.container.HBox',
    'Ext.panel.Panel'
  ],
  scrollable: true,
  margin: 15,
  defaults: {
    msgTarget: 'side', labelAlign: 'top', margin: 5
  },
  items: [
    {
      xtype: 'container', bodyStyle: 'background-color:trasparent',
      layout: {
        type: 'hbox', align: 'stretch'
      },
      defaults: {
        msgTarget: 'side', labelAlign: 'top', margin: 5
      },
      items: [
        {
          xtype: 'combo',
          fieldLabel: Locale.t('nsm.forms.job.fields.tipoServizio'),
          displayField: 'id',
          valueField: 'id',
          queryMode: 'local',
          allowBlank: false,
          blankText: Locale.t('global.form.blanktext'),
          width: 200,
          forceSelection: true,
          bind: {
            store: '{comboTipoServizio}',
            value: '{record.tipoServizio}',
            readOnly: '{readOnly}'
          },
        },
        {
          xtype: 'combo',
          fieldLabel: Locale.t('nsm.forms.job.fields.applicazione'),
          displayField: 'titolo',
          valueField: 'titolo',
          queryMode: 'remote',
          autoLoadOnValue: true,
          blankText: Locale.t('global.form.blanktext'),
          width: 200,
          bind: {
            store: '{comboApplicazione}',
            value: '{record.applicazione}',
            readOnly: '{readOnly}'
          },
          listeners: {
            beforequery: function (qe) {
              delete qe.combo.lastQuery;
            }
          }
        },
      ]
    }, ,
    {
      xtype: 'container', bodyStyle: 'background-color:trasparent',
      layout: {
        type: 'hbox', align: 'stretch'
      },
      defaults: {
        msgTarget: 'side', labelAlign: 'top', margin: 5
      },
      items: [
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('nsm.forms.job.fields.nome'),
          flex: 1,
          minWidth: 210,
          allowBlank: false,
          blankText: Locale.t('global.form.blanktext'),
          maxLength: 150,
          maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: {
            readOnly: '{readOnly}',
            value: '{record.nome}'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('nsm.forms.job.fields.descrizione'),
          flex: 1,
          minWidth: 210,
          allowBlank: false,
          blankText: Locale.t('global.form.blanktext'),
          maxLength: 500,
          maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: {
            readOnly: '{readOnly}',
            value: '{record.descrizione}'
          }
        },
      ]
    },
    {
      xtype: 'container', bodyStyle: 'background-color:trasparent',
      layout: {
        type: 'hbox', align: 'stretch'
      },
      defaults: {
        msgTarget: 'side', labelAlign: 'top', margin: 5
      },
      items: [
        {
          xtype: 'checkboxfield',
          fieldLabel: Locale.t('nsm.forms.job.fields.enable'),
          boxLabel: Locale.t('nsm.forms.job.fields.enable'),
          hideLabel: true, width: 100, fieldBodyCls: 'check-label',
          bind: {
            value: '{record.enable}',
            readOnly: '{readOnly}'
          }
        },
        {
          xtype: 'combo',
          reference: 'combotipo',
          fieldLabel: Locale.t('nsm.forms.job.fields.tipo'),
          displayField: 'tipo',
          valueField: 'id',
          queryMode: 'local',
          allowBlank: false,
          blankText: Locale.t('global.form.blanktext'),
          width: 100,
          forceSelection: true,
          bind: {
            store: '{comboTipo}',
            value: '{record.tipo}',
            readOnly: '{readOnly}'
          },
        },
        {
          xtype: 'textfield',
          fieldLabel: Locale.t('nsm.forms.job.fields.filejs'),
          flex: 1,
          minWidth: 200,
          allowBlank: false, blankText: Locale.t('global.form.blanktext'),
          maxLength: 50, maxLengthText: Locale.t('global.form.maxlengthtext'),
          bind: {
            readOnly: '{readOnly}',
            value: '{record.filejs}'
          }
        },

      ]
    },
    {
      xtype: 'container', flex: 1,
      layout: { type: "hbox" },
      defaults: { margin: 5, labelAlign: 'top', msgTarget: 'side' },
      items: [
        {
          xtype: 'textarea', scrollable: true, overflow: 'auto',
          fieldLabel: Locale.t('nsm.forms.job.fields.note'),
          flex: 1, padding: '0 0 10 0',
          bind: { value: '{record.note}', readOnly: '{readOnly}' }
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: 'Cron',
      hidden: true,
      bind: {
        hidden: '{hide_cron}'
      },
      items: [
        {
          xtype: 'panel',
          items: [
            {
              xtype: 'textfield',
              fieldLabel: Locale.t('nsm.forms.job.fields.cron'),
              anchor: '100%',
              blankText: Locale.t('global.form.blanktext'),
              maxLength: 20,
              maxLengthText: Locale.t('global.form.maxlengthtext'),
              bind: {
                readOnly: '{readOnly}',
                value: '{record.cron}'
              }
            },
          ]
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: 'Job',
      hidden: true,
      bind: {
        hidden: '{hide_job}'
      },
      items: [
        {
          xtype: 'panel',
          items: [
            {
              xtype: 'textfield',
              fieldLabel: Locale.t('nsm.forms.job.fields.interval'),
              anchor: '100%',
              // allowBlank: false,
              // blankText: Locale.t('global.form.blanktext'),
              maxLength: 20,
              maxLengthText: Locale.t('global.form.maxlengthtext'),
              bind: {
                readOnly: '{readOnly}',
                value: '{record.interval}'
              }
            },
            {
              xtype: 'textfield',
              fieldLabel: Locale.t('nsm.forms.job.fields.timeout'),
              anchor: '100%',
              // allowBlank: false,
              // blankText: Locale.t('global.form.blanktext'),
              maxLength: 50,
              maxLengthText: Locale.t('global.form.maxlengthtext'),
              bind: {
                readOnly: '{readOnly}',
                value: '{record.timeout}'
              }
            },
          ]
        },
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('nsm.forms.job.fields.checkStart'),
      items: [
        {
          xtype: 'container', bodyStyle: 'background-color:trasparent',
          layout: {
            type: 'hbox', align: 'stretch'
          },
          defaults: {
            msgTarget: 'side', labelAlign: 'top', margin: 5, labelWidth: 250,
          },
          items: [
            {
              xtype: 'checkboxfield',
              boxLabel: Locale.t('nsm.forms.job.fields.attivo'),
              hideLabel: true, width: 200, fieldBodyCls: 'check-label',
              bind: {
                value: '{record.checkStart}',
                readOnly: '{readOnly}'
              }
            },
            {
              xtype: 'textfield',
              fieldLabel: Locale.t('nsm.forms.job.fields.stopService'),
              width: 250,
              bind: {
                readOnly: '{readOnly}',
                value: '{record.stopService}'
              }
            },
          ]
        },
      ]
    },
    {
      xtype: 'fieldset',
      title: Locale.t('nsm.forms.job.fields.log'),
      items: [
        {
          xtype: 'combo',
          labelWidth: 170,
          fieldLabel: Locale.t('nsm.forms.job.fields.log'),
          queryMode: 'local',
          allowBlank: false,
          displayField: 'descrizione',
          valueField: 'id',
          blankText: Locale.t('global.form.blanktext'),
          width: 450,
          forceSelection: true,
          bind: {
            store: '{comboLog}',
            value: '{record.log}',
            readOnly: '{readOnly}'
          }
        },
      ]
    },
  ],
});