import shortid from 'shortid';

import { testSnapshots } from '../../utils/test';
import Toast, { validToastType } from './Toast';

describe('<Toast />', () => {
  testSnapshots(Toast, [
    {
      props: { id: shortid(), content: validToastType.danger },
      description: 'default render',
    },
    {
      props: { id: shortid(), content: validToastType.danger, type: validToastType.danger },
      description: 'danger render',
    },
    {
      props: { id: shortid(), content: validToastType.info, type: validToastType.info },
      description: 'info render',
    },
    {
      props: { id: shortid(), content: validToastType.success, type: validToastType.success },
      description: 'success render',
    },
    {
      props: { id: shortid(), content: validToastType.warning, type: validToastType.warning },
      description: 'warning render',
    },
  ]);
});
