/**
 * Created by luke on 15/03/22.
 */
Ext.define('vda.view.forms.component.btnRespingi', {
    extend: 'Ext.button.Button',
    ui: "blue",
    text: Locale.t("vda.forms.progetto.btn.respingi.text"),
    tooltip: Locale.t("vda.forms.progetto.btn.respingi.tooltip"),
    iconCls: "fas fa-thumbs-down",
    azione:97,
    handler: "onRespingi"
});