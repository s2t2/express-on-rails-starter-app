# Working with Flash Messages

```` html
<div id="messages">
  <ul class="error">
    <li>Couldn't find Robot #46</li>
    <li>Couldn't find Robot</li>
  </ul>
  <ul class="info">
    <li>Couldn't find Robot INFO</li>
  </ul>
  <ul class="success">
    <li>Found find Robot SUCCESS</li>
  </ul>
</div>
````

`messages()`:

```` js
function(template, locals) {
    var flash = req.flash(),
        types = Object.keys(flash),
        output = '';

    if (types.length) {
        if (template) {
            locals = locals || {};
            locals.messages = flash;
            res.render(template, locals, function(err, html) {
                if (html) {
                    output = html;
                }
            });
        } else {
            var buf = [];
            buf.push('<div id="messages">');
            types.forEach(function(type) {
                var msgs = flash[type];
                if (msgs) {
                    buf.push(' <ul class="' + type + '">');
                    msgs.forEach(function(msg) {
                        buf.push(' <li>' + msg + '</li>');
                    });
                    buf.push(' </ul>');
                }
            });
            buf.push('</div>');
            output = buf.join('\n');
        }
    }
    return output;
}
````
