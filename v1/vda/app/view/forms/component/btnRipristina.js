/**
 * Created by luke on 15/03/22.
 */
Ext.define('vda.view.forms.component.btnRipristina', {
    extend: 'Ext.button.Button',
    ui: "blue",
    text: Locale.t("vda.forms.progetto.btn.ripristina.text"),
    tooltip: Locale.t("vda.forms.progetto.btn.ripristina.tooltip"),
    iconCls: "fas fa-hand-point-left",
    azione:97,
    handler: "onRipristina"
});