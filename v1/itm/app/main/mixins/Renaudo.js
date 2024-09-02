Ext.define('renaudo_itm.main.acrolcar.Controller', {
  mixinId: 'mainControllerRenaudo',


  rnd_onAfterRenderNext: function () {
    let vm = this.getViewModel()

    // Gestione tasto preview image

    vm.set('hiddenImage', Ext.global.Vars.confMod.grids.articoli_sito.preview)
    this.previewImg = Ext.create("Ext.Img", {
      flex: 1,
      heigth: 250,
      padding: 10,
      layout: 'fit',
      hidden: true,
      bind: {
        hidden: '{hiddenImage}'
      },
      src: ''
    })
    if (this.west.down('#topMenu')) {
      this.west.down('#topMenu').addDocked(this.previewImg)
    }
  },
  rnd_onitemclick: function (pnl, node) {
    if (node.data.itemId === 'articoli' || node.data.itemId === 'articoli_sito' || node.data.itemId === 'articoli_media') {
      this.rnd_onItemClickArticoli(pnl, node)
    }
    if (node.data.itemId === 'attributi') {
      this.rnd_onItemClickAttributi(pnl, node)
    }
    this.previewImg.setSrc('')

    let tab = this.panelCenter.child('#' + node.data.itemId);
    if (tab) {
      if (node.data.days) {
        let title = `Nuovi articoli, ultimi ${node.data.days} giorni`;
        tab.fireEvent('alterTitle', title);
      }
    }
  },
  rnd_onItemClickArticoli: function (pnl, node) {
    // Gestione apertura sub menu
    let me = this;
    let tab = me.panelCenter.child('#' + node.data.itemId);
    if (node.data.id_stato) {
      tab.fireEvent('addFilterStato', node);
    }
    if (node.data.id_media) {
      tab.fireEvent('addFilterMedia', node);
    }
    if (this.firstOpenSub) {
      if (!Ext.global.Vars.confMod.main.subMenu || Ext.global.Vars.confMod.main.subMenu === '') {
        Ext.global.Vars.confMod.main.subMenu = 'ALL';
      }

      let rootNode = pnl.node.findChild(node.data.itemId);
      if (rootNode && rootNode.data && rootNode.data.children) {

        let item = rootNode.childNodes.filter(el => el.data.id_stato === Ext.global.Vars.confMod.main.subMenu)
        if (item.length === 1) {
          if (item[0].data.id_stato !== node.data.id_stato) {
            let title = Locale.t('itm.grids.articoli.title');
            if (item[0].data.id_stato !== 'ALL') {
              title += ` [<i>${item[0].data.text}</i>]`
            }
            pnl.getSelectionModel().select(item[0], false);
            tab.fireEvent('alterTitle', title);
          }
        }

        let itemMedia = rootNode.childNodes.filter(el => el.data.id_media === Ext.global.Vars.confMod.main.subMenu)
        if (itemMedia.length === 1) {
          if (itemMedia[0].data.id_media !== node.data.id_media) {
            let title = Locale.t('itm.grids.articoli_media.title');
            if (itemMedia[0].data.id_media !== 'ALL') {
              title += ` [<i>${itemMedia[0].data.text}</i>]`
            }
            pnl.getSelectionModel().select(item[0], false);
            tab.fireEvent('alterTitle', title);
          }
        }
      }

    } else {
      if (Ext.global.Vars.confMod.main.subMenu !== node.data.id_stato) {
        let title = Locale.t('itm.grids.articoli.title');
        if (node.data.id_stato !== 'ALL') {
          title += ` [<i>${node.data.text}</i>]`
        }
        tab.fireEvent('alterTitle', title);
        Ext.global.Vars.confMod.main.subMenu = node.data.id_stato
        this.setConfMod();
      }
    }
    me.firstOpenSub = false;
  },
  rnd_onItemClickAttributi: function (pnl, node) {
    // Gestione apertura sub menu
    let me = this;
    let tab = me.panelCenter.child('#' + node.data.itemId);
    tab.fireEvent('addFilter', node);

  },
  onTogglePreview: function (btn) {
    this.getViewModel().set('showImage', btn.pressed)

    if (btn.pressed) {
      btn.setText('Nascondi Immagine')
    } else {
      btn.setText('Visualizza Immagine')
    }
    Ext.global.Vars.confMod.grids.articoli_sito.preview = btn.pressed
    this.setConfMod()
  }
})