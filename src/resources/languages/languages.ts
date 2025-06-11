export const languages = [
  { value: 'uk', label: 'Українська' },
  { value: 'ru,', label: 'російська' },
  { value: 'en', label: 'Англійська' },
  { value: 'es', label: 'Іспанська' },
  { value: 'fr', label: 'Французька' },
  { value: 'pl', label: 'Польська' },
  { value: 'de', label: 'Німецька' },
  { value: 'bg', label: 'Болгарська' },
  { value: 'el', label: 'Грецька' },
  { value: 'da', label: 'Данська' },
  { value: 'he', label: 'Іврит' },
  { value: 'it', label: 'Італійська' },
  { value: 'ja', label: 'Японська' },
  { value: 'zh', label: 'Китайська' },
  { value: 'ko', label: 'Корейська' },
  { value: 'nl', label: 'Нідерландська' },
  { value: 'pt', label: 'Португальська' },
  { value: 'ro', label: 'Румунська' },
  { value: 'sv', label: 'Шведська' },
  { value: 'fi', label: 'Фінська' },
  { value: 'tr', label: 'Турецька' },
  { value: 'cs', label: 'Чеська' },
  { value: 'other', label: 'Інша' },
];

export const findLabelLanguage = (value: string) => {
  return languages.find((el) => el?.value === value)?.label;
};
