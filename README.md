# guess-webpack-starter         

[guess-js/guess: Libraries & tools for enabling Machine Learning driven user-experiences on the web](https://github.com/guess-js/guess) を Client JavaScript として使用するためのリポジトリです。           

Build 後の JavaScript サイト上で読み込むと、guess-js によるコンテンツの先読みを行います。      
Frontend の JavaScript が薄いサイトで、このリポジトリを clone、build し生成した JavaScript を使うことを想定しています。      

-------------------------------------------------
## Getting started

### git clone    
```console
git clone https://github.com/kemsakurai/guess-webpack-starter.git
rm -Rf .git
```

### Setup         

* **インストール**   
```console
npm install
```

* **コマンド一覧**    
```console
$ npm run
Lifecycle scripts included in guess-webpack-starter:
  test
    test

available via `npm run-script`:
  build:dev
    webpack-cli --mode development
  build:prod
    webpack-cli --mode production
```

* **webpack.config.js の VIEW ID の設定**    
webpack.config.js の GA: '103185238' に取得対象の Googlle Analytics プロパティの VIEW ID を設定します。    
```javascript
new GuessPlugin(
    { GA: '103185238',
      debug: true,
      runtime: {
        basePath: '',
        // true > PrefetchPlugin 、false > PrefetchAotPlugin の切替を行う
        delegate: true,
        // 回線ごとの閾値の指定
        prefetchConfig: {
            '4g': 0.15,
            '3g': 0.25,
            '2g': 0.45,
            'slow-2g': 0.6
        }
      }
    })
```

### Generate `guess-bundle.js`    

* **プロダクションビルド**   
```console
npm run build:prod
```
これで dist フォルダ 直下 に 圧縮された `guess-bundle.js` が生成されます。          


* **ディベロッパービルド**   
```console
npm run build:dev
```

これで dist フォルダ 直下 に 非圧縮の `guess-bundle.js` が生成されます。          

-------------------------------------------------
## Google Tag Manager で 読み込み           
HTMLカスタムタグで、以下のようなタグを作成し、`ページビュー` トリガーでタグを発火させます。      
```console
<script type="text/javascript" async src="guess-bundle.js"></script>
```
これで、DOMContentLoaded のタイミングで次に遷移する確率が高いページを先読みします。            

-------------------------------------------------
## GuessPlugin 設定例                             
以下にGithub 上で見つけた設定例を記載します。      

* **reportProvider の設定例**     
```javascript
mix.webpackConfig({
    plugins: [
        new GuessPlugin({
            reportProvider() {
                return Promise.resolve(JSON.parse(readFileSync('./guess-routes.json')))
            }
        })
    ]
})
```
[Cannot read property 'guess' of undefined · Issue #83 · guess-js/guess](https://github.com/guess-js/guess/issues/83)     

* **routeFormatterの設定例**    
```javascript
    new GuessPlugin({
      GA: '128035004',
      period: {
        startDate: new Date('2016-1-1'),
        endDate: new Date('2018-2-24')
      },
      routeProvider() {
        return parseRoutes('.');
      },
      runtime: {
        delegate: false
      },
      routeFormatter(r) {
        return r.replace(/^\/app/, '');
      }
    })
```
[guess-js-react-demo/webpack.config.prod.js at master · mgechev/guess-js-react-demo](https://github.com/mgechev/guess-js-react-demo/blob/master/config/webpack.config.prod.js)     

-------------------------------------------------
## License
MIT    

