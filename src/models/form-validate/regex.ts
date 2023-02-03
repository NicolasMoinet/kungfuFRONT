// Fonction qui gère les regex en fonction de la clé récupérée

export const inputRegex = (key: string): RegExp => {
  let regex: RegExp = /.*/;
  switch (key) {
    case 'email':
      // Vérification de format standard de mail + yopmail
      regex = /^((?!yopmail\.com).)*$/;
      break;
    case 'password':
      // Dans l'ordre, vérifie si le password fait au moins 8 caractères et a au moins 1 caractère spécial, pas de retour à la ligne, 1 chiffre, 1maj et 1min
      regex =
        /(?=^.{8,}$)(?=.*[0-9])(?=.*[!@#\$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z]).+$/;
      break;
    case 'name':
      // Vérifie que le pseudo commence et termine par une lettre
      regex = /^[a-zA-ZÀ-ÿ]+.*[a-zA-ZÀ-ÿ0-9]$/;
      break;
    case 'age':
    case 'maxParticipants':
      // Vérifie que l'âge contient bien uniquement des chiffres
      regex = /^\d+$/;
      break;
    case 'description':
      // Vérifie que la description commence par une lettre et peut contenir un espace
      regex = /^[a-zA-ZÀ-ÿ]+.*(\r\n|\r|\n)*.*$/;
      break;
    case 'title':
      // Vérifie que le titre commence par une lettre
      regex = /^[a-zA-ZÀ-ÿ]+(\w+\s?)*.*$/;
      break;
  }
  return regex;
};
