/**
 * Created by fabrizio on 20/05/17.
 */
Ext.define("recpub.view.form.resi.info", {
  extend: "Ext.panel.Panel",
  requires: ["Ext.layout.container.Fit", "Ext.panel.Panel", "Ext.layout.container.VBox", "Ext.container.Container"],
  layout: "fit",
  items: [
    {
      xtype: "panel",
      layout: {
        type: "vbox",
        align: "middle",
        pack: "center",
      },
      items: [
        {
          xtype: "panel",
          bodyStyle: {
            "background-color": "trasparent !important",
          },
          items: [
            {
              xtype: "panel",
              cls: "panelwait",
              bodyStyle: {
                "background-color": "trasparent !important",
              },
              items: [
                {
                  xtype: "container",
                  height: 100,
                  cls: "panelwait",
                  html: '<div class="panelwait" style="text-align: center;"><img width="285" src="/images/azienda/acrolcar-01.png"/></div>',
                },
              ],
            },
            {
              xtype: "panel",
              layout: {
                type: "vbox",
                align: "middle",
                pack: "center",
              },
              cls: "panelwait",
              height: 50,
              //width:285,
              bodyStyle: {
                "background-color": "#E4E5E4",
              },
              items: [
                {
                  xtype: "container",
                  cls: "panelwait",
                  html: '<div class="panelwait" style="text-align:center;"><span class="fontPT">Elaborazione in corso...</span></div>',
                },
              ],
            },
            {
              xtype: "panel",
              cls: "panelwait",
              //width:285,
              height: 100,
              bodyStyle: {
                "background-color": "#3C3C3B",
              },
              items: [
                {
                  xtype: "container",
                  height: 100,
                  cls: "panelwait",
                  html: '<div class="panelwait" style="text-align:center;"><div style="height:40px">&nbsp;</div><img src="/images/azienda/ajax-loader.gif"/></div>',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
