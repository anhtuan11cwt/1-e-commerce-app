const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-2 mb-6">
      <p className="text-gray-500 text-lg">
        {text1} <span className="font-medium text-gray-700">{text2}</span>
      </p>
      <p className="bg-gray-700 w-8 sm:w-12 h-0.5" />
    </div>
  );
};

export default Title;
