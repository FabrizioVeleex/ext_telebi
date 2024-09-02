/**
 * Created by fabrizio on 01/08/22.
 */
Ext.define("stt.view.forms.budget.cards.dettaglio.GridArticoli", {
  extend: "Ext.grid.GridPanel",
  xtype: "stt-budget-gridarticoli",
  requires: [],
  style: {
    'webkit-border-radius': '15px',
    '-moz-border-radius': '15px',
    'border-radius': '15px !important'
  },
  title: Locale.t("stt.forms.budget.dettaglio.gridarticoli.title"),
  header: {
    style: {
      backgroundColor: 'lightblue'
    }
  },
  minHeight: 400,
  maxHeight: 400,
  bind: {
    store: "{storeArticoli}",
  },
  selType: "cellmodel",

  columns: [
    {
      text: 'articolo',
      width: 150,
      dataIndex: "cd_art",
    },
    {
      text: 'descrizione',
      width: 250,
      dataIndex: "descr_art",
    },
    {
      text: 'totale',
      width: 90,
      dataIndex: "tot",
      tdCls: 'bold-column',
      xtype: 'numbercolumn', format: '0,000'
    },
    // {
    //   text: '2011',
    //   width: 70,
    //   dataIndex: "2011",
    //   xtype: 'numbercolumn', format: '0,000'
    // },
    // {
    //   text: '2012',
    //   width: 70,
    //   dataIndex: "2012",
    //   xtype: 'numbercolumn', format: '0,000'
    // },
    // {
    //   text: '2013',
    //   width: 70,
    //   dataIndex: "2013",
    //   xtype: 'numbercolumn', format: '0,000'
    // },
    // {
    //   text: '2014',
    //   width: 70,
    //   dataIndex: "2014",
    //   xtype: 'numbercolumn', format: '0,000'
    // },
    // {
    //   text: '2015',
    //   width: 70,
    //   dataIndex: "2015",
    //   xtype: 'numbercolumn', format: '0,000'
    // },
    // {
    //   text: '2016',
    //   width: 70,
    //   dataIndex: "2016",
    //   xtype: 'numbercolumn', format: '0,000'
    // },
    // {
    //   text: '2017',
    //   width: 70,
    //   dataIndex: "2017",
    //   xtype: 'numbercolumn', format: '0,000'
    // },
    {
      text: '2018',
      width: 70,
      dataIndex: "2018",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2019',
      width: 70,
      dataIndex: "2019",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2020',
      width: 70,
      dataIndex: "2020",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2021',
      width: 70,
      dataIndex: "2021",
      xtype: 'numbercolumn', format: '0,000'
    },
    {
      text: '2022',
      width: 70,
      dataIndex: "2022",
      xtype: 'numbercolumn', format: '0,000'
    },

  ],
});
