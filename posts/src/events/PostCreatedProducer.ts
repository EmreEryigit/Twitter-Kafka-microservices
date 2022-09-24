import { ProducerFactory, Topics } from "@postcom/common";

import { client } from "./client";

export interface PostCreatedEvent {
    topic: Topics.PostCreated;
    data: {
        userId: number;
        id: number;
        title: string;
    };
}

export class PostCreatedProducer extends ProducerFactory<PostCreatedEvent> {
    readonly topic = Topics.PostCreated;
    constructor() {
        super(client);
    }
}
