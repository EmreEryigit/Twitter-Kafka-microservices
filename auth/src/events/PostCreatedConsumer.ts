import { ConsumerFactory, NotFoundError, Topics } from "@postcom/common";
import { userRepo } from "../db/data-source";
import { client } from "./client";
import { groupId } from "./groupId";

export interface PostCreatedEvent {
    topic: Topics.PostCreated;
    data: {
        userId: number;
        id: number;
        title: string;
    };
}

export class PostCreatedConsumer extends ConsumerFactory<PostCreatedEvent> {
    readonly topic = Topics.PostCreated;
    constructor() {
        super(client, groupId);
    }
    async onMessage(msg: PostCreatedEvent["data"]) {
        console.log(msg);
    }
}
