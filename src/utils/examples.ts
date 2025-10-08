import { Example } from './types';

export const EXAMPLES: Example[] = [
  {
    id: 'operational',
    title: 'Incident serveur API',
    type: 'OPERATIONAL',
    description: 'Gestion d\'une erreur 500 suite à une mise à jour',
    text: 'Erreur 500 sur API produits après mise à jour serveur v2.3.1 déployée à 14h30. Les logs montrent des timeouts de connexion à la base de données. Le service a été redémarré à 15h00 mais les erreurs persistent. Besoin de diagnostiquer la cause racine, vérifier la stabilité du système et préparer un rollback si nécessaire. Les utilisateurs rapportent des pages blanches sur le catalogue produits.'
  },
  {
    id: 'creative',
    title: 'Campagne marketing innovante',
    type: 'CREATIVE',
    description: 'Lancement d\'un nouveau produit avec storytelling fort',
    text: 'Nouvelle campagne marketing pour le lancement de notre application mobile de méditation guidée. Le concept central est "Retrouvez votre calme intérieur en 5 minutes par jour". Nous voulons un storytelling fort qui engage l\'audience urbaine stressée, avec des visuels apaisants inspirés de la nature. L\'approche doit être innovante, authentique et créer une connexion émotionnelle. Public cible : 25-45 ans, actifs, sensibles au bien-être.'
  },
  {
    id: 'analytical',
    title: 'Analyse Q3 engagement utilisateur',
    type: 'ANALYTICAL',
    description: 'Étude des métriques de conversion et engagement',
    text: 'Analyse des données Q3 montre une corrélation forte entre l\'engagement utilisateur et le taux de conversion. Les métriques révèlent que les utilisateurs qui interagissent avec au moins 3 fonctionnalités dans les 7 premiers jours ont un taux de rétention 65% supérieur. Les statistiques de parcours montrent un abandon important à l\'étape de configuration du profil (42%). Hypothèse : simplifier l\'onboarding pourrait améliorer la rétention globale de 25-30%.'
  },
  {
    id: 'conversational',
    title: 'Amélioration workflow développement',
    type: 'CONVERSATIONAL',
    description: 'Demande de conseils pour optimiser les processus',
    text: 'Je cherche des conseils pour améliorer notre workflow de développement. Notre équipe de 8 développeurs utilise Git + Jira mais nous avons des problèmes de coordination. Les revues de code prennent trop de temps, les branches restent ouvertes plusieurs semaines, et nous avons des conflits de merge fréquents. Quelles sont les meilleures pratiques pour fluidifier notre processus ? Quels outils ou méthodologies recommandez-vous pour une équipe de notre taille ?'
  }
];
