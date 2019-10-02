# Gulp 4 avec Webpack
Ce repo est une base optimisé des avantages de gulp et webpack réuni.

## Comment le personnaliser
Toutes les tâches se situe dans le répertoire **tasks**.<br>
Pour modifier les variables, modifier le fichier **tasks/config.js**.<br>
Pour modifier les tâches à exécuter/ fichier à observer, modifier le fichier **tasks/index.js**.<br>



## Comment l'utiliser

Télécharge les packages npm
```
npm install
```

Pour initialiser la structure, base de données et vhost (si avec wamp)
```
npm run init
```

Exécute le gulp / webpack et le serveur de développement, selon les configuration
```
npm run dev
```

Pour la mise en production.
```
npm run build
```

### Chaque tâche peut être exécuter individuellement
Pour le nettoyage des fichiers SRC
```
npm run cleanSrc
```

Pour le nettoyage des fichiers Dist
```
npm run cleanDist
```

Permet de redimensionner les iamges aux besoins selon les dimensions indiquées dans le fichier config
```
npm run resize
```

Execute seulement les fichiers JS
```
npm run js
```

Execute seulement les fichiers CSS/SCSS
```
npm run css
```


Copy les fichiers et plugins si necessaire dans le fichier dist.
```
npm run copy
```

Execute automatiquement les fichiers SQL défini dans le fichier config
```
npm run sql
```

Crée un virtual host, ainsi qu'un host pour le proxy en local //fonctionne seulement si avec WAMPServer
```
npm run vhost
```

<!--
## Test HMR
Une future version sera utiliser avec le **Hot Module Reloading**, il faudra faire switch to the `hmr` branch and run `npm install` again.

Demo is set up with **Vue**. To see it in action run `npm run dev`, open the given localhost address and change the message in `site/js/App.vue`.
The new message will be hot reloaded - no whole window refresh.
-->

