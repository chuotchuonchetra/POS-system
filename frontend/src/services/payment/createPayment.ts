import { api } from "../../lib/api"

const createPayment = async (orderId:number) => {
    const res = await api.post(`payments/${orderId}`)
    return res.data
}

export default createPayment