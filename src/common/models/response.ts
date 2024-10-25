import { MessageTypesEnum } from "../enums/message-types.enum";

export class CustomResponse {
  type: MessageTypesEnum;
  data: string;
  id: number;

  constructor({
    type,
    data,
    id
  }: {
    type: MessageTypesEnum;
    data: string;
    id: number;
  }) {
    this.type = type;
    this.data = data;
    this.id = id;
  }
}
