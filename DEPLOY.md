# Déploiement — Kitoo (Vercel)

Le site est déployé sur **Vercel**, configuré **entièrement en CLI**.

- **URL de production** : https://kitoo-vitrine.vercel.app
- **Projet Vercel** : `evan-leev/kitoo-vitrine`
- **Dépôt Git** : https://github.com/Evann5/kitoo-vitrine (connecté → déploiement continu)

## Checklist de mise en ligne (V1)

- [x] `pnpm lint` au vert
- [x] `pnpm test --coverage` au vert (≥ 80 % lignes)
- [x] `pnpm test:e2e` au vert (parcours visiteur + axe-core)
- [x] `pnpm build` sans warning bloquant
- [x] Smoke test `pnpm start` (page servie, CTA, disclaimer présents)
- [x] CI GitHub Actions verte (jobs `quality` + `e2e`)
- [x] Lighthouse : SEO & Accessibilité ≥ 95
- [x] `pnpm audit --prod` : 0 vulnérabilité
- [x] En-têtes de sécurité actifs (cf. ci-dessous)
- [x] `NEXT_PUBLIC_APP_URL` configurée sur les 3 environnements Vercel
- [x] Aucun secret commité ; `.env.local` et `.vercel/` ignorés
- [ ] Remplacer `NEXT_PUBLIC_APP_URL` par le vrai lien quand l'équipe app le fournit
      (cf. procédure ci-dessous)

## Déploiement continu

Le projet Vercel est connecté au dépôt GitHub. **Chaque `git push` sur `main`
déclenche automatiquement un déploiement de production** ; chaque branche / PR
génère un déploiement de _preview_. Aucune action manuelle nécessaire au quotidien.

## En-têtes de sécurité

Définis dans [`vercel.json`](vercel.json) et appliqués à toutes les routes :

| En-tête                     | Valeur                                     |
| --------------------------- | ------------------------------------------ |
| `X-Content-Type-Options`    | `nosniff`                                  |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`          |
| `X-Frame-Options`           | `SAMEORIGIN`                               |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains`      |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()` |

## Variable d'environnement

`NEXT_PUBLIC_APP_URL` (variable **publique**, valeur placeholder `#` tant que le
lien de l'app n'est pas connu) est configurée sur les **3 environnements**
(Production, Preview, Development) côté Vercel — jamais commitée.

```bash
vercel env ls                       # lister les variables
```

### Mettre à jour la valeur quand le lien de l'app arrive

```bash
# 1. Retirer l'ancienne valeur sur chaque environnement
vercel env rm NEXT_PUBLIC_APP_URL production --yes
vercel env rm NEXT_PUBLIC_APP_URL preview --yes
vercel env rm NEXT_PUBLIC_APP_URL development --yes

# 2. Ré-ajouter la nouvelle valeur (ex. https://app.kitoo.fr)
printf 'https://app.kitoo.fr' | vercel env add NEXT_PUBLIC_APP_URL production
printf 'https://app.kitoo.fr' | vercel env add NEXT_PUBLIC_APP_URL development
vercel env add NEXT_PUBLIC_APP_URL preview   # répondre aux prompts (valeur, branche = toutes)

# 3. Redéployer en production pour prendre en compte la nouvelle valeur
vercel --prod --yes
# (ou simplement pousser un commit sur main : redeploy automatique)
```

> Les variables `NEXT_PUBLIC_*` sont **exposées au navigateur** — n'y mettre
> aucun secret.

## Commandes CLI utilisées (mise en place)

```bash
vercel --version                                  # CLI installée
vercel whoami                                      # authentification
pnpm build                                         # build local de contrôle
vercel link --yes --project kitoo-vitrine          # lier le projet (+ connexion Git auto)
printf '#' | vercel env add NEXT_PUBLIC_APP_URL production
printf '#' | vercel env add NEXT_PUBLIC_APP_URL development
vercel env add NEXT_PUBLIC_APP_URL preview         # valeur # sur toutes les branches preview
vercel --prod --yes                                # premier déploiement de production
```

## Commandes utiles

```bash
vercel ls                  # historique des déploiements
vercel project ls          # projets du scope
vercel inspect <url>       # détails + alias d'un déploiement
vercel logs <url>          # logs runtime
```

## Rollback

```bash
vercel ls                              # repérer un déploiement précédent (READY)
vercel rollback <deployment-url>       # revenir à ce déploiement
```
