export default function Card({
  children,
  imgSrc,
  title,
  price,
  ...props
}: {
  children: React.ReactNode;
  imgSrc: string;
  title: string;
  price: string;
}) {
  return (
    <div
      {...props}
      className="relative max-w-xs overflow-hidden shadow-lg group rounded-md"
    >
      <div className="overflow-hidden rounded-md shadow-md relative h-80 w-80">
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover rounded-md"
        />

        <div className="absolute inset-0">
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />

          
          <div className="  absolute left-0 right-0 p-4 text-white bottom-10 mb-[-10rem] transform translate-y-full transition-transform group-hover:translate-y-0">
            <div className="text-bold">
              <strong className="text-white text-3xl lg:text-4xl xl:text-5xl">
                {title}
              </strong>
            </div>
            <div>{price}</div>
          </div>

          <div className="p-4 text-white absolute bottom-0 h-20 w-72 transition-all duration-500 ease-in-out group-hover:h-40 group-hover:bottom-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
