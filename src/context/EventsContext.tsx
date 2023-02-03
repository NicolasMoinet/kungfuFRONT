import axios, { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { EventType } from '../models/interface/Event';

// faire une interface ContextType avec les elements que l'on va passer
interface EventsContextType {
  events: EventType[];
  setEvents: (listEvents: EventType[]) => void;
}
// on creer une constante de type createContext  pour stocker le context que l'on creer
const EventsContext = createContext<EventsContextType | null>(null);

//on creer une constante que l'on exporte
export const useEvents = () => {
  //on appel le contexte avec useContexte et on appelle la constante context
  let context = useContext(EventsContext);

  //si pas de if il y aura des erreurs sauf que il y aura finallement pas de cas pour il est null. mais bon faut le if pour traiter le au cas ou
  if (!context) {
    throw new Error("le context n'existe pas!");
  }
  return context;
};

// apres le provider on a creer l'interface providersProps pour passer children en props ( et le reactNode n'importe quel type d'element du dom div h2 etc)
interface ProviderProps {
  children: React.ReactNode;
}

//on défini notre provider qui a besoin d'une props children a definir comme n'importe quel props.
//mettre une MAJ car sinon pas bon
const EventsProvider = ({ children }: ProviderProps) => {
  const [events, setEvents] = useState<EventType[]>([]);
  // use effect pour recuperer la liste d'events au chargement de l'app
  useEffect(() => {
    const getListEvents = async () => {
      try {
        // recuperer notre liste d'events axios.get try catch AxiosResponse
        const response: AxiosResponse<EventType[]> = await axios.get(
          'http://localhost:8080/api/events'
        );
        //mettre a jour le state
        //mettre a jour la liste d'events
        setEvents(response.data);
        console.log('EventsContext response data : ', response.data);
      } catch (error) {
        console.log('events contexts useeffect error', error);
      }
    };
    getListEvents();
  }, []);

  const stateValues = {
    events,
    setEvents,
  };

  return (
    //la on lui a dit ce que l'on voudrait avoir comme info. simul le provider qui fourni info. notre app symbolisé par children
    //comment on lui dit ce que transporte comme info c'est value et dedabs on la deffini dabs la const au dessus pas besoin de retyper
    <EventsContext.Provider value={stateValues}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
