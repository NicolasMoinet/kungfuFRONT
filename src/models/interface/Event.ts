
import { OrganisateurType } from './Organisateur';
import { UserType } from './User';

export interface EventType {
  number: string | undefined;
  id?: string;
  title: string;
  organisateur: OrganisateurType;
  date: string;
  time: string;
  description: string;
  address: string;
  postalCode:string;
  city:string;
  participants: UserType[];
}
