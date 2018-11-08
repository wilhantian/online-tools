---
title: Base64 文件解码
template: page.jade
method: false
action: Download
auto_update: false
description: 在线Base64解码转源文件
keywords: Base64,online,decode,download
---
<script>
$(document).ready(function() {
  var download = $('<a class="btn btn-default" download="base64"/>').text('Download');
  download.click(function() {
    var base64Str = $('#input').val();
    download.attr('href', 'data:application/octet-stream;base64,' + base64Str);
  });
  $('#execute').replaceWith(download);
  $('.output').remove();
});
</script>
