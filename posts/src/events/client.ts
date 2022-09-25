import { Kafka, logLevel } from "kafkajs";

export const client = new Kafka({
    brokers: ["kafka-srv:9092"],
    clientId: process.env.KAFKA_CLIENT_ID,
    logLevel: logLevel.NOTHING,
});