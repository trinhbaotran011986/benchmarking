import { ActionReducerMap } from '@ngrx/store';
import *  as ParagraphtReducer from './paragraph.reducer'


export interface AppState {
    paragraphs: ParagraphtReducer.ParagraphState;
  }

  export const appReducer: ActionReducerMap<AppState> = {
    paragraphs: ParagraphtReducer.ParagraphReducer,
  };
  