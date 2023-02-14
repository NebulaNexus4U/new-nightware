interface IErrPageThemeType {
  color: IErrPageColorsType;
  four0FourColor: IErrPageFour0FourType;
  four0FourBox: IErrPageFour0FourBoxType;
  children?: string;
}

interface IErrPageFour0FourType {
  color: IErrPageColorsType;
  base?: string;
}
interface IErrPageFour0FourBoxType {
  color: IErrPageColorsType;
  base?: string;
}

interface IErrPageProps {
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

interface IErrPageColorsType {
  [key: string]: string;
  red?: string;
  green?: string;
  yellow?: string;
  blue?: string;
  pink?: string;
  gray?: string;
  orange?: string;
}
