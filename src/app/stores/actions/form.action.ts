import { Action } from '@ngrx/store';
import { QuestionCheckbox } from 'src/app/models/question-checkbox.model';
import { QuestionParagraph } from 'src/app/models/question-paragraph.model';

export const FETCH_PARAGRAPH = 'FETCH_PARAGRAPH';
export const FETCH_PARAGRAPH_SUCCESS = 'FETCH_PARAGRAPH_SUCCESS';


export const FETCH_CHECKBOX = 'FETCH_CHECKBOX';
export const FETCH_CHECKBOX_SUCCESS = 'FETCH_CHECKBOX_SUCCESS';
export const CHOOSE_ANSWERS = 'CHOOSE_ANSWERS'

export interface questionsParagraph {
    paragraph: QuestionParagraph
}
export interface questionCheckbox {
    checkbox: QuestionCheckbox
}
export interface answer {
    label: string,
    value: string
}

export interface answersQuestion {
    introdue: string,
    question: string,
    answers: answer []
}
export class fetchParagraph implements Action {
    readonly type = FETCH_PARAGRAPH;
    constructor(public payload: QuestionParagraph){}
}

export class fetchParagraphSuccess implements Action {
    readonly type = FETCH_PARAGRAPH_SUCCESS;
    constructor(public payload: QuestionParagraph){}
}

export class fetchCheckbox implements Action {
    readonly type = FETCH_CHECKBOX;
    constructor(public payload: QuestionCheckbox){}
}

export class fetchCheckboxSuccess implements Action {
    readonly type = FETCH_CHECKBOX_SUCCESS;
    constructor(public payload: QuestionCheckbox){}
}

export class chooseAnswers implements Action {
    readonly type = CHOOSE_ANSWERS;
    constructor(public payload: answersQuestion){}
}

export type QuestiontActions = 
| fetchParagraph 
| fetchParagraphSuccess 
| fetchCheckbox
| fetchCheckboxSuccess
| chooseAnswers

