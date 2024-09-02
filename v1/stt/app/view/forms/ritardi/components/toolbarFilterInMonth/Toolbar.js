/**
 * Created by fabrizio on 07/09/22.
 */
Ext.define("stt.view.forms.ritardi.components.toolbarFilterInMonth.Toolbar", {
  extend: "Ext.Toolbar",

  items: [
    {
      xtype: 'checkboxfield', boxLabel: Locale.t("stt.forms.ritardi.dettaglio.filter.inmonth.prev"),
      fieldLabel: Locale.t("stt.forms.ritardi.dettaglio.filter.inmonth.label"),
      nameColumn: 'prev',
      bind: {
        value: '{inMonth.prev}',
      },
      listeners: {
        change: "onInmonthChange"
      }
    },
    {
      xtype: 'checkboxfield', boxLabel: Locale.t("stt.forms.ritardi.dettaglio.filter.inmonth.in"),
      hideLabel: true,
      nameColumn: 'in',
      bind: {
        value: '{inMonth.in}',
      },
      listeners: {
        change: "onInmonthChange"
      }
    },
    {
      xtype: 'checkboxfield', boxLabel: Locale.t("stt.forms.ritardi.dettaglio.filter.inmonth.next"),
      hideLabel: true,
      nameColumn: 'next',
      bind: {
        value: '{inMonth.next}',
      },
      listeners: {
        change: "onInmonthChange"
      }
    }
  ],
});
