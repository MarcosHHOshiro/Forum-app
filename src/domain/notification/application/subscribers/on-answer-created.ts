import { DomainEvents } from "@/core/events/domain-events";
import type { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/entities/events/answer-created-event";

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name);
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log("Answer created event received. Sending notification...");
    // Here you would implement the logic to send a notification to the user
    // For example, you could use an email service or push notification service
  }
}