# Newsletter Analytics Engineer — Converteo Hub Tech

Newsletter mensuelle de la guild Analytics Engineering.

## Publier une nouvelle édition

**1. Modifier le contenu**

Ouvrez `data.js` et mettez à jour les champs : titre, édito, chiffres, spotlights, agenda, nouveaux arrivants…
C'est le seul fichier à toucher pour changer le contenu.

**2. Pousser en ligne**

```bash
git add data.js
git commit -m "Édition #09 — Juillet 2026"
git push
```

Le site se met à jour automatiquement en ~1 minute.

**3. Ajouter les photos**

Ouvrez le lien de la newsletter dans un navigateur et glissez-déposez vos photos directement dans les emplacements (spotlights, bienvenue, highlight).

**4. Exporter en PDF**

Ouvrez `print.html` dans votre navigateur → le dialogue d'impression s'ouvre automatiquement → choisissez **Enregistrer en PDF**.

---

## Organiser les sections

Bouton **✎ Organiser les sections** (en bas à gauche) :
- Flèches ↑↓ pour réordonner
- Œil 👁 pour masquer/afficher une section

Pour désactiver une section définitivement dans `data.js` : `"enabled": false`

## Changer le thème visuel

Bouton **⚙ Réglages** (en bas à gauche) → choisir entre **Editorial**, **Signal** ou **Convivial**.

---

## Structure des fichiers

| Fichier | Rôle |
|---|---|
| `data.js` | Contenu de l'édition — **le seul fichier à modifier** |
| `index.html` | Page principale |
| `print.html` | Version impression / export PDF |
| `styles.css` | Styles et thèmes visuels |
| `sections.jsx` | Composants React par type de section |
| `app.jsx` | Application principale |
| `tweaks-panel.jsx` | Panneau de réglages visuels |
| `image-slot.js` | Composant glisser-déposer pour les photos |
