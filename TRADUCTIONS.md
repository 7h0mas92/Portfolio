# Système de Traduction du Portfolio

## Vue d'ensemble

Le portfolio est maintenant entièrement traduit en **6 langues** :
- 🇫🇷 Français (FR)
- 🇬🇧 Anglais (EN)
- 🇪🇸 Espagnol (ES)
- 🇮🇹 Italien (IT)
- 🇩🇪 Allemand (DE)
- 🇯🇵 Japonais (JA)

## Fichiers concernés

### Pages HTML
- ✅ `index.html` - Page principale du portfolio
- ✅ `docker.html` - Page détaillée du projet Docker Laravel
- ✅ `todolist.html` - Page détaillée du projet To-Do List

### Fichiers de traduction
- ✅ `script.js` - Contient toutes les traductions et la logique de changement de langue

## Fonctionnalités

### Changement de langue
- Bouton de changement de langue dans le footer de chaque page
- Cycle automatique à travers les 6 langues
- Icône de drapeau qui change selon la langue sélectionnée
- Sauvegarde de la préférence dans le LocalStorage

### Couverture de traduction

#### Page principale (index.html)
- Navigation
- Section Hero
- Section À propos
- Statistiques
- Compétences
- Projets (descriptions complètes)
- Contact
- Footer

#### Page Docker (docker.html)
- Navigation
- Hero (titre + sous-titre)
- À propos du projet (2 paragraphes)
- Objectifs (6 items)
- Fonctionnalités clés (6 cartes)
- Architecture technique (services + configuration)
- Technologies utilisées (6 items)
- Compétences développées (8 items)
- Défis relevés (6 items)
- Boutons d'action
- Footer

#### Page To-Do List (todolist.html)
- Navigation
- Hero (eyebrow + titre + lead)
- Contexte & Vision (2 paragraphes)
- Fonctionnalités (6 cartes)
- Implémentation technique (architecture + stack)
- Fonctionnalités détaillées (4 items timeline)
- Défis techniques (4 items)
- Solutions apportées (4 items)
- Apprentissages & Évolutions (2 paragraphes)
- Boutons d'action
- Footer

## Clés de traduction

### Structure
Toutes les traductions sont organisées par préfixe :
- `nav_*` - Navigation
- `hero_*` - Section Hero
- `about_*` - Section À propos
- `stat_*` - Statistiques
- `skills_*` - Compétences
- `projects_*` - Projets
- `contact_*` - Contact
- `footer_*` - Footer
- `docker_*` - Page Docker
- `todo_*` - Page To-Do List

### Total des clés
- Environ **250+ clés de traduction**
- **1500+ chaînes traduites** (250 clés × 6 langues)

## Utilisation

### Pour ajouter une nouvelle traduction

1. **Dans le HTML** : Ajouter l'attribut `data-translate` avec la clé
```html
<h2 data-translate="ma_cle">Texte par défaut en français</h2>
```

2. **Dans script.js** : Ajouter la traduction pour chaque langue
```javascript
// Dans l'objet translations
fr: {
    ma_cle: "Mon texte en français"
},
en: {
    ma_cle: "My text in English"
},
// ... etc pour es, it, de, ja
```

### Pour changer la langue par défaut

Modifier la variable dans `script.js` :
```javascript
let currentLanguage = localStorage.getItem('language') || 'fr'; // Changer 'fr' par la langue souhaitée
```

## Notes techniques

- Le système utilise `localStorage` pour persister la préférence de langue
- Les traductions sont appliquées dynamiquement via JavaScript
- Tous les éléments avec `data-translate` sont automatiquement mis à jour lors du changement de langue
- Le système supporte également les placeholders de formulaires via `data-translate-placeholder`

## Maintenance

Pour maintenir le système de traduction :
1. S'assurer que toute nouvelle clé est traduite dans les 6 langues
2. Vérifier que les attributs `data-translate` sont présents sur tout nouveau contenu textuel
3. Tester le changement de langue sur toutes les pages après modifications
4. Garder la cohérence dans la nomenclature des clés (préfixes par page/section)
