/**
 * Created by luke on 15/03/22.
 */
Ext.define('vda.view.forms.component.btnSospendi', {
    extend: 'Ext.button.Button',
    ui: "orange",
    text: Locale.t("vda.forms.progetto.btn.sospendi.text"),
    tooltip: Locale.t("vda.forms.progetto.btn.sospendi.tooltip"),
    iconCls: "fas fa-hand-paper",
    azione:97,
    handler: "onSospendiAnnulla"
});