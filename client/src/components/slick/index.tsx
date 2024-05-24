type ArrowProps = {
  onClick: () => void;
};

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <div
      className={
        "absolute w-10 h-10 cursor-pointer rounded-full bg-[#0000003a] top-1/2 -translate-y-1/2 -right-0 z-[1] justify-center items-center flex opacity-20 hover:opacity-100 transition-opacity duration-300"
      }
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#fff"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <div
      className={
        "absolute w-10 h-10 cursor-pointer rounded-full bg-[#0000003a] top-1/2 -translate-y-1/2 -left-0 z-[1] justify-center items-center flex opacity-20 hover:opacity-100 transition-opacity duration-300"
      }
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#fff"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
}

export { NextArrow, PrevArrow };
