jQuery('#contents').ready(function() {

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

  var editorCount = 1;

  jQuery('#contents textarea').filter(function() {
    return this.className.match(/markdown/);
  }).each(function() {
    // Get the height of the element
    $element = jQuery(this);

    var elementHeight = $element.height();
    var elementIdentifier = 'symphonyepiceditor' + editorCount;
    var containerDiv = jQuery('<div id="' + elementIdentifier + '" class="symphonyepiceditor" style="height:' + elementHeight +'px;"/>');
    $element.after(containerDiv);
    $element.hide();

    var newEditor = new EpicEditor({
      container: elementIdentifier,
      basePath: '/extensions/epiceditor/assets/epiceditor',
      clientSideStorage: false,
      theme: {
        editor: '/../epiceditor.symphony.editor.css'
      }
    });

    newEditor.load();

    newEditor.importFile('symphony.epiceditor.contents', $element.val());

    //Everytime it's updated, update the textarea
    newEditor.on('update', function (file) {
      $element.val(file.content);
    });

    editorCount++;
  });
});
