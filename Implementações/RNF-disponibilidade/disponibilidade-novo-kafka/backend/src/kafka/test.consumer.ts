import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";

@Injectable()
export class TestConsumer implements OnModuleInit {
    constructor(private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        await this.consumerService.consume(
            { topic: 'users'},
            {
                eachMessage: async ({ topic, partition, message }) => {
                    console.log({
                        topic: topic.toString(),
                        value: message.value?.toString(),
                        partition: partition.toString(),
                    });
                }
            }
        );
    }
}