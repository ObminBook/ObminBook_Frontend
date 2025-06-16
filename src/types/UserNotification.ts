import { ExchangeResponse } from './Exchange';

export interface UserNotificationResponse {
  content: UserNotification[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
}

export interface UserNotification {
  id: number;
  header: string;
  body: string;
  exchangeDto?: ExchangeResponse;
  createDate: string;
  opponentId: number;
  opponentProfilePicture: string;
  new: boolean;
}
