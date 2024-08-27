import CurrencyConverter from "./components/converters/currency-converter";
import LanguageConverter from "./components/converters/language-converter";

const LanguageCurrencyConverterHeader = () => {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-4 ml-auto">
        <LanguageConverter />
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default LanguageCurrencyConverterHeader;
