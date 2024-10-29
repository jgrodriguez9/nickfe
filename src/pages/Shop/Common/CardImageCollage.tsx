import hodySample from "../../../../public/samples/hody.webp";
import design from "../../../../public/samples/design.webp";

type CardImageCollageProps = {
  productClass: string;
  name: string;
  artClass: string;
  labelClass: string;
};

const CardImageCollage = ({
  productClass,
  artClass,
  name,
  labelClass,
}: CardImageCollageProps) => {
  return (
    <div className={productClass}>
      <img
        src={hodySample}
        className="absolute inset-0 h-full w-full object-contain"
      />
      <div className="absolute w-full h-full">
        <div className="flex flex-col gap-1 items-center justify-center">
          {design && <img src={design} className={artClass} />}
          <h6 className={labelClass}>{name}</h6>
        </div>
      </div>
    </div>
  );
};

export default CardImageCollage;
