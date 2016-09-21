# Co je nutno se naučit?
* config
    * user
    * line endings
* branche
    * local
    * remote
* remote
* stash (PhpStorm/IDEA - Shelve)
* merge
* rebase
* checkout
* .gitignore
* tag

-----
## Git Config

### User
Konfigurace jména a emailu uživatele 

Pro aktuální složku s projektem
```
git config user.name "Vase Jmeno"
git config user.email "nekdo@neco.at"
```

Globálně
```
git config --global user.name "Vase jmeno"
git config --global user.email "nekdo@neco.at"
```

### Line endings

CRLF \r\n - Win

LF \n - Linux/OSX

CR \r - Old OSX

#### Windows
> Pro windows neutno udržet LF pomocí nastaveného gitu + případně editrconfigem

Příkaz pro git pro LF
```
git config --global core.autocrlf false
```

#### Linux/OSX
Auto - výchozí stav LF


## Branche
> Větve

### Local
> Vaše lokální branche, které máte jen vy 

### Remote
> Server větve, které mají ji všichni

## Remote
> Vzdálený server z kterého se získávají remote branche

## Stash
> 

TODO @petr
