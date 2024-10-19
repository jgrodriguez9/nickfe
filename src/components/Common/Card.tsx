type CardProps = {
  children: React.ReactNode;
  extraClasses?: string;
};

const Card = ({ children, extraClasses = "" }: CardProps) => {
  return <div className={`bg-white p-4 ${extraClasses}`}>{children}</div>;
};

export default Card;
