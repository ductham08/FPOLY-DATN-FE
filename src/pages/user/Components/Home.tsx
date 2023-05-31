import React from 'react'
import { useGetNewProductQuery, useGetProductsQuery } from '../../../api_slice/api_product'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RootState } from '../../../app/store';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

type Props = {}

const Home_component = (props: Props) => {

    const { data: products = [] } = useGetProductsQuery()
    const { data: newProducts = [], isLoading } = useGetNewProductQuery(undefined)

    // const dataSearch = useSelector((state: RootState) => state.searchSlice.value)


    return (
        <>
            {/* CATEGORIES SESSION START */}
            <section className="categories" style={{ marginTop: '-1px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <Swiper
                            // install Swiper modules
                            modules={[Pagination]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                        >
                            <SwiperSlide><img style={{ width: '100%' }} src="https://res.cloudinary.com/ductham087/image/upload/v1684769825/MoonShop/gjd7lgu7jvxuxpkrmhkj.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img style={{ width: '100%' }} src="https://res.cloudinary.com/ductham087/image/upload/v1684768794/MoonShop/kfgg9y2t3n8peu1oeb8d.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img style={{ width: '100%' }} src="https://res.cloudinary.com/ductham087/image/upload/v1684769166/MoonShop/pdy5gfbgwlshpwofwaaq.png" alt="" /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            {/* CATEGORIES SESSION END */}



            {/* PRODUCTS SESSION START */}

            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="section-title col-12">
                            <h4>Sản phẩm</h4>
                            <hr />
                        </div>
                    </div>

                    <div className="row property__gallery">
                        {products.slice(0, 8).map((item: any) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${item.product_images[0]})` }}>
                                        <div className="label new">Mới</div>
                                        <ul className="product__hover">
                                            <li>
                                                <Link to={item.product_images[0]} className="image-popup">
                                                    <span className="arrow_expand"></span>
                                                </Link>
                                            </li>
                                            <li><Link to="#"><span className="icon_bag_alt"></span></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6 className='nameProduct'><Link to={`/shop/detail/${item._id}`}>{item.product_name}</Link></h6>
                                        <hr />
                                        <div className="product__price">{(item.product_discount ? (item.product_discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : (item.product_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </section>

            {/* PRODUCTS SESSION END */}


            {/* BANNER SESSION START */}

            <div >
                <img src="https://res.cloudinary.com/ductham087/image/upload/v1684771305/MoonShop/nr1w2yctp1tgdfa6gdow.png" width="100%" alt="" />
            </div>

            <div style={{ margin: "3vw auto" }} className="container">
                <div className="row">
                    <div className="section-title col-12">
                        <h4>Sản phẩm mới</h4>
                        <hr />
                    </div>
                </div>
                <div className="row property__gallery">
                    {newProducts.map((item: any) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${item.product_images[0]})` }}>
                                    <div className="label new">Mới</div>
                                    <ul className="product__hover">
                                        <li>
                                            <Link to={item.product_images[0]} className="image-popup">
                                                <span className="arrow_expand"></span>
                                            </Link>
                                        </li>
                                        <li><Link to="#"><span className="icon_bag_alt"></span></Link></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6 className='nameProduct'><Link to={`/shop/detail/${item._id}`}>{item.product_name}</Link></h6>
                                    <hr />
                                    <div className="product__price">{(item.product_discount ? (item.product_discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : (item.product_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <section className="services spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-car"></i>
                                <h6>Vận chuyển nhanh chóng</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-money"></i>
                                <h6>Hỗ trợ đổi hàng hoàn tiền</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-support"></i>
                                <h6>Luôn có người trực hỗ trợ</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-headphones"></i>
                                <h6>Lắng nghe mọi góp ý từ khách hàng</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE SESSION END */}

            {/* IMSTAGRAM SESSION START */}

            <div className="instagram">
                <div className="container-fluid">
                    <div className="row">
                        <Swiper
                            // install Swiper modules
                            modules={[A11y]}
                            spaceBetween={50}
                            slidesPerView={6}
                            autoplay
                        >
                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684422775/insta-6_lodtap.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684594556/anhvuong5_cwgn6e.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684594285/anhvuong_srlmoa.webp" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684422775/insta-2_n2qvrp.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684594556/anhvuong3_xmih3y.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684594929/anhvuong8_vk0kil.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684422775/insta-6_lodtap.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684594928/anhvuong6_wm4sej.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://res.cloudinary.com/dmc2husvv/image/upload/v1684594928/anhvuong7_hlga4v.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>



                        </Swiper>
                    </div>
                </div>
            </div>

            {/* IMSTAGRAM SESSION END */}
        </>
    )
}

export default Home_component