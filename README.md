# Hydro-app

PWA hydro-app. The application to count how much water you drink daily.

## Website 🚀

[go to the website](https://rogreyroom.github.io/hydro-app/)

![my local storage notebook ready website screen](public/assets/images/cover.png)

## Build with

- [gulp-starter](https://github.com/rogreyroom/gulp-starter)
- [chart.js](https://www.chartjs.org/)
- [momentjs](https://momentjs.com/)

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
