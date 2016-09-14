# Co je nutno se naučit?
* Rozdíl Node.js a NPM
    * Node.js
    * NPM
        * Skripty NPM
            * Napsání vlastního skriptu
* Webpack
* Babel
* ES6



## Node.js a NPM
### NPM = balíčkovací systém nodejs
- získávání modulů k použití
- aktualizace
- vedení informací o:
  - vlasním projektu
  - autorovi
  - závislostech
  - vývojových závislostech
  - tzv. peer závislostech (to co musí splňovat projekt, který používá Váš modul)
  - skriptech
  - nastaveních různých nátrojů
  - A jiné...

### Node.js

>  Node.js je „evented I/O framework for V8“, což si můžeme volně představit jako engine V8, rozšířený o funkce, které umožňují prováděným skriptům přistupovat k souborům či síťovým funkcím. Což v praxi znamená, že můžeme vytvořit server, který „naslouchá“ na určeném portu téměř stejným způsobem, jakým vytváříme například obslužné metody pro události v prohlížeči.

### NPM ```package.json```

package.json není nic jiného než skutečně JSON soubor s pár řádky informací co má NPM dělat.

> Co jste čekali ? :blush: :| :grin:

Jeho strukturu najdete např.: [http://browsenpm.org/package.json](http://browsenpm.org/package.json) v interaktivní formě

### Skripty NPM

V hlavním NPM souboru Vašeho projektu (což je soubor package.json) najdeme sekci "sripts"
```js
{
  "scripts": {
    "dev": "webpack-dev-server --progress --colors --hot --inline --port 3000"
  },
  ....
}
```

> Pro spuštění skriptu píšeme příkaz ```npm run nazevSkriptu```

Váš skript není nic jiného než vložená řádka do příkazové řádky. Jako kdyby jste napsali tuto řádku do terminálu.

Náš hlavní spouštěcí script je a bude vždy ```dev``` pro spuštění webpack-dev-serveru.

#### Vlastní script

Jednoduchý důvod proč si napsat vlastní script.

> Možnost spustit ```npm install```(nebo ```npm update```) a ```npm run dev``` naráz např.: script start

```
"start": "npm install && npm run dev"
```

### Best practicies (NPM)

#### Lenost

> NPM Vám umožní být líní 

NPM dovolí spouštět příkazy jako ```npm i```, ```npm un```, ```npm up```, ```npm v``` a dalsí...

Když prozkoumáte help NPM zjistíte, že jsou to pouze zkrácené příkazy
* i -> install
* un -> uninstall
* up -> update
* run -> run-script

a další...

#### Run Script ```start```

V NPM existuje možnost spustit script s názvem ```start``` příkazem ```npm start```

## Webpack

> Webpack je tzv. module bundler neboli zabalovač - zabalíme s ním různé moduly js, css, obrázků a dalších podle našeho nastavení

### Proč používáme Webpack ?
Webpack nám všechny naše less, scss, sass, css, js a jsx soubory podá v takovém formátu jakém chceme. 
Například pro použití ES6 syntaxe Javascriptu musíme použít nějaký překladač (Babel), pro less zase less překladač atd...
Webpack tyto překladače umí používat jako loadery :blush: a proto se nám krásně hodí pro všechny.

### Loaders

> Loadery slouží k načtení obsahu, zpracování a jeho následnému zabalení.

Například sass-loader načte SCSS transformuje jej do CSS a pošle k zabalení.

### Webpack dev server

> Webpack vývojový server slouží pro vývoj - zpřístupní například funkci "hot module replacemenet" či source-maps 

### Webpack config (Dev config)

```javascript
var path = require('path'); // Node.js - path
var webpack = require('webpack'); // Modul webpack

process.env.BABEL_ENV = 'development'; // Nastavení BABEL_ENV (o babel budeme mluvit později)
process.env.NODE_ENV = 'development'; // Nastavení NODE_ENV - Node environment - prostředí node - vývoj / produkce 

module.exports = { // Export nastavení
    devtool: '#eval-source-map', // Nastavení použité source mapy - chceme evalovanou source mapu
    entry: [ // Vstupní body Wepacku
        'webpack-dev-server/client?http://localhost:3000', // Vstupní bod - Dev server pro webpack hot module replacement 
        'webpack/hot/only-dev-server', // Samožný hot module replacement (od ted již budu psát jako HMR)
        './src/index' // Vstupní bod naší aplikace
    ],
    debug: true, // Zapnutí debug
    output: { // Výstup - kam se má zabalit naše aplikace
        path: path.join(__dirname, 'dist'), // cesta: __dirname = aktuální složka + join dist = ./dist/
        filename: 'bundle.js', // soubor: 'nasNazvanySoubor.js' 
        publicPath: 'http://localhost:3000/dist/' // veřejnáCesta: adresa s portem a složkou
    },
    historyApiFallback: true, // zachováváme zatím staré možnosti nastavení
    plugins: [ // pluginy
        new webpack.optimize.OccurenceOrderPlugin(), 
        // new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({ // Plugin pro definici globálních proměnných
            __DEVTOOLS__: true,
            __SHOW_DEVTOOLS__: false
        })
    ],
    resolve: { // Vyřeší
        extensions: ['', '.js', '.jsx'] // koncovky .js a .jsx a také prázdné  
    },
    module: { // Moduly 
        loaders: [ // Loadery
            {test: /\.css$/, loader: "style-loader!css-loader"}, // CSS loader - vloží se do app jako inline styl
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"}, // Less loader - stejně jako css ale ještě projde předtím less kompilací
            {test: /\.gif$/, loader: "url-loader?mimetype=image/png"}, // odkazový loader png
            {test: /\.png$/, loader: "url-loader?mimetype=image/png"}, // odkazový loader gif
            {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"}, // odkazový loader font
            {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]"}, // odkazový loader font
            { // Babel Loader pro transformaci jsx do js
                test: /\.jsx?$/,
                loaders: ['babel-loader'], // Babel loader respektuje vždy soubor .babelrc umístěné ve stejné složce nebo konfiguraci umístěnou v package.json
                exclude: /node_modules/ // Exclude - co se nebude procházet pro kompilaci
            }
        ]
    }
};
```

> Tato nastavení v 70% kopírujeme, přeházíme pár loaderů a pluginů. Většinově nastavení webpacku pouze udržujeme.
> Není nutné vždy znát každou řádku konfigurace, ale je nutné umět vyřešit nastalé problémy. :blush:

## Babel

> Babel je překladač novější syntaxe js do starší.

!!! V našem případě - Aby se dalo rozeznat soubory s novější a starší syntaxí používáme pro novější syntaxi koncovku ```jsx```. !!!
!!! koncovka JSX může v praxi znamenat pouze syntaxi specifikace JSX (např.: od [facebooku](https://facebook.github.io/jsx/)) !!!
!!! V mé ukázce ji používám i jako znamení pro ES6 !!!

I facebook má draft specifikaci pro [jsx](https://facebook.github.io/jsx/)

!!! Pozor JSX není ES6 - ale babel umí kombinovat tyto syntaxe !!!

### .babelrc

> .babelrc je soubor umístěný v projektu, který definuje jaké syntaxe, transformace a pluginy budou použity pro překladač
> (tento konfig může být také schován v package.json)

.babelrc je v podstatě opět json (komentáře u json souborů neexistují tak pokud můj config použijete prosím vynechte je)

V ukázkách používám babel ve velkém

Náš config 
```javascript
{
  "presets": [ // presety - syntaxe
    "react", // react - jsx
    "stage-0", // stage 0
    "es2015" // standardní es2015
  ],
  "plugins": [ // 
    "transform-object-rest-spread", // naše oblíbené ... - nutno použít plugin aby fungovali
    "transform-class-properties" // všechny property třídy
  ]
}
```
Díky tomuto configu máme možnost používat spoustu nových funkcí.

## ES6 (ECMAScript 6)

> ES6 specifikace - final z června 2016 - Standard

Novinky a vlastnosti nalezneme zde [es6-features.org](http://es6-features.org/)

Ale základ zde také popíšu

### Const a let
#### Const

> Konstanta

* po přiřazení hodnoty do konstanty je trvalé a nelze již znovu nadefinovat
* funguje per block kódu - pouze v dané sekci od ```{``` do ```}```
* v budoucnu by měla být rychlejší než ```var```
#### Let

> Proměnná

Let slouží jako deklarace blokové lokální proměnné a popřípadně i s její inicializací.

* funguje per block kódu - pouze v dané sekci od ```{``` do ```}```
* lze znovu použít

O letu se lze dočíst více zde na [MDM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) a to včetně vysvětlení blokového zaměření.

#### Best practicies (const, let)
##### Bloky

> u const a let je nutno brát na pamět že nefungují mimo svůj blok kódu

```javascript
const a = 2;
let b = 3;
var c = 4; 
{// Blok kódu
    const a = "a"; /// nová konstanta a v tomto bloku kódu
    let b = "b"; /// nová konstanta b v tomto bloku kódu
    var c = "c"; /// stejná jako c deklarované nahoře -- Var není blokové
} // konec bloku kódu
console.log(a,b,c);//// a = 2, b = 3, c = "c"
```

> var není blokové ale globální = Zlé... proto se snažíme var vymítit

---

##### ```{}``` a ```[]``` v konstantě

> objekt a pole pokud je v konstantě můžeme do pole či do objektu stále ukládat a přidávat či odebírat

```javascript
const a = {}
a.q = 5;
const b = [];
b[0] = 5;
b.push(12);
```
Všechny operace jsou v pořádku.

> Konstanta odkazuje na referenci kde pole/objekt je uloženo. Neřeší jeho vnitřní hodnotu.

### ```...``` spread

> Object / literal spread - rozpad objektu/pole

Tuto funkci je nejlepší ukázat na examplu 
```javascript
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2); // toto má stejný význam jako arr1.push(3,4,5);

/// výsledný objekt bude tedy vypadat takto
console.log(arr1) // [0,1,2,3,4,5]
```
Stejně tyto 3 tečky fungují i na objektu
```javascript
let obj1 = {a: 1, b: 2, c: 3};
let obj2 = {d: 4, e: 4, f: 5};
let obj3 = {
    ...obj1,
    ...obj2
};
// výsledek - objekt 3 přebírá vlastnosti obj1 a obj2
console.log(obj3); // {a: 1, b: 2, c: 3, d: 4, e: 4, f: 5}
```

> Nejlepší uplatnění najdeme v Redux storech jelikož ```...``` neodkazují na původní hodnoty ale na nové okopírované hodnoty

### ```() => {}``` a ```() => ()```

> Jsou to zkráceně funkce

#### ```() => {}```

> funkce, která zpouští kód - lze vyvolat return aby vrátila hodnotu

```javascript
const fukce1 = (param1) => { /// definice funkce do konstanty funkce1
    console.log("ahoj", param1);
    return true;
}

const vysledek = funkce1("Studenti"); // spuštění funkce vrátí do proměnné
console.log(vysledek) /// je true
```

#### ```() => ()```

> funkce, která ihned vrátí výsledek (pozor nemusí mít ani závorky)

```javascript
// definice funkce a její následné okamžité spuštění pomocí (2) výsledek se uloží do funkce2
const fukce2 = (param1) => (param1 + 3)(2);  
const fukce3 = (param1) => param1 * 15; // definice funkce do funkce3 - bez závorek

const vysledek = funkce3(1); // spuštění funkce vrátí do proměnné
console.log(funkce2) /// výsledek se uložil přímo do funkce2 a je 5
console.log(vysledek) /// výsledek funkce 3 je 15
```

# That's all the folks !!! :blush:
