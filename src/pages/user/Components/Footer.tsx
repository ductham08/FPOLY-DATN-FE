import React from 'react'
import { Link } from 'react-router-dom'

// IMAGES LOGO
import logo2 from "../img/logo2.png"

// IMAGES PAYMENTS
import pay_1 from "../img/payment/payment-1.png"
import pay_2 from "../img/payment/payment-2.png"
import pay_3 from "../img/payment/payment-3.png"
import pay_4 from "../img/payment/payment-4.png"
import pay_5 from "../img/payment/payment-5.png"


type Props = {}

const Footer_component = (props: Props) => {
    return (
        <>
            {/* FOOTER SESSION START */}

            <footer className="footer">
                <div className="container">
                    <hr />
                    <div className="row">
                        <div style={{margin: "auto"}} className="col-md-6 col-12">
                            <Link to="./index.html"><img src="https://res.cloudinary.com/ductham087/image/upload/v1684771775/MoonShop/heolm38vycienbkrzcxw.png" style={{ width: '100%' }} alt=""></img></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer__copyright__text">
                                <p>
                                    Design by Moonshop 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* FOOTER SESSION END */}
        </>
    )
}

export default Footer_component