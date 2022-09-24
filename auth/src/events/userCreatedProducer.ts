import { ProducerFactory, Topics, UserCreatedEvent } from "@postcom/common";
import { client } from "./client";

export class UserCreatedProducer extends ProducerFactory<UserCreatedEvent> {
    readonly topic = Topics.UserCreated;
    constructor() {
        super(client);
    }
}
