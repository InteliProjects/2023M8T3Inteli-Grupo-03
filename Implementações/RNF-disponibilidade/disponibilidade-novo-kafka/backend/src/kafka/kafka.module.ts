import { Module } from '@nestjs/common';
import { ProductService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { TestConsumer } from './test.consumer';

@Module({
    providers: [ProductService, ConsumerService,TestConsumer],
    exports: [ProductService, ConsumerService]
})
export class KafkaModule {}