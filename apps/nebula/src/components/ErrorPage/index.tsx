import classNames from "classnames";

const theme: IErrPageThemeType = {
  color: {
    red: "bg-gradient-to-r from-red-500 to-red-400",
    green: "bg-gradient-to-r from-green-500 to-green-400",
    yellow: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    blue: "bg-gradient-to-r from-blue-500 to-blue-400",
    pink: "bg-gradient-to-r from-pink-500 to-pink-400",
    gray: "bg-gradient-to-r from-gray-500 to-gray-400",
    orange: "bg-gradient-to-r from-orange-500 to-orange-400",
  },
  four0FourColor: {
    base: "text-9xl font-bold",
    color: {
      red: "text-red-600",
      green: "text-green-600",
      yellow: "text-yellow-600",
      blue: "text-blue-600",
      pink: "text-pink-600",
      gray: "text-gray-600",
      orange: "text-orange-600",
    },
  },
  four0FourBox: {
    base: "shadow overflow-hidden sm:rounded-lg pb-8",
    color: {
      red: "bg-red-300",
      green: "bg-green-300",
      yellow: "bg-yellow-300",
      blue: "bg-blue-300",
      pink: "bg-pink-300",
      gray: "bg-gray-300",
      orange: "bg-orange-300",
    },
  },
};

export default function ErrorPage(props: IErrPageProps) {
  const { color = "blue", className } = props;

  return (
    <div className={classNames(theme.color[color], className)}>
      <div className="bg-gradiant-to-r from-blue-400 to-blue-300"></div>
      <div className="w-9/12 m-auto py-16 flex items-center justify-center min-h-screen">
        <div className={classNames(theme.four0FourBox.base, theme.four0FourBox.color[color])}>
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className={classNames(theme.four0FourColor.base, theme.four0FourColor.color[color])}>404</h1>
            <h1 className="text-6xl font-medium py-8">Oops! Page not found</h1>
            <p className="text-2xl pb-8 px-12 font-medium">
              The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <button className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
              <a href="/">HOME</a>
            </button>
            <button className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
              <a href="/contact">Contact Us</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
