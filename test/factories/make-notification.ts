import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification, type NotificationProps } from "@/domain/notification/enterprise/entities/notification";

export function makeNotification(
  overrides: Partial<NotificationProps> = {},
  id?: UniqueEntityId
) {
  const notification = Notification.create({
    recepientId: new UniqueEntityId(),
    title: faker.lorem.sentence(4),
    content: faker.lorem.sentence(),
    ...overrides
  }, id)

  return notification;
}