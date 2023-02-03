import { inputRegex } from './regex';

// Fonction qui vérifie si l'input a un format correct selon la regex

export const isValid = (key: string, inputValue: string): boolean => {
  // on récupère notre fonction qui gère les regex
  const regex = inputRegex(key);
  console.log(`check regex de la key ${key} : `, regex);
  return regex.test(inputValue);
};
