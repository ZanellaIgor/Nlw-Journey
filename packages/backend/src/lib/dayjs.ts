import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('pt-br');
dayjs.extend(localizedFormat);

export { dayjs };
