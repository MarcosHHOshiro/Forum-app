import type { Notification } from "../../enterprise/entities/notification";

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>;
  findById(notificationId: string): Promise<Notification | null>;
  // findManyByRecipientId(recepientId: string): Promise<Notification[]>;
  // countManyByRecipientId(recepientId: string): Promise<number>;
  save(notification: Notification): Promise<void>;
}