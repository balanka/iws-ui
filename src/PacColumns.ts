const PacColumns  = (t: (arg0: string) => any)=> [
  {
    key: 'account',
    group: t('account.account'),
    _props: { colSpan:2 },
    children: [
      {
        key: 'account',
        label: t('common.id'),
        _props: { scope: 'col' },
        _style: { width: '5%', textAlign: 'left' },
      },
      {
        key: 'name',
        label: t('account.name'),
        _props: { scope: 'col' },
        _style: { width: '20%', textAlign: 'left' },
      },
    ],
  },
  {
    key: 'period',
    group: t('pac.period'),
    _props: {colSpan: 1},
    _style: {width: '5%', textAlign: 'center'},
    children: [
      {
        key: 'period',
        label: t('pac.period'),
        _props: {scope: 'col'},
        _style: {width: '5%', textAlign: 'right'},
      },
    ]
  },
  {
    key: 'init-Balance',
    group: t('common.report'),
    _props: { colSpan: 2 },
    _style: { width: '20%', textAlign: 'right' },
    children: [
      {
        key: 'idebit',
        label: t('common.debit'),
        _props: { scope: 'col' },
        _style: { width: '10%', textAlign: 'right' },
      },
      {
        key: 'icredit',
        label:t('common.credit'),
        _props: { scope: 'col' },
        _style: { width: '10%', textAlign: 'right' },
      },
    ],
  },
  {
    key: 'transaction',
    group: t('common.transactions'),
    _props: { colSpan: 2 },
    _style: { width: '20%', textAlign: 'center' },
    children: [
      {
        key: 'debit',
        label: t('common.debit'),
        _props: { scope: 'col' },
        _style: { width: '10%', textAlign: 'right' },
      },
      {
        key: 'credit',
        label:t('common.credit'),
        _props: { scope: 'col' },
        _style: { width: '10%', textAlign: 'right' },
      },
    ],
  },
  {
    key: 'balance',
    group: t('common.balance'),
    _props: { colSpan: 2 },
    _style: { width: '20%', textAlign: 'center' },
    children: [
      {
        key: 'bdebit',
        label: t('common.debit'),
        _props: { scope: 'col' },
        _style: { width: '10%', textAlign: 'right' },
      },
      {
        key: 'bcredit',
        label:t('common.credit'),
        _props: { scope: 'col' },
        _style: { width: '10%', textAlign: 'right' },
      },
    ],
  },
]
export default PacColumns


