export default function ImageSlider({ images }) {
  var i = 0;
  return (
    <div className="w-full flex flex-row overflow-x-scroll overflow-y-hidden snap-x snap-mandatory h-96">
      {images.map((url) => {
        i += 1;
        return (
          <div className="w-full flex-shrink-0 flex justify-center items-center">
            <div id={i} key={url} className="m-2 size-80 bg-black rounded-lg overflow-hidden snap-center flex items-center">
              <a href={url} target="_blank"><img src={url}/></a>
            </div>
          </div>
        );
      })}
    </div>
  );
}