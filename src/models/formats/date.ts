// Fonction pour formater la date afin qu'elle rentre bien dans la vignette

export const formatDate = (date: string) => {
  const toDate = new Date(date);
  return toDate.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
