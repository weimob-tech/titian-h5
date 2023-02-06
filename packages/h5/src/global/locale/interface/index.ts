interface SearchLocale {
  text: string;
}

interface Dropdown {
  submitText: string;
}

export interface Locale {
  search: SearchLocale;
  dropdown: Dropdown;
}
