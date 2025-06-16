import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';

export function getDaysAgo(createDateStr: string) {
  return formatDistanceToNow(new Date(createDateStr), {
    addSuffix: true,
    locale: uk,
  });
}
