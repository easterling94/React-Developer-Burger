import { v4 as uuid } from 'uuid';

export enum Name {
  password = 'password',
  email = 'email',
  name = 'name',
  code = 'code',
};

export enum Type {
  password = 'password',
  email = 'email',
  text = 'text',
};

export type inputName = Name.password | Name.email | Name.name | Name.code;
export type inputType = Type.text | Type.email | Type.password;

interface inputProps {
  placeholder: string;
  name: inputName;
  type: inputType;
};

interface id {
  id: string;
};

export const generateInput = ({placeholder, name, type}: inputProps): inputProps & id => ({
  id: uuid(),
  placeholder: placeholder,
  name: name,
  type: type,
})

interface hintProps {
  link: string,
  question: string,
  answer: string,
}

export const generateHint = ({link, question, answer}: hintProps): hintProps & id => ({
  id: uuid(),
  link: link,
  question: question,
  answer: answer,
})