import { QuestionParagraph } from "src/app/models/question-paragraph.model";
import * as QuestionActions from "../actions/form.action";
import { QuestionCheckbox } from "src/app/models/question-checkbox.model";
export interface ParagraphState {
   paragraphs: QuestionParagraph[],
   checkboxList: QuestionCheckbox[],
   answers: QuestionActions.answersQuestion []
}

const initialState: ParagraphState = {
    paragraphs: [],
    checkboxList: [],
    answers : []
}

export function ParagraphReducer (
    state: ParagraphState = initialState,
    action: any) 
    {
        switch(action.type)
        {
            case QuestionActions.FETCH_PARAGRAPH:
           
            return {
                ...state,
                paragraphs:  [...state.paragraphs, ...[((action) as QuestionActions.fetchParagraph ).payload]]
            }
            case QuestionActions.FETCH_CHECKBOX:
           
            return {
                ...state,
                checkboxList:  [...state.checkboxList, ...[((action) as QuestionActions.fetchCheckbox ).payload]]
            }
            case QuestionActions.CHOOSE_ANSWERS:
                return {
                    ...state,
                    answers: [...state.answers, ...[((action) as QuestionActions.chooseAnswers ).payload]]
                }
            default:
                return state
        }
}