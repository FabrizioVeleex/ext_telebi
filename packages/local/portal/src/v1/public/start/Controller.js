Ext.define('portal.v1.public.start.Controller', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.panel.Panel',
    'portal.util.Functions',
    'portal.util.Locale',
    'portal.v1.view.forms.login.Forbidden'
  ],
  
  init: function () {
    this.callParent(arguments);
    Ext.enableAria = false;
    Ext.enableAriaButtons = false;
    Ext.enablePanels = false;
    
    this.qtaAvvisi = 0;
    this.qtaAzioni = 0;
    document.title = this.getViewModel().get('azienda');
    
  },
  
  
  onAfterRender: function (pnl) {
    let me = this,
      element = document.getElementById("divstart");
    
    element.parentNode.removeChild(element);
    
    //pannello info caricamento applicativo in corso
    this.openAppWaiting = Ext.create('Ext.panel.Panel', {
      layout: {
        type: 'hbox',
        align: 'center',
        pack: 'center'
      },
      bodyStyle:{
        'background-image':'url(/images/v1/default-wallpaper.jpg)'
      },
      items: [
        {
          xtype: 'panel',
          bodyStyle:{'background':'transparent'},
          width: 300,
          height: 250,
          bind: {
            html:'<div id="">' +
              '    <div class="defaultLogo" ></div>' +
              '    <div style="clear: both;"></div>' +
              '    <div style="text-align: center;"><img src="/images/64/{tag}.png" alt="#"></div>' +
              '    <div style="text-align: center;color: white;font-weight:bold;font-size:large ; ">{title}</div><hr>' +
              '    <div style="text-align: center;color: white;font-weight:bold;font-size:large ; ">{waiting}</div>' +
              '    <div style="clear: both;"></div>' +
              '</div>'
          }
        },
      ]
    })
    this.getView().add(this.openAppWaiting)
    this.getView().setActiveItem(this.openAppWaiting)
    
    //aspetto che Locale sia inizializzato
    const timer = ms => new Promise(res => setTimeout(res, ms))
    async function pollingLocale() {
      for (let i = 0; i < 10; i++) {
        if (Locale.isInit === true) {
          me.onStartApp()
          i = 11;
        } else {
          await timer(500);
        }
      }
      if (Locale.isInit !== true) {
        alert('errore caricameto dati riprovare più tardi')
      }
    }
    pollingLocale().then(r => '');
  },
  
  //avvio applicativo
  errorApplication: function (){
  
  },
  
  
  onCheckDati: function (){
    this.mainPanel.fireEvent('checkDati')
  },
  
  /* --------------------------------------------------------
   * GESTIONE LOGIN PORTALE
   * - loginApplication:
   * - checkLogin : verifico se l'utente è loggato, se si carico Backend altrimenti Login
   * --------------------------------------------------------*/
  forbiddenApplication: function (){
    this.forbiddenform = Ext.create('portal.v1.view.forms.login.Forbidden');
    this.getView().add(this.forbiddenform)
    this.getView().setActiveItem(this.forbiddenform)
  },
  onStartApp : function (){
    let me = this,
      vm = me.getViewModel()
    
    
    Ext.Ajax.on('requestexception', function (conn, response, options) {
      if (response.status === 403) {
        me.forbiddenApplication()
      }
    });
    
    Ext.global.Vars.infoUser = {}
    Ext.global.Vars.confMod = {
      forms:{},
      main:{}
    }
    Ext.global.Vars.infoApp = {
      ruoli:[],
      version:{
        num:'1.0.0',
        data:'05/05/2022'
      },
    }
    Ext.global.Vars.theme = 'default'
    
    me.startApplication('app')
    
  },
  sizeFormat: function (value) {
    return bdFunctions.sizeformat(value);
  },
});
