/**
 * Created by luke on 12/02/21.
 */
Ext.define("gpr.view.forms.prodotto.cards.Prodotto", {
  extend: "Ext.form.Panel",
  requires: [
    "Ext.container.Container",
    "Ext.form.TextField",
    "Ext.layout.container.HBox",
    'Ext.form.field.TextArea'
  ],
  scrollable: "y",
  items: [
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.schcdr'),
          width: 500,readOnly: true,
          bind: {value: '{record.schcdr}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.ycdrol_dx_sx'),
          width: 500,readOnly: true,
          bind: {value: '{record.ycdrol_dx_sx}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textarea',scrollable:true,overflow:'auto',height:100,
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.ymarca'),
          flex:1,padding:'0 0 10 0', readOnly: true,
          bind: {value: '{record.ymarca}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.yporte_dx_sx'),
          width: 500,readOnly: true,
          bind: {value: '{record.yporte_dx_sx}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.ylatom_dx_sx'),
          width: 500,readOnly: true,
          bind: {value: '{record.ylatom_dx_sx}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.ylato_porte_dx'),
          width: 500,readOnly: true,
          bind: {value: '{record.ylato_porte_dx}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.ylato_porte_sx'),
          width: 500,readOnly: true,
          bind: {value: '{record.ylato_porte_sx}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.schfun'),
          width: 500,readOnly: true,
          bind: {value: '{record.schfun}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.schfu2'),
          width: 500,readOnly: true,
          bind: {value: '{record.schfu2}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',reference:'elettrico',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.elettrico'),
          width: 500,readOnly: true,
          bind: {value: '{record.elettrico}',hidden:'{hideelettrico}'}
        },
        {xtype: 'textfield',hidden:true,reference:'manuale',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.manuale'),
          width: 500,readOnly: true,
          bind: {value: '{record.manuale}',hidden:'{hidemanuale}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.comfort'),
          width: 500,readOnly: true,
          bind: {value: '{record.comfort}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.meccanismo'),
          width: 500,readOnly: true,
          bind: {value: '{record.meccanismo}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.pannello'),
          width: 500,readOnly: true,
          bind: {value: '{record.pannello}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.antipinch'),
          width: 500,readOnly: true,
          bind: {value: '{record.antipinch}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.immagine_oe'),
          width: 500,readOnly: true,
          bind: {value: '{record.immagine_oe}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.immagine'),
          width: 500,readOnly: true,
          bind: {value: '{record.immagine}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.connettore'),
          width: 500,readOnly: true,
          bind: {value: '{record.connettore}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.manutenzione'),
          width: 500,readOnly: true,
          bind: {value: '{record.manutenzione}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.check_digit_1'),
          width: 500,readOnly: true,
          bind: {value: '{record.check_digit_1}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.check_digit_2'),
          width: 500,readOnly: true,
          bind: {value: '{record.check_digit_2}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.codice_barre'),
          width: 500,readOnly: true,
          bind: {value: '{record.codice_barre}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.portiera'),
          width: 500,readOnly: true,
          bind: {value: '{record.portiera}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.immagine1'),
          width: 500,readOnly: true,
          bind: {value: '{record.immagine1}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.immagine2'),
          width: 500,readOnly: true,
          bind: {value: '{record.immagine2}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.immagine3'),
          width: 500,readOnly: true,
          bind: {value: '{record.immagine3}'}
        },
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.immagine4'),
          width: 500,readOnly: true,
          bind: {value: '{record.immagine4}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textfield',
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.video'),
          width: 500,readOnly: true,
          bind: {value: '{record.video}'}
        }
      ]
    },
    {xtype: 'container', layout: 'hbox',defaults: { margin: 5,labelWidth:150},
      items: [
        {xtype: 'textarea',scrollable:true,overflow:'auto',height:100,
          fieldLabel: Locale.t('gpr.forms.prodotto.fields.descrizione'),
          flex:1,padding:'0 0 10 0', readOnly: true,
          bind: {value: '{record.descrizione}'}
        }
      ]
    }
  ]
});
