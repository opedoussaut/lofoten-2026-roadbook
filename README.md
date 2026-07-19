# Lofoten 2026 Roadbook

Application web progressive pour piloter le road trip du 25 août au 11 septembre 2026.

## Fonctions

- itinéraire modifiable ;
- activités famille et options Olivier ;
- carte Leaflet/OpenStreetMap ;
- suivi du van ;
- journal de bord ;
- budget ;
- suivi GPS lorsque la page reste active ;
- fonctionnement hors ligne ;
- synchronisation Google Sheets après configuration OAuth.

## Configuration Google Sheets

1. Créer un projet dans Google Cloud Console.
2. Activer **Google Sheets API**.
3. Configurer l’écran de consentement OAuth.
4. Créer un identifiant OAuth de type **Application Web**.
5. Ajouter l’origine JavaScript autorisée :
   `https://opedoussaut.github.io`
6. Copier le Client ID dans `config.js`, propriété `googleClientId`.
7. Vérifier que `spreadsheetId` pointe sur le classeur Google Sheets du roadbook.

Aucun secret client ne doit être ajouté au dépôt public.

## Publication

GitHub Pages doit publier la branche `main`, dossier `/ (root)`.

Site : https://opedoussaut.github.io/lofoten-2026-roadbook/
