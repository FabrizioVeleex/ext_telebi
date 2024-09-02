/**
 * Created by fabrizio on 19/02/17.
 */
Ext.define('recpub.view.form.resi.MainController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainresi',
  requires:[
    'recpub.view.form.resi.resi.Panel',
    'recpub.view.form.resi.nuovo.Panel',
    'recpub.view.form.resi.dettaglio.Panel'
  ],
  /**
   * Called when the view is created
   */
  init: function() {
  
  
  },
  onAfterRender:function(){
    this.resi = Ext.create('recpub.view.form.resi.resi.Panel',{
      scrollable: true,
      scope:this
    });
    
    this.resi.on('onNewPratica',this.onNewPratica,this);
    this.resi.on('onDettaglioOpen',this.onDettaglioOpen,this);
    this.getView().add( this.resi);
    this.getView().setActiveItem(this.resi);
  },
  onDettaglioOpen:function (id) {
    let dettaglio = Ext.create ('recpub.view.form.resi.dettaglio.Panel',{
      idDettaglio:id,
    });
    dettaglio.on('onBtnCloseDettaglio',this.onBtnCloseDettaglio,this);
    
    this.getView().add( dettaglio);
    this.getView().setActiveItem(dettaglio);
  },
  
  onNewPratica:function () {
    let pratica = Ext.create ('recpub.view.form.resi.nuovo.Panel',{
    
    });
    pratica.on('onBtnAnnullaNewReso',this.onBtnAnnullaNewReso,this);
    
    this.getView().add( pratica);
    this.getView().setActiveItem(pratica);
  },
  onBtnCloseDettaglio: function () {
    this.getView().setActiveItem(this.resi);
  },
  onBtnAnnullaNewReso: function () {
    this.resi.fireEvent('onReloadGrid');
    this.getView().setActiveItem(this.resi);
  }
});