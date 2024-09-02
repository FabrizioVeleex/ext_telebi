/**
 * Created by luke on 15/04/22.
 */
Ext.define('vda.view.forms.component.btnAzioni', {
    extend: 'Ext.SplitButton',

    requires: [
        'Ext.menu.Menu'
    ],
    ui: "blue",
    text: Locale.t("vda.forms.progetto.btn.azioni.text"),
    menu: {xtype: 'menu',
        items: [
            {text: Locale.t('vda.forms.progetto.btn.azioni.mail'),handler: 'onCreaMail'},
            {text: Locale.t('vda.forms.progetto.btn.azioni.share'),handler: 'onCreaShare'}
        ]
    }
});