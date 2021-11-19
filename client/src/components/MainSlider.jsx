// Importing Swiper
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Navigation, Pagination, Autoplay } from "swiper";

// Modules
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";

// Custom CSS
import "./MainSlider.css";

const MainSlider = () => {
  return (
    <Swiper
      loop
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={30}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true, dynamicBullets: true }}
    >
      <SwiperSlide>
        <div class="content">
          <p className="display-6">AMAZING VALUE</p>
          <p className="lead">
            There are multiple offers and discounts running all the time so make sure to keep an eye
            on all the amazing offers so you don't miss out on anything for your pets.
          </p>
          <a href="#" class="btn btn-primary btn-lg">
            Check Now
          </a>
        </div>
        <div class="image">
          <img src="/assets/images/shop-3.png" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="content">
          <p className="display-6">BEST QUALITY PRODUCTS</p>
          <p className="lead">
            Get assured quality on the best products for your beloved companion. Browse through a
            variety of options and variations based on your pet with reasonable prices.
          </p>
          <a href="#" class="btn btn-primary btn-lg">
            Order Now
          </a>
        </div>
        <div class="image">
          <img src="/assets/images/shop-1.png" alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="content">
          <p className="display-6">TOP RATED PRODUCTS</p>
          <p className="lead">
            All of our products are rated by the community itself so that you can be assure of the
            quality of the product for your pet. A high standard is maintained by our top analysts
            and reviewers
          </p>
          <a href="#" class="btn btn-primary btn-lg">
            Browse Now
          </a>
        </div>
        <div class="image">
          <img src="/assets/images/shop-2.png" alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSlider;
