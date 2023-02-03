// Fonction qui gère le message d'erreur selon la clé

export const errorInfo = (key: string): string => {
  let message = '';

  switch (key) {
    case 'email':
      message = "Format d'email invalide. ex: jean.dupont@mail.com";
      break;
    case 'password':
      message = 'Format du mot de passe invalide';
      break;
    case 'name':
      message = 'Le pseudo doit forcément commencer et terminer par une lettre';
      break;
    case 'age':
      message = "Format de l'âge invalide";
      break;
    case 'city':
      message = 'Format de la ville invalide';
      break;
    case 'description':
      message = 'Format de la description invalide';
      break;
    case 'title':
      message = 'Format du titre invalide';
      break;
    case 'maxParticipants':
      message = 'Format des participants invalide';
      break;
  }
  console.log('error message : ', message);
  return message;
};
