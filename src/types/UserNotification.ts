export interface UserNotificationResponse {
  content: UserNotification[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
}

export interface UserNotification {
  header: string;
  body: string;
  status: string;
  new: boolean;
}
