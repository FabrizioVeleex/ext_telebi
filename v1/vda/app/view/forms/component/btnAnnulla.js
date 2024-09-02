/**
 * Created by luke on 15/03/22.
 */
Ext.define('vda.view.forms.component.btnAnnulla', {
    extend: 'Ext.button.Button',
    ui: "red",
    text: Locale.t("vda.forms.progetto.btn.annulla.text"),
    tooltip: Locale.t("vda.forms.progetto.btn.annulla.tooltip"),
    iconCls: "fas fa-ban",
    azione:98,
    handler: "onSospendiAnnulla"
});