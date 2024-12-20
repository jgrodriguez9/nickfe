type CardImageCollageProps = {
  productClass: string;
  name: string;
  artClass: string;
  labelClass: string;
  bgImage: string;
  bgDesign: string;
  sx?: any;
};

const CardImageCollage = ({
  productClass,
  artClass,
  name,
  labelClass,
  bgImage,
  bgDesign,
  sx = {},
}: CardImageCollageProps) => {
  return (
    <div className={productClass}>
      <img
        src={bgImage}
        className="absolute inset-0 h-full w-full object-contain"
      />
      <div className="absolute w-full h-full">
        <div className="flex flex-col gap-1 items-center justify-center">
          {bgDesign && <img src={bgDesign} className={artClass} />}
          <h6 className={labelClass} style={sx}>
            {name}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CardImageCollage;
