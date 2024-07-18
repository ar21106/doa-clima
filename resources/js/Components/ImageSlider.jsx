import { mdiChevronLeft } from "@mdi/js";
import Icon from "@mdi/react";

export default function ImageSlider({ images }) {

  //TODO fix bug: scroll depends on resolution width and amount of images
  function scrollH(n, dir){
    //if tailwind's sm media query (mobile)
    if(!window.matchMedia('(min-width: 640px)').matches){
      n = n/2;
    }
    document.getElementById("slider").scrollLeft += n*dir;
  }

  return (
    <div id="slider" className="flex flex-row overflow-x-scroll overflow-y-hidden snap-x snap-mandatory">
      <button
        className="sticky left-0 sm:hover:bg-gray-100"
        onClick={(e) => {
          e.preventDefault();
          scrollH(700, -1);
        }}><Icon path={mdiChevronLeft} size={1.5}/>
      </button>
      {images.map((image) => {
        return (
          <div key={image.name} className="w-full flex-shrink-0 flex justify-center snap-center items-center">
            <div className="m-2 size-80 bg-black rounded-lg overflow-hidden flex items-center">
              <a href={"/photos/"+image.name} target="_blank"><img src={"/photos/"+image.name} /></a>
            </div>
          </div>
        );
      })}
      <button
        className="sticky right-0 sm:hover:bg-gray-100"
        onClick={(e) => {
          e.preventDefault();
          scrollH(700, 1);
        }}><Icon path={mdiChevronLeft} size={1.5} horizontal/>
      </button>
    </div>
  );
}