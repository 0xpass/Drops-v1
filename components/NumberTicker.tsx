const NumberTicker = (props: any) => {

  function handleChange(value: number) {
    if (isNaN(value)) {
      props.setQuantity(0);
      return;
    }
    if (value < 1) {
      props.setQuantity(1);
      return;
    }
    props.setQuantity(value);
  }

  return (
    <div className="flex items-center gap-5">
      <button
        className="font-500 w-10 h-10 rounded-full bg-[#FAFAFA] border"
        disabled
      >-</button>
        <p className="w-full font-semibold flex-1 text-center text-gray-800"  onChange={(e) => handleChange(Number(1))} >1</p>
      <button
        className="font-500 w-10 h-10 rounded-full bg-[#FAFAFA] border"
        disabled
      >+</button>
    </div>
  )
}

export default NumberTicker;
