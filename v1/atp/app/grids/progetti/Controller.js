/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('atp.grids.progetti.Controller', {
  extend: 'portal.v1.view.grids.DefaultController',
  mixins: ['portal.v1.global.Util'],
  alias: 'controller.v1-atp-grid-progetti',
  requires: [
    'Ext.grid.column.Action',
    'Ext.grid.column.Date',
    'atp.forms.progetti.Panel',
    'Ext.data.proxy.Rest'
  ],
  init: function () {
    //gestione menu
    this.listBtnTop = [
      { handler: 'reloadGrid', iconCls: ' pictos pictos-refresh' }
    ]

    if (this.checkRuoli(['99', "10"])) {
      this.listBtnTop.push(
        {
          tooltip: Locale.t('atp.grids.projects.btn.new.tooltip'),
          text: Locale.t('atp.grids.projects.btn.new.text'),
          ui: 'green',
          iconCls: 'x-fas fa-plus',
          handler: 'onNew'
        }
      );
    }
    this.callParent(arguments)
  },
  onNew: function () {
    let view = this.getView().view; //view della grid
    let NewRecord = Ext.create('atp.grids.progetti.Model', {
      id: bdFunctions.bpRandomString(32),
      isnew: 1
    });
    this.createForm(view, NewRecord, 1);
  },
  createForm: function (view, record, isnew) {
    let itemId = 'f' + record.data['id'];
    if (this.getView().fireEvent('checkForm', itemId)) {
      return
    }
    this.getView().fireEvent('createTab', Ext.create('atp.forms.progetti.Panel', {
      itemId: 'f' + record.data['id'],
      record: record,
      storeForm: view.getStore(),
      valori: {
        id: record.data['id'],
        isnew: isnew
      }
    }), view)
  },

  onafterrendergrid: function (grid) {
    grid.myColumns = [
      {
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        resizable: false,
        dataIndex: 'action1',
        items: [
          {
            handler: 'onOpen',
            iconCls: 'x-fas fa-eye',
            tooltip: Locale.t('global.btn.open.text')
          }
        ]
      },
      {
        text: Locale.t("atp.grids.projects.columns.title"),
        dataIndex: 'title',
        minWidth: 150,
        flex: 1,
        resizable: true,
        menuDisabled: true,
        sortable: false,
      },
      {
        text: Locale.t("atp.grids.projects.columns.activitytype"),
        dataIndex: 'activityType',
        minWidth: 150,
        flex: 1,
        resizable: true,
        menuDisabled: true,
        sortable: false,
      },
      {
        text: Locale.t("atp.grids.projects.columns.status"),
        dataIndex: 'status',
        minWidth: 100,
        resizable: false,
        menuDisabled: true,
        sortable: false,
        renderer: function (value, metaData, record) {
          if (value === 0) {
            return "Da fare"
          } else if (value === 10) {
            return "In corso"
          } else {
            return "Conclusa"
          }
        },
      },
      {
        text: Locale.t("atp.grids.projects.columns.progress"),
        dataIndex: 'progress',
        minWidth: 110,
        resizable: false,
        menuDisabled: true,
        sortable: false,
        renderer: function (value, metaData, record) {
          return value.toString() + "%"
        },
      },
      {
        text: Locale.t("atp.grids.projects.columns.priority"),
        dataIndex: 'priority',
        minWidth: 100,
        resizable: false,
        menuDisabled: true,
        sortable: false,
        renderer: function (value, metaData, record) {
          if (value < 4) {
            return "Bassa"
          } else if (value >= 4 && value < 8) {
            return "Media"
          } else {
            return "Alta"
          }
        },
      },
      {
        text: Locale.t("atp.grids.projects.columns.expiredate"),
        dataIndex: 'expireDate',
        minWidth: 130,
        resizable: false,
        menuDisabled: true,
        sortable: false,
        renderer: function (value, metaData, record) {
          let data = Ext.Date.format(new Date(value), "d/m/Y");
          return data
        },
      },
      {
        dataIndex: 'completed',
        width: 30,
        align: "center",
        xtype: "actioncolumn",
        resizable: false,
        menuDisabled: true,
        sortable: false,
        getClass: function (value, metaData, record) {
          let css = "bd-action-null x-fas ";
          let tdAttr = "";
          switch (value) {
            case 0:
              css += "fa-times";
              tdAttr = `data-qtip="${Locale.t("atp.grids.projects.columns.completed.no")}"`;
              break;
            case 1:
              css += "fa-check";
              tdAttr = `data-qtip="${Locale.t("atp.grids.projects.columns.completed.yes")}"`;
              break;
            default:
              break;
          }
          metaData.tdAttr = tdAttr;
          return css;
        }
      },
    ]
    this.callParent(arguments)
  }
});