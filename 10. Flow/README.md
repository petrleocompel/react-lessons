# Flow

> V následujícím příkladě je nutno nastavit Vaše IDE trochu jinak.

V ```Settings``` -> ```Languages & Frameworks``` -> ```Javascript``` nutno přepnout ```Javascript language version``` na ```Flow```

---

## Co se naučíme ? 

> Flow - typový JS 

## Co to je [```flow```](https://flowtype.org) ?

[```flow```](https://flowtype.org) alias flow type je syntaxe JS, která nám umožňuje psát typový JS a kontroluje chyby

### Příklad

## Instalace

Aby začal flow fungovat je nutno jej nainstalovat. Pro nás je ideální použít jej s Babel překladačem.

### flow-bin

Musíme nainstalovat bin soubory (ideálně globálně) pomocí npm ```npm -g install flow-bin```

### Babel-plugin

Nainstalujeme balíček pomocí npm ```babel-plugin-transform-flow-strip-types```
a přidáme plugin do .babelrc (je to json - takže přidáme do ```plugins``` další položku) ```transform-flow-strip-types```.

### .flowconfig

Aby flow fungoval správně je nutné vytvořit jeho config v rootu Vašeho npm projektu (```touch .flowconfig```)

Zde includujeme/excludujeme složky, přidáváme deklarace, options, verze atd...
Nám postačí do tohoto souboru dopsat následující

```ini
[include]
<PROJECT_ROOT>/src/.*
```

Tetno config zařídí že naše složka ```src``` bude kontrolována pomocí flow

Více [zde](https://flowtype.org/docs/advanced-configuration.html)

### @flow

Nyní nám flow již skontroluje projekt ale zatím kontroluje jen jednoduché chyby zda neexistují a máme možnost psát typově.
Avšak pro zapnutí kontroly typovosti je nutno do souborů (ideálně na začátek), které chceme kontrolovat přidat komentář a v něm anotaci
```
// @flow
```

Také lze zapnout tzv. ```weak mode``` a to že do anotace na konec přidáme slovo ```weak```. Jedná se o slabší kontrolu.

```
// @flow weak
```

Více o ```weak mode``` [zde](https://flowtype.org/docs/existing.html#weak-mode)

## Spuštění

Jak spustit flow

* npm
* v editoru

### NPM

Jednoduše si do npm přidáme script

```json
{
  "scripts": {
    "flow": "flow; test $? -eq 0 -o $? -eq 2",
    ...
  }
  ...
}
```

A následně jej spusítme ```npm run-script flow``` nebo ```npm run flow```
 
### V editoru

Bohužel pokud používáte PhpStorm/IDEU či jiný JetBrains program nebudete nadšeni. JetBrains umí flow syntaxy ale nikoliv flow kontrolu.

Takže doporučuji se podívat na editor [Nuclide](https://nuclide.io/) od Facebooku alias předělaný [Atom](https://atom.io/) od GitHubu.

Nuclide přímo obsahuje kontrolu flow a inline je zobrazuje viz ukázka.
![Inline error](https://nuclide.io/static/images/docs/language-flow-code-diagnostics.png)
![Tooltip error](https://nuclide.io/static/images/docs/language-flow-code-diagnostics-gutter.png)

## Psaní flow syntaxe

Flow kontroluje

* datové typy proměných
* funkcí
    * vstup
    * výstup
* objekty
* třídy
* properties
* další...

### Základní datové typy


#### primitives

> Primitivný datové typy

* boolean
* number
* string
* null
* void

##### void

> Nic

Datový typ nic. např.: Funkce nic nevrací - Jako v ```Java```

##### number

> Číslo

V JS je číslo bráno jako jakékoliv číslo tzn. nerozlišujeme float,int další...

#### any

> Cokoliv - Je předkem všech.

Opravdu tento datový typ říká že se za ním může skrývat cokoliv. Od objektů přes number a stringy po null.

#### mixed

> Mix

Tento datový typ je podobný jako datový typ ```any``` avšak jení rodičem ostatních datových typů jako ```any```.

Takže tento datový typ je velmi otravný pokud jej použijete. Jelikož nefunguje s žádným jiným.

#### literal

> Výčet

datový typ bude roven jedné hodnotě z výčtu. Ve výčtu mohou být stringy, number a boolean

#### Další

Více datových typů naleznete [zde](https://flowtype.org/docs/quick-reference.html)

### Syntaxe

Klasicky napsaná metoda JS vypadá takto

```javascript
function vratDvojnasob(cislo) {
    return 2*cislo;
}
```

Když přidáme flow

```javascript
// @flow

function vratDvojnasob(cislo: number) : number {
    return 2*cislo;
}
```

Syntaxe je v podstatě jednoduchá

```javascript
// při deklaraci proměné
let nazevPromene : datovyTyp;
// návratová hodnota funkce
() : datovyTyp => {};
(o: datovyTyp) : datovyTyp => {};
function q() : datovyTyp {};
function m(o: datovyTyp) : datovyTyp {}; 
```

V případě složitějších datových typů máme delší syntaxe

#### Objekty

Objekty lze psát vícero způsoby

```javascript
// v prom bude minimálně prádný objekt
let prom : {};
// v prom2 bude minimálně objekt s klíčem q na kterém bude string
let prom2 : {q : string};
// v prom3 bude objekt a v něm další objekt na klíči n
let prom3 : {n: {}};

// v prom4 bude obecný objekt může obsahovat n klíčů - nebudeme validovat přístup na klíče
let prom4 : Object;
```

Pokud je objekt definován pomocí ```{}``` bude flow kontrolovat zda jsou všechny klíče na které přistupujeme definované.

Pokud je objekt definován jako ```Objekt``` nebudeme kontrolovat přístup.

#### Pole

Pole lze psát také vícero způsoby

```javascript
// v prom bude pole čísel
let prom : number[];
// v prom2 bude pole čekoholiv
let prom2 : any[];
// v prom3 pole stringů
let prom3 : string[];

// v prom4 bude pole typu number u kterého flow nebude kontrolovat hustotu - očekává že nebudou vynechávány indexy
let prom4 : Array<number>;
```

##### Pole jako mapa

```javascript
// mapa string => int
let coolRating: {[id:string]: number} = {};
coolRating["sam"] = 10; // Yes, it's a 0-10 scale.
```

#### Tuples
> Druh pole s ruznými datovými typy

```javascript
// v tuple bude na indexu 0 string 1 nubmer 2 boolean
let tuple: [string, number, boolean] = ["foo", 0, true];
```

#### Třídy

```javascript
class MyClass {}
let myInstance: MyClass = new MyClass("foo");
```

#### Funkce

> Datový typ funkce

```javascript
// anyFunction je funkce
let anyFunction: Function = () => {};
anyFunction("foo", "bar"); // OK

// const a vrací funkci která vrátí funkce která vrátí string
const a: Function<Function<string>> = () : Function<string> => () => ("a")
```

#### ```?``` maybe

> Nejistý datový typ

Pokud jsi nejste jisti co daná proměná bude obsahovat - ale víte že by to měl být string ale může být null stačí dopsat ```?```

```javascript
// a bude obsahovat string nebo null
let a : ?string = null;

// před přístupem nutno zkontrolovat
// pozor - nutno použít == pokud by jsme použili === a byl by undefined tak by zůstal undefined tudíž by nastala chyba
if (a == null) {
  a = 'hello';
}
console.log(a.length);
```




