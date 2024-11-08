type Props = {
  children: React.ReactNode;
};
const BodyDialog = ({ children }: Props) => {
  return <div className="p-4 md:p-5 space-y-4">{children}</div>;
};

export default BodyDialog;
