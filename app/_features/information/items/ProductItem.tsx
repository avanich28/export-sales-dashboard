import ImageBox from "@/app/_components/ImageBox";

function ProductItem({ info }) {
  const {
    image,
    code,
    description,
    customer: { customerCompany },
    HSCode,
    directExchangeRate,
    price,
    currency,
  } = info;

  return (
    <>
      <td>
        <div className="relative size-[35px] sm:size-[45px] lg:size-[50px]">
          <ImageBox src={image} alt={description} />
        </div>
      </td>
      <td>{code}</td>
      <td className="font-medium sm:font-semibold">{description}</td>
      <td>{customerCompany}</td>
      <td>{HSCode}</td>
      <td>{directExchangeRate}</td>
      <td>{price}</td>
      <td>{currency}</td>
    </>
  );
}

export default ProductItem;
