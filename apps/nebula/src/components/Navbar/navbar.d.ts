interface INavbarThemeType {
  base: string;
  children: string;
  color: INavbarThemeColorsType;
}

interface INavbarThemeColorsType {
  [key: string]: string;
  red?: string;
  green?: string;
  blue?: string;
  gray?: string;
  yellow?: string;
  orange?: string;
  pink?: string;
  blue?: string;
}

interface INavbarProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  color: string;
}
