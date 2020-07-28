# Test de connaissance - React
Pour réaliser ce test, nous vous invitons à travailler sur un fork du repository. Une fois terminé, vous devrez créer une pull request vers le repo d'origine et nous prévenir par mail. N'hésitez pas à ajouter en description de la PR des informations / retours qui vous paraissent importants.

## Ennoncé du test
A partir des api disponibles sur le site [data.culture.gouv.fr][1] (nous vous conseillons d'utiliser l'[api V2][2])vous devrez créer un dashboard permettant de visualiser et interpréter les données disponibles sur les musées. Ce dashboard sera divisé en deux grandes parties : la première concernant les musées en général et la seconde spécifique à l'événement "la nuit des musées" de 2018. Les éléments qui doivent y figurer sont les suivants:

🎯 = élément requis
👍 = élément bonus

### Pour la partie liste des musées
- 🎯 Liste des musées avec leurs informations principales (nom, ville)
  + 👍 Avec une recherche par ville
  + 👍 Avec un système de pagination
- 🎯 Une page pour chaque musée (accessible depuis la liste) avec les informations détaillées
  + 👍 Avec un graph représentant l'évolution de la fréquentation

### Pour la partie nuit des musées 2018
- 🎯 Un Graph sur le nombre d'événements par ville, par région, et par département

### Autre
+ 🎯 Utiliser des styled components
+ 🎯 Utiliser des functional components et des hooks
+ 👍 Mettre en place des tests
+ 👍 Utiliser TypeScript

## A savoir
Le but de ce test et de pouvoir cerner votre niveau sur l'environement React. Des points clef comme la qualité du code, la gestion des données, l'architecture de vos fichiers et de vos components seront pris en compte. Le design que vous choisirez et la lisibilité de vos graphiques seront aussi des éléments différenciants.

Vous êtes libre d'étendre le test pour inclure d'autres librairies / éléments que vous connaissez et qui ne sont pas couvert par l'état actuel du test.

Pour l'affichage des graphiques, nous vous recommendons d'utiliser la librairie [chart.js][3] mais vous êtes libre de vous diriger vers une autre si elle vous semble plus pertinante.

Bonne chance !

[1]: https://data.culture.gouv.fr/explore/?refine.theme=Mus%C3%A9es&sort=modified
[2]: https://data.culture.gouv.fr/api/v2/console
[3]: https://github.com/chartjs/Chart.js
