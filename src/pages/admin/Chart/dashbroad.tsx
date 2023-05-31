import { Button, Card, Col, DatePicker, Row, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ReactApexChart from 'react-apexcharts';
import { httpGetAll, httpGetAllProduct } from "../../../api_slice/order copy";
import { CheckSquareOutlined, CloseCircleOutlined, DollarOutlined, LoadingOutlined, NotificationOutlined } from "@ant-design/icons";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const Dashboard = () => {
    const [displayOption, setDisplayOption] = useState('day');
    const [revenueData, setRevenueData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [cancelledOrders, setCancelledOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [confirmedOrders, setConfirmedOrders] = useState(0);
    const [deliveringOrders, setDeliveringOrders] = useState(0);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [productStats, setProductStats] = useState([]);

    const fetchData = async () => {
        try {
            const response = await httpGetAll();
            const orders = response.data;

            const productResponse = await httpGetAllProduct();
            const products = productResponse.data;
            console.log('products', products)

            const pendingOrdersCount = orders.filter((order: any) => order.status === 0).length;
            const confirmedOrdersCount = orders.filter((order: any) => order.status === 1).length;
            const deliveringOrdersCount = orders.filter((order: any) => order.status === 2).length;
            const cancelledOrdersCount = orders.filter((order: any) => order.status === 4).length;
            const filteredOrders = orders.filter((order: any) => order.status === 3);


            const revenueByOption: any = {
                day: {},
                week: {},
                month: {},
            };

            filteredOrders.forEach((order: any) => {
                const createdAt = moment(order.createdAt);

                if (displayOption === 'day') {
                    const date = createdAt.format('YYYY-MM-DD');
                    if (!revenueByOption.day[date]) {
                        revenueByOption.day[date] = 0;
                    }
                    revenueByOption.day[date] += order.totalCheck;
                } else if (displayOption === 'week') {
                    const week = createdAt.format('YYYY-[W]WW');
                    if (!revenueByOption.week[week]) {
                        revenueByOption.week[week] = 0;
                    }
                    revenueByOption.week[week] += order.totalCheck;
                } else if (displayOption === 'month') {
                    const month = createdAt.format('YYYY-MM');
                    if (!revenueByOption.month[month]) {
                        revenueByOption.month[month] = 0;
                    }
                    revenueByOption.month[month] += order.totalCheck;
                }
            });

            const revenueDataByOption: any = Object.keys(revenueByOption[displayOption]).map(option => ({
                option,
                revenue: revenueByOption[displayOption][option],
            }));

            revenueDataByOption.sort((a: any, b: any) => moment(a.option).diff(moment(b.option)));

            const totalRevenueValue = revenueDataByOption.reduce((sum: any, data: any) => sum + data.revenue, 0);

            setTotalRevenue(totalRevenueValue);
            setRevenueData(revenueDataByOption);
            setCancelledOrders(cancelledOrdersCount);
            setPendingOrders(pendingOrdersCount);
            setConfirmedOrders(confirmedOrdersCount);
            setDeliveringOrders(deliveringOrdersCount);
            setTotalRevenue(totalRevenueValue);
            setRevenueData(revenueDataByOption);


            const productQuantityBySize: any = {};

            products.forEach(product => {
                product.product_size.forEach(size => {
                    const { size: productSize, sizeQuantity } = size;
                    if (!productQuantityBySize[product._id]) {
                        productQuantityBySize[product._id] = {};
                    }
                    productQuantityBySize[product._id][productSize] = sizeQuantity;
                });
            });

            const productDataBySize = products.map(product => ({
                product: product.product_name,
                sizes: product.product_size.map(size => ({
                    size: size.size,
                    quantity: productQuantityBySize[product._id][size.size] || 0,
                })),
            }));

            // Cập nhật state với dữ liệu số lượng sản phẩm theo kích thước
            setProductData(productDataBySize);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log('productStats', productStats)
    const fetchDeliveredOrders = async () => {
        try {
            const response = await httpGetAll();
            const orders = response.data;

            // Lọc và sắp xếp các đơn hàng đã giao với status = 3 theo số lượng bán được
            const topSellingProducts = orders
                .filter((order: any) => order.status === 3)
                .sort((a: any, b: any) => b.totalCheck - a.totalCheck)
                .slice(0, 5);

            const productStats = orders
                .filter((order: any) => order.status === 3)
                .reduce((stats: any, order: any) => {
                    order.product.forEach((product: any) => {
                        const existingStat = stats.find((stat: any) => stat.product === product._id);
                        if (existingStat) {
                            existingStat.quantity += product.quantity;
                        } else {
                            stats.push({ product: product._id, quantity: product.quantity });
                        }
                    });
                    return stats;
                }, []);

            setProductStats(productStats);
            // Cập nhật state với danh sách sản phẩm bán chạy
            setDeliveredOrders(topSellingProducts);
        } catch (error) {
            console.error('Error fetching delivered orders:', error);
        }
    };
    console.log('deliveredOrders', deliveredOrders)
    console.log('products', products)

    const fetchProducts = async () => {
        try {
            const response = await httpGetAllProduct();
            const productList = response.data;

            // Sắp xếp danh sách sản phẩm theo createdAt và lấy 10 sản phẩm đầu tiên
            const latestProducts = productList.sort((a: any, b: any) => b.createdAt - a.createdAt).slice(0, 10);

            // Cập nhật state với danh sách sản phẩm mới
            setProducts(latestProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };



    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchData();
    }, [displayOption]);

    useEffect(() => {
        fetchDeliveredOrders();
    }, []);

    const handleDisplayOptionChange = (event: any) => {
        setDisplayOption(event.target.value);
    };

    const chartData = {
        series: [
            {
                name: 'Doanh Thu',
                data: revenueData.map((data: any) => data.revenue),
            },
        ],
        options: {
            xaxis: {
                categories: revenueData.map((data: any) => data.option),
            },
        },
    };
    console.log('productData', productData)
    const productChartOptions = {
        options: {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: productData.flatMap(data => data.sizes.map(size => size.size)),
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'center', // Vị trí chú thích (top, center, bottom)
                        formatter: function (val, opts) {
                            const size = opts.xaxis.categories[opts.dataPointIndex];
                            return size + ': ' + val;
                        },
                    },
                },
            },
        },
        series: productData.flatMap(data => ({
            name: data.product,
            data: data.sizes.map((size) => size.quantity),
        })),
    };

    const count = [
        {
            today: "Tổng doanh thu",
            title: totalRevenue.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}),
            icon: <DollarOutlined />,
            bnb: "bnb2",
        },
        {
            today: "Đã giao",
            title: deliveredOrders.length,
            icon: <CheckSquareOutlined />,
            bnb: "bnb2",
        },
        {
            today: "Chờ xác nhận",
            title: pendingOrders,
            icon: <LoadingOutlined />,
            bnb: "redtext",
        },
        {
            today: "Đã xác nhận",
            title: confirmedOrders,
            icon: <CheckSquareOutlined />,
            bnb: "bnb2",
        },
        {
            today: "Đang giao",
            title: deliveringOrders,
            icon: <NotificationOutlined />,
            bnb: "bnb2",
        },
        {
            today: "Đã hủy",
            title: cancelledOrders,
            icon: <CloseCircleOutlined />,
            bnb: "bnb2",
        },
    ];
    const { Title, Text } = Typography;




    return (
        <div>
            <Row className="rowgap-vbox mb-5" gutter={[24, 0]}>
                {count.map((c, index) => (
                    <Col
                        key={index}
                        xs={24}
                        sm={24}
                        md={12}
                        lg={4}
                        xl={4}
                        className="mb-24"
                    >
                        <Card bordered={false} className="criclebox ">
                            <div className="number">
                                <Row align="middle" gutter={[24, 0]}>
                                    <Col xs={14}>
                                        <span>{c.today}</span>
                                        <Title level={3}>
                                            {c.title}
                                        </Title>
                                    </Col>
                                    <Col xs={2}>
                                        <div className="icon-box">{c.icon}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <h2>Thống kê doanh thu <p>Tổng doanh thu: {totalRevenue.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</p></h2>
            <select value={displayOption} onChange={handleDisplayOptionChange}>
                <option value="day">Ngày</option>
                <option value="week">Tuần</option>
                <option value="month">Tháng</option>
            </select>

            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />

            <div className="container-xxl mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="table-responsive bg-white">
                            <h4 className="mb-5">Sản phẩm bán chạy</h4>
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Giá gốc</th>
                                        <th scope="col">Số lượng đã bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deliveredOrders.flatMap((order: any, index) => (
                                        <tr >
                                            <th style={{ color: '#666666' }}>{order.product[0].product_name}</th>
                                            <td>{order.product[0].product_discount.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</td>
                                            <td >{productStats[index].quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container-xxl">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="table-responsive bg-white">
                            <h4 className="mb-5 fw-bold" >Sản phẩm mới</h4>
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Giá gốc</th>
                                        <th scope="col">Giá bán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product: any, index) => (
                                        <tr>
                                            <th scope="row" style={{ color: '#666666' }}>{product.product_name}</th>
                                            <td>{product.product_discount.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</td>
                                            <td>{product.product_price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
