# gulp-starter

## Build with

The project is built with the use of the _gulp_ task runner.

The gulp configuration uses [babeljs](https://babeljs.io/) for ES6 and the new [gulp4](https://gulpjs.com/) syntax. It also uses [browser sync](https://www.browsersync.io/) to watch changes in your files and updating connected browsers.

It contains:

- gulp
- gulp-babel
- gulp-sass
- gulp-autoprefixer
- gulp-concat
- gulp-uglify
- gulp-rename
- gulp-imagemin
- gulp-sourcemaps
- gulp-clean-css
- del
- browser-sync

## Using gulp

- development - run `gulp` or `npm start`
- production - run `gulp build` or `npm build`
- deployment - follow deploy section

## Deploy

To deploy public folder to **gh-pages** brunch

```git
> git checkout gh-pages
> git checkout [master/feature-branch] -- 'public/**'
> git rm -f -r --ignore-unmatch ./**
> git mv -f public/** ./
> git commit . -m "build: website deploy `date +\"%Y-%m-%d\"`"
```

## Version

v.1.0.0

## Author

Robert Adamczewski

## License

This project is licensed under MIT License - see the [LICENSE.md](./LICENSE.md) file for details.
