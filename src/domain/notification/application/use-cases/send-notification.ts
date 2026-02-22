import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Notification } from '../../enterprise/entities/notification';
import { right, type Either } from '@/core/either';
import type { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationUseCaseRequest {
  recepientId: string;
  title: string;
  content: string;
}

type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification;
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute({
    recepientId, title, content
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recepientId: new UniqueEntityId(recepientId),
      title,
      content
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}