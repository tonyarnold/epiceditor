/*global EpicEditor marked */

jQuery(document).on('ready', function () {
  var $ = jQuery;
  var editors = [];
  var fields = $('.field').filter(function (i, el) {
    return $(el).find('textarea').hasClass('markdown');
  });

  fields.each(function (i, el) {
    el = $(el);
    var container = $('<div>');
    var textarea = el.find('textarea.markdown');

    el.addClass('field-epiceditor');
    container.addClass('epiceditor-instance');
    container.css({
        height: textarea.height()+20
    });
    textarea.css({display:'none'});

    el.append(container);

    var editor = new EpicEditor({
        container: container[0]
      , basePath: '/extensions/epiceditor/assets/epiceditor'
      , clientSideStorage: false
      , localStorageName: 'epiceditor'
      , parser: marked
      , file: {
            name: 'epiceditor'
          , defaultContent: ''
          , autoSave: 100
        }
      , theme: {
            base:     '/../epiceditor.symphony.base.css'
          , preview:  '/../epiceditor.symphony.preview.css'
          , editor:   '/../epiceditor.symphony.editor.css'
        }
      , focusOnLoad: false
      , shortcut: {
            modifier: 18
          , fullscreen: 70
          , preview: 80
          , edit: 79
        }
    });


    editor.on('load', function () {
      var preview = $(editor.previewerIframeDocument.body);
      var editord = $(editor.editorIframeDocument.body);
      preview.on('click', function (e) {
        editor.edit();
      });

      editor.on('fullscreenenter', function () {
        preview.off('click');
      });

      editor.on('fullscreenexit', function () {
        preview.on('click', function (e) {
          editor.edit();
        });
      });
    });
    

    editor.on('update', function () {
      textarea.val(editor.exportFile());
    });

    editor.load();
    editor.importFile('symphony.epiceditor.contents', textarea.val());

    editors.push({
        el: el
      , textarea: textarea
      , editor: editor
    });    
  });
});

