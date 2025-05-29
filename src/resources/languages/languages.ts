export const languages = [
  { value: 'uk', label: 'Українська' },
  { value: 'en', label: 'Англійська' },
  { value: 'bg', label: 'Болгарська' },
  { value: 'el', label: 'Грецька' },
  { value: 'da', label: 'Данська' },
  { value: 'he', label: 'Іврит' },
  { value: 'es', label: 'Іспанська' },
  { value: 'it', label: 'Італійська' },
  { value: 'ja', label: 'Японська' },
  { value: 'zh', label: 'Китайська' },
  { value: 'ko', label: 'Корейська' },
  { value: 'de', label: 'Німецька' },
  { value: 'nl', label: 'Нідерландська' },
  { value: 'pl', label: 'Польська' },
  { value: 'pt', label: 'Португальська' },
  { value: 'ro', label: 'Румунська' },
  { value: 'sv', label: 'Шведська' },
  { value: 'fi', label: 'Фінська' },
  { value: 'fr', label: 'Французька' },
  { value: 'tr', label: 'Турецька' },
  { value: 'cs', label: 'Чеська' },
  { value: 'other', label: 'Інша' },
];

export const findLabelLanguage = (value: string) => {
  return languages.find((el) => el?.value === value)?.label;
};
