# 🚀 Guide Rapide - Push vers GitHub

## Option 1: Script Automatique (RECOMMANDÉ)

```bash
cd /tmp/cc-agent/58218771/project
./PUSH_TO_GITHUB.sh
```

Le script va:
1. ✅ Initialiser Git
2. ✅ Ajouter tous les fichiers
3. ✅ Créer le commit
4. ✅ Configurer le remote
5. ✅ Pousser vers GitHub (avec vos identifiants)

## Option 2: Commandes Manuelles

```bash
cd /tmp/cc-agent/58218771/project

# 1. Initialiser Git
git init
git config user.name "Axiorix"
git config user.email "axiorix@users.noreply.github.com"
git branch -M main

# 2. Ajouter et commiter
git add -A
git commit -m "Initial commit: SPMT Generator v1.0.0"

# 3. Ajouter le remote et pousser
git remote add origin https://github.com/build-service-intern-account-01/SPMT-Generator.git
git push -u origin main
```

## 🔐 Authentification GitHub

Quand on vous demande vos identifiants:

**Username:** `build-service-intern-account-01`

**Password:** Votre Personal Access Token (gardez-le privé, ce n’est pas votre mot de passe GitHub).

### Comment obtenir un Personal Access Token:

1. **Allez sur:** https://github.com/settings/tokens
2. **Cliquez:** "Generate new token" → "Generate new token (classic)"
3. **Cochez:** `repo` (Full control of private repositories)
4. **Cliquez:** "Generate token"
5. **COPIEZ le token** - vous ne le reverrez plus!
6. **Utilisez ce token comme mot de passe** lors du push

## Option 3: GitHub CLI (Si installé)

```bash
cd /tmp/cc-agent/58218771/project
gh auth login
git init
git add -A
git commit -m "Initial commit: SPMT Generator v1.0.0"
git branch -M main
git remote add origin https://github.com/build-service-intern-account-01/SPMT-Generator.git
git push -u origin main
```

## 🌐 Activer GitHub Pages (Après le Push)

1. Allez sur: https://github.com/build-service-intern-account-01/SPMT-Generator/settings/pages
2. Sous **"Source"**, sélectionnez **"GitHub Actions"**
3. Attendez 2-3 minutes pour le déploiement
4. Votre site sera live sur: https://build-service-intern-account-01.github.io/SPMT-Generator/

## ❓ Problèmes Communs

### "Authentication failed"
→ Utilisez un Personal Access Token, pas votre mot de passe GitHub

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/build-service-intern-account-01/SPMT-Generator.git
```

### "Updates were rejected"
→ Le dépôt GitHub existe déjà avec du contenu. Utilisez:
```bash
git push -u origin main --force
```

---

✅ **Votre projet est prêt à être déployé!**
