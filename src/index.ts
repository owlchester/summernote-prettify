import PrettifyPlugin from './Module'

var prettify_plugin = new PrettifyPlugin({});

// add the plugin to summernote
$.extend(($ as any).summernote.plugins, prettify_plugin.getPlugin());