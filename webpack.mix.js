const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .js('resources/js/ddm.js', 'public/js')
   .js('resources/js/selector.js', 'public/js')
   .js('resources/js/map.js', 'public/js')
   .js('resources/js/fill_table.js', 'public/js')
   .js('resources/js/load_order.js', 'public/js')
   .js('resources/js/drag.js', 'public/js')
   .js('resources/js/process_shipment.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .sass('resources/sass/rtc_scheduler.scss', 'public/css')
   .sass('resources/sass/rtc_simulator.scss', 'public/css');
