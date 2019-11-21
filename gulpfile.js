
var concat = require('gulp-concat');
const { src, dest, parallel, series } = require('gulp');
let uglify = require('gulp-uglify-es').default;
const { watch } = require('gulp');


function watchFiles(){
    watch("./src/*.js", parallel(buildMainBundle, buildEditorBundle));
}

function buildMainBundle(){
    return src(['src/*.js', '!src/editor.js'])
    .pipe(concat('bundle.main.js'))
    .pipe(uglify())
    .pipe(dest('dist/'))    
}

function buildEditorBundle(){
    return src(['src/editor.js', 'src/enums.js', 'src/textureLoader.js', 'src/utils.js'])
    .pipe(concat('bundle.editor.js'))
    .pipe(uglify())
    .pipe(dest('dist/'))    
}

exports.default = series(buildMainBundle,buildEditorBundle,watchFiles);
