type SchemaDefaultProps = {
  showPlastas?: boolean;
};

const SchemaDefault = ({ showPlastas = false }: SchemaDefaultProps) => {
  return (
    <>
      {showPlastas && (
        <>
          <img
            src="/bg/plasta1.webp"
            className="absolute top-0 left-0 w-[22%]"
          />
          <img
            src="/bg/plasta2.webp"
            className="absolute top-0 right-0 w-[22%]"
          />
          <img
            src="/bg/plasta3.webp"
            className="absolute top-1/2 right-0 h-[35%]"
          />
          <img
            src="/bg/plasta4.webp"
            className="absolute bottom-0 left-1/3 w-[44%]"
          />
        </>
      )}

      <img
        src="/logo-nick.png"
        className="absolute top-10 left-1/2 transform -translate-x-1/2 w-[300px]"
      />
    </>
  );
};

export default SchemaDefault;
