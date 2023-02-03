// Fonction pour récupérer l'image de l'organisateur. Si elle est null, renvoie une image par défaut

export const orgaPicture = (picture: string | undefined | null) => {
  const pictureToUse = picture ? picture : 'image0.png';
  const pictureURL = `http://localhost:8080/public/assets/${pictureToUse}`;
  return pictureURL;
};
