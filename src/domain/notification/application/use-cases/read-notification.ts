import { Notification } from '../../enterprise/entities/notification';
import { left, right, type Either } from '@/core/either';
import type { NotificationsRepository } from '../repositories/notifications-repository';
import { ResourceNotFoundError } from '@/core/erros/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/erros/errors/not-allowed-error';

interface ReadNotificationUseCaseRequest {
  recepientId: string;
  notificationId: string;
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification;
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute({
    recepientId, 
    notificationId
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if(recepientId !== notification.recepientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({ notification });
  }
}