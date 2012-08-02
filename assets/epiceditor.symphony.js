jQuery().ready(function() {

  jQuery.expr[':'].regex = function(elem, index, match) {
      var matchParams = match[3].split(','),
          validLabels = /^(data|css):/,
          attr = {
              method: matchParams[0].match(validLabels) ?
                          matchParams[0].split(':')[0] : 'attr',
              property: matchParams.shift().replace(validLabels,'')
          },
          regexFlags = 'ig',
          regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
      return regex.test(jQuery(elem)[attr.method](attr.property));
  }

  var needsEditor = false;

  jQuery('textarea').filter(function() {
    return this.className.match(/[^\s]+markdown[^\s]+/);
  }).each(function() {
    // Get the height of the element
    $element = jQuery(this);

    var elementHeight = $element.height();
    var containerDiv = document.createElement('div');
    jQuery(containerDiv).height(elementHeight);

    $element.before(containerDiv);
    $element.hide();

    var newEditor = new EpicEditor({
      container: containerDiv,
      basePath: '/extensions/epiceditor/assets/epiceditor',
      clientSideStorage: false,
      file: {
        autoSave: false
      },
      theme: {
        editor: '/themes/editor/epic-light.css'
      }
    });


    newEditor.load();

        newEditor.importFile('contents', $element.val());
    // When it loads put the existing content in there
    newEditor.on('load', function (file) {
      $element.val(file.content);
    });

    //Everytime it's updated, update the textarea
    newEditor.on('update', function (file) {
      $element.val(file.content);
    });

  });
});
