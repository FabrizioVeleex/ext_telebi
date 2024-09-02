Ext.define("prd.forms.cdl.cards.dashboard.Controller", {
  extend: "prd.global.cdl.cards.dashboard.Controller",
  requires: [
    "prd.global.cdl.cards.dashboard.status.Panel",
    "prd.global.cdl.cards.dashboard.status.component.Cdl",
    "prd.global.cdl.cards.dashboard.status.component.Agent",
    "prd.global.cdl.cards.dashboard.status.component.Connection",
    "prd.forms.cdl.cards.dashboard.status.haas.Cdl"
  ],
  dashboard_mc: function () {
    this.callParent(arguments)
  },
  onAfterRenderDashboard: function (panel) {
    let itemsStatus = [];
    if (this.customPanel === "haas") {
      itemsStatus.push({ xtype: "global-cdl-cards-dashboard-status-component-connection" })
      itemsStatus.push({ xtype: "prd-forms-cdl-cards-dashboard-status-haas-cdl" })
    } else {
      itemsStatus.push({ xtype: "global-cdl-cards-dashboard-status-component-cdl" })
    }
    itemsStatus.push({ xtype: "global-cdl-cards-dashboard-status-component-agent" })

    let statusPanel = Ext.create("prd.global.cdl.cards.dashboard.status.Panel", {
      items: itemsStatus
    })
    panel.add([

      statusPanel,
      {
        xtype: 'fieldset', collapsible: false, collapsed: false,
        title: `<span style="color: black;font-weight:bold">${Locale.t("prd.forms.cdl.cards.dashboard.orders.title")}</span>`,
        style: { 'background-color': "transparent;" },
        items: [
          { xtype: "global-cdl-cards-dashboard-gridord-grid", itemId: "gridOrder", bind: { store: '{storeOrd}', } }
        ]
      },
      {
        xtype: 'fieldset', collapsible: false, collapsed: false,
        title: `<span style="color: black;font-weight:bold">${Locale.t("prd.forms.cdl.cards.dashboard.props.title")}</span>`,
        style: { 'background-color': "transparent;" },
        items: [
          { xtype: "global-cdl-cards-dashboard-gridprops-grid", itemId: "gridProps", bind: { store: '{storeProps}', } }]
      }
    ])

    this.callParent(arguments)
  },

  onOpenOrder: function (view, rowIndex, colIndex, item, opt, record) {
    let me = this,
      itemId = record.data.id,
      tab = me.form.child('#' + itemId);

    if (tab) {
      me.onClickCard({ posizione: itemId });
      me.form.setActiveItem(tab);
      return true
    }
    // avvio apertura card completamento invio proposta
    let newOrd = {
      posizione: itemId,
      backgroundColor: "LightBlue",
      card: Ext.create("prd.forms.cdl.cards.order.Panel", {
        posizione: itemId,
        itemId: itemId,
        customPanel: me.customPanel,
        valori: {
          record: record.data,
          globalUrl: me.globalUrl
        }

      }),
      btn: {
        xtype: "splitbutton",
        text: record.data.order,
        iconCls: "fas fa-tools",
        posizione: itemId,
        ui: 'green',
        handler: "onClickCardOrd",
        enableToggle: true,
        userCls: 'y-arrow-button-right',
        listeners: {
          arrowclick: "onClickCardOrdClose"
        }
      }
    }

    newOrd.card.on("closePanel", "onClickOrdClose");
    //Aggiungo cards

    me.toolBarCard.add(newOrd.btn)
    me.listForms.push(newOrd)

    me.form.add(newOrd.card);
    me.form.setActiveItem(newOrd.card);
    me.onClickCard({ posizione: itemId });
  },

})